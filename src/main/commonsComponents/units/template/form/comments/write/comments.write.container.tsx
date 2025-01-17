import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Message } from "./comments.write.styles";

import CommentsWriteUIPage from "./comments.write.presenter";
import ModalResultForm from "../../modal/modal.result";

import { Modal } from "mcm-js";
import { _SpanTextWithHtml } from "mcm-js-commons";

import {
  initInfo,
  WriteInfoTypes,
  categoryListArray,
} from "./comments.write.types";
import { CommentsAllInfoTypes } from "../comments.types";

import {
  getHashText,
  changeMultipleLine,
  getUserIp,
} from "src/main/commonsComponents/functional";
import commentsApis from "src/commons/libraries/apis/comments/comments.apis";

// 중복 실행 방지
let writing = false;
let clicked = false;
export default function CommentsWritePage({
  module,
  commentsInfo,
  fetchCommentsList,
}: {
  module: string;
  commentsInfo: CommentsAllInfoTypes;
  fetchCommentsList: (info: CommentsAllInfoTypes) => void;
}) {
  // 개인정보 수집 약관창 오픈 여부
  const [openPrivacy, setOpenPrivacy] = useState(false);

  // 카테고리 선택
  const [categoryList, setCategoryList] = useState<
    Array<{ [key: string]: string }>
  >([]);

  // 정보 저장하기
  const [input, setInfo] = useState<WriteInfoTypes>({
    ...initInfo,
  });

  // 카테고리 ref
  const categoryRef = useRef() as MutableRefObject<HTMLSelectElement>;
  // contents ref
  const contentsRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  // password ref
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (input.category !== "all") {
      // 디폴트 상태의 카테고리 없애기
      setCategoryList([...categoryListArray].slice(1));
    } else {
      // 카테고리 선택 포함하기
      setCategoryList([...categoryListArray]);
    }
  }, [input.category]);

  // 정보 변경하기
  const changeInfo = (value: string | number | boolean) => (name: string) => {
    if (input[name] !== undefined) {
      setInfo({
        ...input,
        [name]: value,
      });

      if (name === "password") {
        // 첫 문자열이 빈 문자열을 입력할 경우
        if (!String(input[name]).length) {
          // input 빈칸으로 만들기
          if (passwordRef.current) passwordRef.current.value = "";
        }
      }
    }
  };

  // 댓글 작성하기
  const write = async (e?: FormEvent<Element>) => {
    if (e) e.preventDefault();
    if (clicked) return;
    clicked = true;

    let errorMessage; // 모달에 출력할 에러메세지
    let errorType = "";

    // 모달 종료 후 실행시킬 이벤트
    const afterEvent = () => {
      clicked = false;

      if (errorType === "contents") contentsRef.current.focus();
      else if (errorType === "password") passwordRef.current.focus();
      else if (errorType === "privacy")
        window.setTimeout(() => {
          // 약관창 오픈
          setOpenPrivacy(true);
          window.setTimeout(() => {
            setOpenPrivacy(false);
          }, 100);
        }, 100);
    };

    // 모달의 height
    let height = "90px";
    // 에러모달 띄우기
    const openErrorModal = ({
      message, // 에러메세지
      className, // 클래스 선택자
      offClose, // 닫기 금지
      id, // 아이디 선택자
    }: {
      message: string;
      className?: string;
      offClose?: boolean;
      id?: string;
    }) => {
      Modal.open({
        className: `error-modal ${className || ""}`,
        children: ModalResultForm({
          children: (
            <Message>
              <_SpanTextWithHtml
                dangerouslySetInnerHTML={message}
                className="message"
              />
            </Message>
          ),
        }),
        id,
        showBGAnimation: true,
        showModalOpenAnimation: true,
        modalSize: {
          height: "160px",
        },
        mobileModalSize: {
          width: "95%",
          height,
        },
        onCloseModal: () => Modal.close({ id: "writing-modal" }),
        onAfterCloseEvent: afterEvent,
        offAutoClose: offClose || false,
        hideCloseButton: offClose || false,
        onFixWindow: true,
      });
    };

    const { userIp } = commentsInfo;
    if (!userIp) {
      // 실시간으로 유저의 아이피 조회하기
      const getIp = await getUserIp();

      if (!getIp)
        // 아이피 주소 조회에 실패할 경우
        return openErrorModal({
          message:
            "IP 주소를 조회할 수 없습니다. <br />관리자에게 직접 문의 부탁드립니다.",
        });
      else input.ip = getIp;
    } else {
      // 아이피 주소 저장
      input.ip = userIp;

      // 차단된 로그가 있는 경우
      if (commentsInfo.blockInfo.ip) {
        return openErrorModal({
          message:
            "차단된 IP 주소입니다. <br />관리자에게 직접 문의 부탁드립니다.",
        });
      }
    }

    // 중복 클릭 방지하기
    if (writing) {
      openErrorModal({
        message: "댓글을 등록하고 있습니다. <br /> 잠시만 기다려주세요.",
      });
    } else {
      height = "10%";
      // 댓글 작성시 누락된 부분 체크하기
      const errorCheck = checkWriteAble();

      // 누락된 부분 저장
      if (!errorCheck.able) {
        errorMessage = errorCheck.error.message;
        errorType = errorCheck.error.type;
      }
    }

    if (errorMessage) {
      openErrorModal({ message: errorMessage });
    } else {
      height = "90px";

      // 줄바꿈 처리하기
      input.contents = changeMultipleLine(input.contents.trim());

      // 비밀번호 해쉬화
      input.password = await getHashText(input.password);

      writing = true;
      openErrorModal({
        message: `댓글을 등록하고 있습니다. <br />잠시만 기다려주세요.`,
        className: "success-modal",
        id: "writing-modal",
        offClose: true,
      });

      // 리뷰가 아닌 경우에는 평점 초기화
      if (input.category !== "review") input.rating = 0;

      // 댓글 추가하기
      const addDocs = await commentsApis({ module, ip: input.ip });
      const addResult = await addDocs.addComments({
        input,
        updateCategory: true,
      });

      const _info = { ...commentsInfo };

      Modal.close({ id: "writing-modal" });
      if (addResult.success) {
        // 등록에 성공할 경우
        _info.selectCategory = input.category;
      }

      window.setTimeout(async () => {
        openErrorModal({
          message: addResult.success
            ? `댓글이 등록되었습니다. <br />소중한 의견 감사합니다.` // 등록 성공
            : addResult.msg, // 등록 실패
          className: "success-modal",
        });
        writing = false;
      }, 300);

      fetchCommentsList(_info);
      // 초기화
      setInfo({ ...initInfo });
    }
  };

  // 댓글 작성 가능 여부 확인하기
  const checkWriteAble = () => {
    // able : 작성 가능 여부 (true일 경우 작성 가능)
    // message : 에러 메세지
    // type : 에러 타입
    const result = { able: false, error: { message: "", type: "" } };

    const { blockInfo } = commentsInfo;
    if (blockInfo?.ip) {
      // 이미 차단된 유저인 경우
      result.error.message = "해당 아이피는 차단되어 댓글 작성이 불가능합니다.";
      result.error.type = "block";
    } else {
      if (input.category === "all") {
        // 카테고리가 선택되지 않았을 경우
        result.error.message = "카테고리를 선택해주세요.";
        result.error.type = "category";

        //
      } else if (!input.contents) {
        // 댓글 내용이 입력되지 않을 경우
        result.error.message = "댓글 내용을 작성해주세요.";
        result.error.type = "contents";

        //
      } else if (!input.password) {
        // 비밀번호를 입력하지 않을 경우
        result.error.message = "비밀번호를 입력해주세요.";
        result.error.type = "password";

        //
      } else if (!input.agreeProvacy) {
        // ip 수집에 동의하지 않을 경우
        result.error.message = "개인정보 (IP) 수집에 동의해주세요.";
        result.error.type = "privacy";

        //
      } else if (input.category === "review") {
        // 카테고리가 리뷰일 때
        if (!input.rating) {
          // 평점을 선택하지 않을 경우
          result.error.message = "평점을 선택해주세요.";
          result.error.type = "rating";
        }
      } else if (input.category === "bug") {
        // 카테고리가 버그일 때
        if (!input.bugLevel) {
          // 이슈 중요도를 선택하지 않을 경우
          result.error.message = "이슈 중요도를 선택해주세요.";
          result.error.type = "bug-level";
        }
      }
    }

    if (!result.error.message && !result.error.type) result.able = true;
    return result;
  };

  return (
    <CommentsWriteUIPage
      categoryList={categoryList}
      changeInfo={changeInfo}
      input={input}
      write={write}
      categoryRef={categoryRef}
      contentsRef={contentsRef}
      passwordRef={passwordRef}
      openPrivacy={openPrivacy}
      checkWriteAble={checkWriteAble}
      blockInfo={commentsInfo.blockInfo}
      userIp={commentsInfo.userIp}
    />
  );
}

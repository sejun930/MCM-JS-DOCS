import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { ipState } from "src/commons/store";
import { Message } from "./comments.write.styles";

import CommentsWriteUIPage from "./comments.write.presenter";
import ModalResultForm from "../../modal/modal.result";

import { Modal } from "mcm-js-dev";
import { _SpanTextWithHtml } from "mcm-js-commons";

import {
  getHashText,
  changeMultipleLine,
} from "src/main/commonsComponents/functional";
import {
  initInfo,
  WriteInfoTypes,
  categoryListArray,
} from "./comments.write.types";
import { InfoTypes } from "../comments.types";

import { IsBlockTypes } from "src/commons/store/store.types";

// 중복 실행 방지
let writing = false;
let clicked = false;
export default function CommentsWritePage({
  addComments,
  isBlockInfo,
}: {
  addComments: (data: InfoTypes) => Promise<boolean>;
  isBlockInfo: null | IsBlockTypes;
}) {
  // 개인정보 수집 약관창 오픈 여부
  const [openPrivacy, setOpenPrivacy] = useState(false);

  // 카테고리 선택
  const [categoryList, setCategoryList] = useState<
    Array<{ [key: string]: string }>
  >([]);

  // 정보 저장하기
  const [info, setInfo] = useState<WriteInfoTypes>({
    ...initInfo,
  });
  // 유저의 아이피 주소
  const [ip] = useRecoilState(ipState);

  // 카테고리 ref
  const categoryRef = useRef() as MutableRefObject<HTMLSelectElement>;
  // contents ref
  const contentsRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  // password ref
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (info.category !== "all") {
      // 디폴트 상태의 카테고리 없애기
      setCategoryList([...categoryListArray].slice(1));
    } else {
      // 카테고리 선택 포함하기
      setCategoryList([...categoryListArray]);
    }
  }, [info.category]);

  // 정보 변경하기
  const changeInfo = (value: string | number | boolean) => (name: string) => {
    if (info[name] !== undefined) {
      setInfo({
        ...info,
        [name]: value,
      });

      if (name === "password") {
        // 첫 문자열이 빈 문자열을 입력할 경우
        if (!String(info[name]).length) {
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

    if (!ip) {
      // 아이피 주소 조회에 실패할 경우
      openErrorModal({
        message:
          "IP 주소를 조회할 수 없습니다. <br />관리자에게 직접 문의 부탁드립니다.",
      });
    } else {
      // 아이피 주소 저장
      info.ip = ip;

      // 차단된 로그가 있는 경우
      if (isBlockInfo?.ip && isBlockInfo?.ip === ip) {
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
      info.contents = changeMultipleLine(info.contents.trim());

      // 비밀번호 해쉬화
      info.password = await getHashText(info.password);

      // 등록일 설정
      // info.createdAt = getServerTime();

      writing = true;
      openErrorModal({
        message: `댓글을 등록하고 있습니다. <br />잠시만 기다려주세요.`,
        className: "success-modal",
        id: "writing-modal",
        offClose: true,
      });

      // 리뷰가 아닌 경우에는 평점 초기화
      if (info.category !== "review") info.rating = 0;

      // 댓글 작성 가능
      const addResult = await addComments(info as InfoTypes);
      if (addResult) {
        Modal.close({ id: "writing-modal" });

        window.setTimeout(() => {
          // 등록에 성공할 경우
          openErrorModal({
            message: `댓글이 등록되었습니다. <br />소중한 의견 감사합니다.`,
            className: "success-modal",
          });
        }, 300);
      }
      writing = false;

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

    if (isBlockInfo?.ip) {
      // 이미 차단된 유저인 경우
      result.error.message = "해당 아이피는 차단되어 댓글 작성이 불가능합니다.";
      result.error.type = "block";
    } else {
      if (info.category === "all") {
        // 카테고리가 선택되지 않았을 경우
        result.error.message = "카테고리를 선택해주세요.";
        result.error.type = "category";

        //
      } else if (!info.contents) {
        // 댓글 내용이 입력되지 않을 경우
        result.error.message = "댓글 내용을 작성해주세요.";
        result.error.type = "contents";

        //
      } else if (!info.password) {
        // 비밀번호를 입력하지 않을 경우
        result.error.message = "비밀번호를 입력해주세요.";
        result.error.type = "password";

        //
      } else if (!info.agreeProvacy) {
        // ip 수집에 동의하지 않을 경우
        result.error.message = "개인정보 (IP) 수집에 동의해주세요.";
        result.error.type = "privacy";

        //
      } else if (info.category === "review") {
        // 카테고리가 리뷰일 때
        if (!info.rating) {
          // 평점을 선택하지 않을 경우
          result.error.message = "평점을 선택해주세요.";
          result.error.type = "rating";
        }
      } else if (info.category === "bug") {
        // 카테고리가 버그일 때
        if (!info.bugLevel) {
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
      info={info}
      write={write}
      categoryRef={categoryRef}
      contentsRef={contentsRef}
      passwordRef={passwordRef}
      openPrivacy={openPrivacy}
      checkWriteAble={checkWriteAble}
      isBlockInfo={isBlockInfo}
    />
  );
}

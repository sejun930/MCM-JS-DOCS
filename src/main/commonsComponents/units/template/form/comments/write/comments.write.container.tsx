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
import PrivacyNoticePage from "./privacy";

import { Modal } from "mcm-js-dev";
import { _SpanTextWithHtml } from "mcm-js-commons";

import { getHashPassword } from "src/main/commonsComponents/functional";
import { getServerTime } from "src/commons/libraries/firebase";
import { changeMultipleLine } from "src/main/commonsComponents/functional";
import { categoryListArray } from "./comments.write.types";

import { initInfo, WriteInfoTypes } from "./comments.write.types";
import { InfoTypes } from "../comments.types";

// 중복 실행 방지
let writing = false;
let clicked = false;
export default function CommentsWritePage({
  addComments,
}: {
  addComments: (data: InfoTypes) => Promise<boolean>;
}) {
  // 개인정보 수집 동의 여부
  // const [privacy, setPrivacy] = useState(false);

  // 카테고리 선택
  const [categoryList, setCategoryList] = useState<
    Array<{ [key: string]: string }>
  >([]);

  // 정보 저장하기
  const [info, setInfo] = useState<WriteInfoTypes>({
    ...initInfo,
  });

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
          openPrivacyNotice();
        }, 0);
    };

    // 에러모달 띄우기
    const openErrorModal = ({
      message, // 에러메세지
      isSuccess, // 성공 여부
      className, // 클래스 선택자
    }: {
      message: string;
      isSuccess?: boolean;
      className?: string;
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
        showBGAnimation: true,
        showModalOpenAnimation: true,
        modalSize: {
          height: "200px",
        },
        mobileModalSize: {
          height: "30%",
        },
        onAfterCloseEvent: afterEvent,
      });
    };

    // 중복 클릭 방지하기
    if (writing) {
      openErrorModal({
        message: "댓글을 등록하고 있습니다. <br /> 잠시만 기다려주세요.",
      });
    } else {
      if (info.category === "all") {
        // 카테고리를 선택하지 않은 경우
        errorMessage = "카테고리를 선택해주세요.";
      } else {
        // 카테고리를 선택한 경우
        if (!info.contents) {
          // 댓글 내용을 입력하지 않은 경우
          errorMessage = "댓글 내용을 작성해주세요.";
          errorType = "contents";

          // if (contentsRef.current) afterEvent = ;
        } else if (!info.password) {
          // 비밀번호를 입력하지 않은 경우
          errorMessage = "비밀번호를 입력해주세요.";
          errorType = "password";
        } else if (info.category === "review") {
          if (!info.rating) {
            // 평점을 선택하지 않을 경우
            errorMessage = "평점을 선택해주세요.";
          }
        } else if (!info.agreeProvacy) {
          // 개인정보 수집에 동의하지 않을 경우
          errorMessage = "개인정보 (IP) 수집에 동의해주세요.";
          errorType = "privacy";
        }
      }
    }

    if (errorMessage) {
      openErrorModal({ message: errorMessage });
    } else {
      // 줄바꿈 처리하기
      info.contents = changeMultipleLine(info.contents.trim());

      // 비밀번호 해쉬화
      info.password = await getHashPassword(info.password);

      // 등록일 설정
      info.createdAt = getServerTime();

      // ip 주소 1차 가져오기
      const axios = require("axios");
      try {
        const { data } = await axios.get(
          "https://api64.ipify.org/?format=json"
        );
        // ip 주소 저장
        info.ip = data.ip;
      } catch (err) {
        // 호출에 실패하면 다음 방법 시도
        console.log("1차 IP 조회에 실패했습니다. : " + err);

        // ip 주소 2차 가져오기
        try {
          const { data } = await axios.get("https://geolocation-db.com/json/");
          info.ip = data.IPv4;
        } catch (err2) {
          // 2차 실패
          console.log("2차 IP 조회에 실패했습니다. : " + err);

          // ip 주소 최종 가져오기
          try {
            const { data } = await axios.get("https://ipapi.co/json/");
            info.ip = data.ip;
          } catch (err3) {
            // 3차 최종 실패
            console.log("3차 IP 조회에 실패했습니다. : " + err3);
          }
        }
      }

      if (!info.ip) {
        openErrorModal({
          message:
            "IP 주소를 조회할 수 없습니다. <br />관리자에게 직접 문의 부탁드립니다.",
        });
      } else {
        // 리뷰가 아닌 경우에는 평점 초기화
        if (info.category !== "review") info.rating = 0;

        // 댓글 작성 가능
        // if (module) {
        writing = true;

        const addResult = await addComments(info as InfoTypes);
        if (addResult) {
          // 등록에 성공할 경우
          openErrorModal({
            message: `댓글이 등록되었습니다. <br />소중한 의견 감사합니다.`,
            className: "success-modal",
          });
        }
        writing = false;

        // 초기화
        setInfo({ ...initInfo });
      }
    }
  };

  // 약관보기 오픈
  const openPrivacyNotice = () => {
    const agreeProvacyEvent = () => {
      // 약관에 동의
      changeInfo(true)("agreeProvacy");

      // 모달 close
      Modal.close({
        id: "privacy-notice-modal",
      });
    };

    Modal.open({
      children: <PrivacyNoticePage privacyAgreeEvent={agreeProvacyEvent} />,
      id: "privacy-notice-modal",
      onFixWindow: true,
      closeMent: "닫기",
      modalStyles: {
        contents: {
          padding: "2rem",
        },
      },
    });
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
      openPrivacyNotice={openPrivacyNotice}
    />
  );
}

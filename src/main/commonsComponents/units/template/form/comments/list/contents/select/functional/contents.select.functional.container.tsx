import ContentsSelectFunctionalUIPage from "./contents.select.functional.presenter";
import { Message } from "./contents.select.functional.styles";

import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { Modal } from "mcm-js";
import { _SpanText } from "mcm-js-commons";

import { getServerTime, getDoc } from "src/commons/libraries/firebase";
import { WriteInfoTypes } from "../../../../write/comments.write.types";
import { InfoTypes } from "../../../../comments.types";
import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";

import ModalResultForm from "../../../../../modal/modal.result";

import {
  changeMultipleLine,
  getHashText,
} from "src/main/commonsComponents/functional";
import {
  ListContentsSelectType,
  ContentsSelectTypeName,
} from "../../list.data";

let password = ""; // 패스워드 저장
let _contents = ""; // 댓글 내용 저장
let rating = 0; // 평점 내용 저장
let bugLevel = 0; // 버그 중요도 저장

let disableOpenModal = false; // 모달 중복 실행 방지
export default function ContentsSelectFunctionalPage({
  info,
  type,
  modifyComments,
  adminLogin,
  module,
}: {
  info: InfoTypes;
  type: ListContentsSelectType;
  modifyComments: (
    comment: InfoTypes,
    isDelete?: boolean,
    type?: string,
    origin?: InfoTypes
  ) => Promise<boolean>;
  adminLogin: boolean | null;
  module: string;
}) {
  let answer = info.answer || ""; // 답변 내용 저장
  // 이슈 단계도 (0 : 확인 전, 1 : 확인 및 처리 중, 2 : 수정 완료)
  const [bugStatus, setBugStatus] = useState<number>(info.bugStatus || 0);
  // 중복 클릭 방지
  const [waiting, setWaiting] = useState(false);

  _contents = info.contents;
  rating = info.rating;
  bugLevel = info.bugLevel;

  const confirmRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const contentsRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    // 관리자일 경우 비밀번호 자동 저장
    password = info.password;
  }, [adminLogin]);

  // 수정 및 삭제 가능 여부 반환
  const checkAble = () => {
    let able = true;

    // 비밀번호가 빈칸일 경우
    if (!password || !_contents) able = false;
    // 관리자라면 무조건 가능
    if (adminLogin) able = true;

    return able;
  };

  // 데이터 변경하기
  const changeData = (
    value: string | number,
    type: "contents" | "password" | "rating" | "bugLevel" | "answer"
  ) => {
    if (type === "password") password = String(value);
    else if (type === "contents") _contents = String(value);
    else if (type === "rating") rating = Number(value);
    else if (type === "bugLevel") bugLevel = Number(value);
    else if (type === "answer") answer = String(value);

    // 버튼 비활성화 여부 체크하기
    if (confirmRef.current) {
      confirmRef.current.classList.remove("able");
      if (checkAble()) {
        confirmRef.current.classList.add("able");
      }
    }
  };

  // 모달 오픈하기
  const openModal = ({
    text,
    isSuccess,
    focus,
    afterCloseEvent,
  }: {
    text: string;
    isSuccess?: boolean;
    focus?: "contents" | "password";
    afterCloseEvent?: () => void;
  }) => {
    if (disableOpenModal) return;
    disableOpenModal = true;

    const _afterCloseEvent = () => {
      disableOpenModal = false;

      if (afterCloseEvent) {
        afterCloseEvent();
        setWaiting(false);
      } else {
        if (!_contents || focus === "contents") {
          if (contentsRef.current) contentsRef.current.focus();
        } else if (!password || focus === "password") {
          if (passwordRef.current) passwordRef.current.focus();
        }
      }
    };

    Modal.open({
      children: (
        <ModalResultForm
          children={
            <Message isSuccess={isSuccess}>
              <_SpanText className="message">
                <b>{isSuccess ? "✔" : "❗"}</b> {text}
              </_SpanText>
            </Message>
          }
        />
      ),
      showBGAnimation: true,
      showModalOpenAnimation: true,
      modalSize: { width: "300px", height: "60px" },
      modalStyles: {
        items: {
          border: `double 5px #${isSuccess ? "19a7ce" : "aa5656"}`,
        },
      },
      mobileModalSize: {
        width: "100%",
        height: "10%",
      },
      onCloseModal: _afterCloseEvent,
    });
  };

  // 최종 삭제 및 수정하기
  const confirm = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (waiting) {
      // openModal({ text: "처리중입니다. 잠시만 기다려주세요." });
      return;
    }

    const typeName = ContentsSelectTypeName[type][0];

    // 버튼이 비활성화일 경우
    if (!checkAble()) {
      openModal({
        text: !_contents ? "댓글을 입력해주세요." : "비밀번호를 입력해주세요.",
      });
    } else {
      const _info = { ...info } as WriteInfoTypes;

      // 비밀번호 체크하기
      const hashPw = await getHashText(password);

      if (!adminLogin) {
        if (hashPw !== info.password || !info.password) {
          openModal({
            text: "비밀번호가 일치하지 않습니다.",
            focus: "password",
          });
          return;
        }
      } else {
        if (type === "block" || type === "question") {
          // 차단 및 답변일 경우, 현재 로그인이 유지되어 있는 상태인지 검증

          if (!checkAccessToken()) {
            // 로그인이 만료될 경우
            openModal({
              text: "로그인이 만료되었습니다.",
            });
            return;
          }
        }
      }

      setWaiting(true);
      let isComplete = false; // 성공 여부
      if (type === "modify") {
        // 수정 모드일 경우

        // 줄바꿈 처리하기
        _info.contents = changeMultipleLine(_contents).trim();

        // 평점 변경하기
        if (_info.category === "review") _info.rating = rating;

        // 버그 중요도 변경하기
        if (_info.category === "bug") _info.bugLevel = bugLevel;

        // 수정 시간 저장
        _info.modifyAt = getServerTime();
      } else if (type === "delete" || type === "block") {
        // 삭제 & 차단 모드일 경우 (= 댓글 삭제)
        _info.deletedAt = getServerTime();

        if (type === "block") {
          // 차단 모드일 경우, 차단된 유저 정보 추가하기
          const doc = getDoc("block", "user", "ip");
          doc.add({
            commentId: _info.id, // 차단된 댓글 아이디 값
            ip: _info.ip, // 차단된 유저 아이피
            createdAt: getServerTime(), // 차단날짜
            canceledAt: null, // 차단취소일
            contents: _info.contents, // 차단된 댓글 내용
            category: _info.category, // 차단된 카테고리 이름
            module, // 차단된 모듈 이름
          });
        }
      } else if (type === "question") {
        // 답변 모드일 경우
        if (answer) {
          _info.answer = answer.split("\n").join("<br />");
        } else {
          if (info.category === "bug") {
            if (bugStatus === 1)
              _info.answer =
                "이슈 확인중입니다. <br />불편을 드려서 죄송합니다. 🙇 <br /><br />빠른 시일내에 수정하겠습니다. <br />작성해주셔서 감사합니다! 🧡";
            else if (bugStatus === 2)
              _info.answer =
                "이슈 수정이 완료되었습니다. <br /><br />신고해주셔서 감사합니다! 🧡<br />";
          }
        }
        // 답변 작성일 저장
        _info.answerCreatedAt = getServerTime();

        // 이슈 처리 처리하기
        if (info.category === "bug") {
          // 이슈 확인중일 경우 처리중으로 자동 변경
          if (!info.bugStatus) _info.bugStatus = 1;
          if (bugStatus !== info.bugStatus) _info.bugStatus = bugStatus;
        }
      }
      const isDelete = type === "delete" || type === "block"; // 댓글 삭제 여부
      // 수정 완료 여부 저장
      isComplete = await modifyComments(
        _info as InfoTypes,
        isDelete,
        type,
        info
      );

      if (isComplete) {
        openModal({
          text: `${typeName} 완료되었습니다.`,
          isSuccess: true,
          afterCloseEvent: () => {
            Modal.close({ id: "comments-functional-modal" });
          },
        });
      }
    }
  };

  // 이슈 처리 선택하기
  const changeBugStatus = (status: number) => {
    if (!checkAccessToken()) return;
    setBugStatus(status);
  };

  return (
    <ContentsSelectFunctionalUIPage
      type={type}
      info={info}
      changeData={changeData}
      passwordRef={passwordRef}
      contentsRef={contentsRef}
      confirmRef={confirmRef}
      confirm={confirm}
      adminLogin={adminLogin}
      waiting={waiting}
      changeBugStatus={changeBugStatus}
      bugStatus={bugStatus}
    />
  );
}

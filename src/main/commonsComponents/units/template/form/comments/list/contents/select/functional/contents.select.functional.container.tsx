import ContentsSelectFunctionalUIPage from "./contents.select.functional.presenter";
import { Message } from "./contents.select.functional.styles";

import { FormEvent, MutableRefObject, useRef } from "react";

import { Modal } from "mcm-js";
import { _SpanText } from "mcm-js-commons";

import { getServerTime } from "src/commons/libraries/firebase";
import { WriteInfoTypes } from "../../../../write/comments.write.types";
import { InfoTypes } from "../../../../comments.types";

import ModalResultForm from "../../../../../modal/modal.result";

import { changeMultipleLine } from "src/main/commonsComponents/functional";
import { getHashPassword } from "src/main/commonsComponents/functional";

let password = ""; // 패스워드 저장
let _contents = ""; // 댓글 내용 저장

let waiting = false; // 중복 클릭 방지
let disableOpenModal = false; // 모달 중복 실행 방지
export default function ContentsSelectFunctionalPage({
  info,
  type,
  module,
  modifyComments,
}: {
  info: InfoTypes;
  type: "modify" | "delete";
  module: string;
  modifyComments: (comment: InfoTypes, isDelete?: boolean) => Promise<boolean>;
}) {
  _contents = info.contents;
  const confirmRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const contentsRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  // 수정 및 삭제 가능 여부 반환
  const checkAble = () => {
    let able = true;

    // 비밀번호가 빈칸일 경우
    if (!password || !_contents) able = false;

    return able;
  };

  // 데이터 변경하기
  const changeData = (text: string, type: "contents" | "password") => {
    if (type === "password") password = text.trim();
    else if (type === "contents") _contents = text.trim();

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
    afterCloseEvent?: () => {};
  }) => {
    if (disableOpenModal) return;
    disableOpenModal = true;

    const _afterCloseEvent = () => {
      disableOpenModal = false;

      if (afterCloseEvent) afterCloseEvent();
      else {
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
        ></ModalResultForm>
      ),
      showBGAnimation: true,
      showModalOpenAnimation: true,
      modalSize: { width: "300px", height: "60px" },
      modalStyles: !isSuccess
        ? {
            border: "double 5px #aa5656",
          }
        : {
            border: "double 5px #19a7ce",
          },
      onCloseModal: _afterCloseEvent,
    });
  };

  // 최종 삭제 및 수정하기
  const confirm = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (waiting) {
      openModal({ text: "처리중입니다. 잠시만 기다려주세요." });
      return;
    }
    const typeName = type === "modify" ? "수정" : "삭제";

    // 버튼이 비활성화일 경우
    if (!checkAble()) {
      openModal({
        text: !_contents ? "댓글을 입력해주세요." : "비밀번호를 입력해주세요.",
      });
    } else {
      const _info = { ...info } as WriteInfoTypes;

      // 비밀번호 체크하기
      const hashPw = await getHashPassword(password);

      if (hashPw !== info.password || !info.password) {
        openModal({
          text: "비밀번호가 일치하지 않습니다.",
          focus: "password",
        });
        return;
      }

      waiting = true;
      let isComplete = false; // 성공 여부
      if (type === "modify") {
        // 수정 모드일 경우

        // 줄바꿈 처리하기
        _info.contents = changeMultipleLine(_contents);

        // 수정 시간 저장
        _info.modifyAt = getServerTime();
      } else {
        // 삭제 모드일 경우
        _info.deletedAt = getServerTime();
      }
      // 수정 완료 여부 저장
      isComplete = await modifyComments(_info as InfoTypes, type === "delete");

      if (isComplete) {
        openModal({
          text: `${typeName} 완료되었습니다.`,
          isSuccess: true,
          afterCloseEvent: () =>
            Modal.close({ id: "comments-functional-modal" }),
        });
      }
      waiting = false;
    }
  };
  return (
    <ContentsSelectFunctionalUIPage
      type={type}
      contents={info.contents}
      changeData={changeData}
      passwordRef={passwordRef}
      contentsRef={contentsRef}
      confirmRef={confirmRef}
      confirm={confirm}
    />
  );
}

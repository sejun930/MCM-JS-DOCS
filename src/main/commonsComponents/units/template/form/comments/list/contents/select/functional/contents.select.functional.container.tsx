import ContentsSelectFunctionalUIPage from "./contents.select.functional.presenter";

import { MutableRefObject, useRef } from "react";
import { Modal } from "mcm-js";
import { _SpanText } from "mcm-js-commons";

import { getDoc, getServerTime } from "src/commons/libraries/firebase";
import {
  InfoTypes,
  WriteInfoTypes,
} from "../../../../write/comments.write.types";

import { changeMultipleLine } from "src/main/commonsComponents/functional";

let password = ""; // 패스워드 저장
let _contents = ""; // 댓글 내용 저장

export default function ContentsSelectFunctionalPage({
  info,
  type,
  module,
  fetchCommentsList,
}: {
  info: InfoTypes;
  type: "modify" | "delete";
  module: string;
  fetchCommentsList: (category: string) => void;
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

  // 최종 삭제 및 수정하기
  const confirm = () => {
    // 버튼이 비활성화일 경우
    if (!checkAble()) {
      Modal.open({
        children: (
          <_SpanText>
            <b>
              {!_contents ? "댓글을 입력해주세요." : "비밀번호를 입력해주세요."}
            </b>
          </_SpanText>
        ),
        showBGAnimation: true,
        showModalOpenAnimation: true,
        modalSize: { width: "250px", height: "60px" },
        modalStyles: {
          border: "double 5px #aa5656",
        },
        onAfterCloseEvent: () => {
          if (!_contents) {
            if (contentsRef.current) contentsRef.current.focus();
          } else if (!password) {
            if (passwordRef.current) passwordRef.current.focus();
          }
        },
      });
    } else {
      const _info = { ...info } as WriteInfoTypes;

      // 비밀번호 체크하기

      let doc = getDoc("comments", module, "comment").doc(info.id);

      // 수정 모드일 경우
      if (type === "modify") {
        // 줄바꿈 처리하기
        _info.contents = changeMultipleLine(_contents);

        // 수정 시간 저장
        _info.modifyAt = getServerTime();

        console.log(_info);

        doc
          .update(_info)
          .then(() => {
            // 수정 내용 업데이트
            fetchCommentsList(_info.category);
          })
          .catch((err) =>
            console.log(`댓글을 수정하는데 실패했습니다. ${err}`)
          );
      }
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

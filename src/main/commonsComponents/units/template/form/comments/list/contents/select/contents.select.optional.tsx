import styled from "@emotion/styled";

import { MutableRefObject, useRef } from "react";
import { _Title, _Input, _Button } from "mcm-js-commons";

let password = "";
let _contents = "";
export default function ContentsOptionalPage({
  type,
  contents,
}: {
  type: "modify" | "delete";
  contents: string;
}) {
  _contents = contents;
  const confirmRef = useRef() as MutableRefObject<HTMLButtonElement>;

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
  const confirm = () => {};

  return (
    <OptionalWrapper>
      <_Title titleLevel="h2">
        {type === "modify" ? "댓글 수정" : "댓글 삭제"}
      </_Title>
      <_Input
        isTextArea
        defaultValue={contents.split("<br />").join("\n")}
        readOnly={type === "delete"}
        className="optional-input"
        onChangeEvent={(text) => changeData(text, "contents")}
      />
      <_Input
        inputType="password"
        onChangeEvent={(text) => changeData(text, "password")}
        maxLength={20}
      />

      <ConfirmButtonWrapper>
        <_Button
          onClickEvent={confirm}
          className="confirm-button disable"
          buttonRef={confirmRef}
        >
          {type === "delete"
            ? "위의 댓글을 삭제합니다."
            : "위의 댓글로 수정합니다."}
        </_Button>
      </ConfirmButtonWrapper>
    </OptionalWrapper>
  );
}

export const OptionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;

  .mcm-title-unit {
    text-align: center;
    font-size: 28px;
  }

  .optional-input {
    margin-top: 20px;

    .mcm-textArea-unit {
      height: 160px;
    }
  }
`;

export const ConfirmButtonWrapper = styled.div`
  margin-top: 40px;
  text-align: center;

  .confirm-button {
    font-size: 16px;
  }

  .disable {
    color: gray;
    cursor: not-allowed;
  }

  .able {
    color: black;
    cursor: pointer;
  }
`;

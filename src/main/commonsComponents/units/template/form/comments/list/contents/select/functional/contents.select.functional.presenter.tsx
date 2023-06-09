import { _Title, _Input, _Button } from "mcm-js-commons";
import {
  ConfirmButtonWrapper,
  OptionalWrapper,
} from "./contents.select.functional.styles";
import { FormEvent, MutableRefObject } from "react";

export default function ContentsSelectFunctionalUIPage({
  type,
  contents,
  contentsRef,
  passwordRef,
  confirmRef,
  changeData,
  confirm,
}: {
  type: "modify" | "delete";
  contents: string;
  passwordRef: MutableRefObject<HTMLInputElement>;
  contentsRef: MutableRefObject<HTMLTextAreaElement>;
  confirmRef: MutableRefObject<HTMLButtonElement>;
  changeData: (text: string, type: "contents" | "password") => void;
  confirm: (e?: FormEvent) => void;
}) {
  return (
    <form onSubmit={confirm}>
      <OptionalWrapper isDelete={type === "delete"}>
        <_Title titleLevel="h2">
          {type === "modify" ? "댓글 수정" : "댓글 삭제"}
        </_Title>
        <_Input
          isTextArea
          defaultValue={contents.split("<br />").join("\n")}
          readOnly={type === "delete"}
          className="optional-input"
          onChangeEvent={(text) => changeData(text, "contents")}
          inputRef={contentsRef}
        />
        <_Input
          inputType="password"
          onChangeEvent={(text) => changeData(text, "password")}
          maxLength={20}
          inputRef={passwordRef}
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
    </form>
  );
}

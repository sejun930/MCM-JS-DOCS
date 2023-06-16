import { FormEvent, MutableRefObject } from "react";
import {
  ConfirmButtonWrapper,
  OptionalWrapper,
  CommentsInfoWrapper,
  CommentsInfoItems,
  CategoryInfo,
} from "./contents.select.functional.styles";

import { _Title, _Input, _Button } from "mcm-js-commons";
import { InfoTypes } from "../../../../comments.types";

import CommentsLabel from "../../../label";

export default function ContentsSelectFunctionalUIPage({
  type,
  info,
  contentsRef,
  passwordRef,
  confirmRef,
  changeData,
  confirm,
}: {
  type: "modify" | "delete";
  info: InfoTypes;
  passwordRef: MutableRefObject<HTMLInputElement>;
  contentsRef: MutableRefObject<HTMLTextAreaElement>;
  confirmRef: MutableRefObject<HTMLButtonElement>;
  changeData: (
    value: string | number,
    type: "contents" | "password" | "rating" | "bugLevel"
  ) => void;
  confirm: (e?: FormEvent) => void;
}) {
  return (
    <form onSubmit={confirm}>
      <OptionalWrapper isDelete={type === "delete"}>
        <_Title titleLevel="h2">
          {type === "modify" ? "댓글 수정" : "댓글 삭제"}
        </_Title>
        <CommentsInfoWrapper>
          <CategoryInfo>
            <CommentsLabel
              showCategoryName
              info={info}
              modifyRatingEvent={
                type === "modify"
                  ? (value: number) =>
                      changeData(
                        value,
                        info.category === "review" ? "rating" : "bugLevel"
                      )
                  : undefined
              }
            />
          </CategoryInfo>
        </CommentsInfoWrapper>

        <CommentsInfoItems>
          <_Input
            isTextArea
            defaultValue={info.contents.split("<br />").join("\n")}
            readOnly={type === "delete"}
            className="optional-input"
            onChangeEvent={(text) => changeData(text, "contents")}
            inputRef={contentsRef}
            maxLength={500}
          />
        </CommentsInfoItems>

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
              : "위의 내용으로 댓글을 수정합니다."}
          </_Button>
        </ConfirmButtonWrapper>
      </OptionalWrapper>
    </form>
  );
}

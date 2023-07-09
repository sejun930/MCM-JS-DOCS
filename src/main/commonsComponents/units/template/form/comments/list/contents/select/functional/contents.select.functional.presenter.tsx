import { FormEvent, MutableRefObject } from "react";
import {
  Form,
  ConfirmButtonWrapper,
  OptionalWrapper,
  CommentsInfoWrapper,
  CommentsInfoItems,
  CategoryInfo,
} from "./contents.select.functional.styles";

import { _Title, _Input, _Button } from "mcm-js-commons";
import { InfoTypes } from "../../../../comments.types";

import CommentsLabel from "../../../label";
import {
  ListContentsSelectType,
  ContentsSelectTypeName,
} from "../../list.data";

export default function ContentsSelectFunctionalUIPage({
  type,
  info,
  contentsRef,
  passwordRef,
  confirmRef,
  changeData,
  confirm,
  adminLogin,
}: {
  type: ListContentsSelectType;
  info: InfoTypes;
  passwordRef: MutableRefObject<HTMLInputElement>;
  contentsRef: MutableRefObject<HTMLTextAreaElement>;
  confirmRef: MutableRefObject<HTMLButtonElement>;
  changeData: (
    value: string | number,
    type: "contents" | "password" | "rating" | "bugLevel"
  ) => void;
  confirm: (e?: FormEvent) => void;
  adminLogin: boolean | null;
}) {
  return (
    <Form onSubmit={confirm}>
      <OptionalWrapper isDelete={type === "delete"}>
        <_Title titleLevel="h2">댓글 {ContentsSelectTypeName[type][0]}</_Title>
        <CommentsInfoWrapper>
          <CategoryInfo>
            <CommentsLabel
              showCategoryName
              info={info}
              adminLogin={adminLogin}
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
            readOnly={type !== "modify"}
            className="optional-input"
            onChangeEvent={(text) => changeData(text, "contents")}
            inputRef={contentsRef}
            maxLength={500}
          />
        </CommentsInfoItems>

        {!adminLogin && (
          <_Input
            inputType="password"
            className="optional-password-input"
            onChangeEvent={(text) => changeData(text, "password")}
            maxLength={20}
            inputRef={passwordRef}
            readOnly={adminLogin || false}
          />
        )}
        <ConfirmButtonWrapper>
          <_Button
            onClickEvent={confirm}
            className="confirm-button disable"
            buttonRef={confirmRef}
          >
            {ContentsSelectTypeName[type][1]}
          </_Button>
        </ConfirmButtonWrapper>
      </OptionalWrapper>
    </Form>
  );
}

import { FormEvent, MutableRefObject } from "react";
import {
  Form,
  ConfirmButtonWrapper,
  OptionalWrapper,
  CommentsInfoWrapper,
  CommentsInfoItems,
  CategoryInfo,
  ConfirmButton,
  BugStatusWrapper,
  BugStatusButton,
} from "./contents.select.functional.styles";

import { _Title, _Input, _Button, _SpanText } from "mcm-js-commons";
import { InfoTypes } from "../../../../comments.types";
import { Tooltip } from "mcm-js";

import CommentsLabel from "../../../label";
import {
  ListContentsSelectType,
  ContentsSelectTypeName,
} from "../../list.data";
import { AdminBugStatusSelectList } from "./contents.select.functional.data";
import { changeClientText } from "src/main/commonsComponents/functional";

export default function ContentsSelectFunctionalUIPage({
  type,
  info,
  contentsRef,
  passwordRef,
  confirmRef,
  changeData,
  confirm,
  adminLogin,
  changeBugStatus,
  bugStatus,
  answerRef,
}: {
  type: ListContentsSelectType;
  info: InfoTypes;
  passwordRef: MutableRefObject<HTMLInputElement>;
  contentsRef: MutableRefObject<HTMLTextAreaElement>;
  confirmRef: MutableRefObject<HTMLButtonElement>;
  answerRef: MutableRefObject<HTMLTextAreaElement>;
  changeData: (
    value: string | number,
    type: "contents" | "password" | "rating" | "bugLevel" | "answer"
  ) => void;
  confirm: (e?: FormEvent) => void;
  adminLogin: boolean | null;
  changeBugStatus: (status: number) => void;
  bugStatus: number;
}) {
  // 답변이 가능한 댓글인 경우
  const isAnswerType = type === "question";

  // 답변창 보이기
  const showAnswer =
    info.answer || (info.answer && adminLogin) || type === "question";

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

        <CommentsInfoItems isAnswerType={showAnswer !== "" || isAnswerType}>
          <_Input
            isTextArea
            defaultValue={changeClientText(info.contents)}
            readOnly={type !== "modify"}
            className="optional-input"
            onChangeEvent={(text) => changeData(text, "contents")}
            inputRef={contentsRef}
            maxLength={500}
            onSubmitEvent={confirm}
          />
          {showAnswer && (
            <_Input
              isTextArea
              onChangeEvent={(text) => changeData(text, "answer")}
              className="optional-answer-input"
              maxLength={500}
              defaultValue={changeClientText(info?.answer || "")}
              readOnly={!isAnswerType || !adminLogin}
              inputRef={answerRef}
              placeHolder="답변을 입력해주세요."
              onSubmitEvent={confirm}
            />
          )}
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
        {adminLogin && info.category === "bug" && type === "question" && (
          <BugStatusWrapper>
            {AdminBugStatusSelectList.slice(info.bugStatus).map((listInfo) => {
              return (
                <Tooltip
                  key={`bug-status-${listInfo.name}-${status}`}
                  tooltipText={listInfo.tooltipText || ""}
                  isDisable={
                    !listInfo.tooltipText || bugStatus === listInfo.status
                  }
                  position="right"
                  useShowAnimation
                >
                  <BugStatusButton
                    onClickEvent={() => changeBugStatus(listInfo.status)}
                    buttonType="button"
                    isSelected={listInfo.status === bugStatus}
                  >
                    {listInfo.name}
                  </BugStatusButton>
                </Tooltip>
              );
            })}
          </BugStatusWrapper>
        )}

        <ConfirmButtonWrapper>
          <ConfirmButton onClickEvent={confirm} buttonRef={confirmRef}>
            {ContentsSelectTypeName[type][1]}
          </ConfirmButton>
        </ConfirmButtonWrapper>
      </OptionalWrapper>
    </Form>
  );
}

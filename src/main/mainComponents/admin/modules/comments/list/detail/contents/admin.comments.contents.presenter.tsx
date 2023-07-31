import {
  Contents,
  ContentsBtn,
  ContentsItems,
  ContentsWrapper,
  OptionWrapper,
  ListOptionalModifiedWrapper,
} from "./admin.comments.contents.styles";

import { Tooltip } from "mcm-js";
import { _Input, _SpanText, _PText } from "mcm-js-commons";
import { MutableRefObject } from "react";
import { getDateForm } from "src/main/commonsComponents/functional";
import { InfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";

export default function AdminCommentsContentsUIPage({
  info,
  toggleMoreShow,
  contentsRef,
  changeAnswer,
  saveAnswer,
  textRef,
  isAlreadyDeleted,
  renderOptionList,
  answer,
}: {
  info: InfoTypes;
  toggleMoreShow: () => void;
  contentsRef: MutableRefObject<HTMLParagraphElement>;
  changeAnswer: () => void;
  saveAnswer: (text: string) => void;
  textRef: MutableRefObject<HTMLTextAreaElement>;
  isAlreadyDeleted: boolean;
  renderOptionList: () => JSX.Element;
  answer: string;
}) {
  return (
    <ContentsWrapper>
      <ContentsItems>
        <ContentsBtn onClickEvent={toggleMoreShow}>
          <Contents
            className="contents"
            dangerouslySetInnerHTML={info.contents}
            _ref={contentsRef}
          />
        </ContentsBtn>
        <_Input
          className="answer-teatarea-wrapper"
          inputClassName="answer-textarea"
          onChangeEvent={saveAnswer}
          onSubmitEvent={changeAnswer}
          isTextArea
          placeHolder="답변 입력"
          value={answer}
          inputRef={textRef}
          readOnly={isAlreadyDeleted}
        />
      </ContentsItems>
      <OptionWrapper>
        <ListOptionalModifiedWrapper>
          {info.modifyAt && (
            <Tooltip tooltipText="댓글 수정일" useShowAnimation>
              <_PText className="answer-date">
                수정일 |{" "}
                {getDateForm({
                  firebaseTimer: info.modifyAt,
                  getDate: true,
                })}
              </_PText>
            </Tooltip>
          )}
          {renderOptionList()}
        </ListOptionalModifiedWrapper>
        {info.answerCreatedAt && (
          <Tooltip tooltipText="답변 작성일" useShowAnimation>
            <_SpanText className="answer-date">
              답변일 |{" "}
              {getDateForm({
                firebaseTimer: info.answerCreatedAt,
                getDate: true,
              })}
            </_SpanText>
          </Tooltip>
        )}
      </OptionWrapper>
    </ContentsWrapper>
  );
}

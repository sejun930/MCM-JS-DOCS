import {
  Contents,
  ContentsBtn,
  ContentsItems,
  ContentsWrapper,
  OptionWrapper,
} from "./admin.comments.contents.styles";

import { MutableRefObject } from "react";
import { _Input, _SpanText, _PText } from "mcm-js-commons";

import { getDateForm } from "src/main/commonsComponents/functional/date";
import { InfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
import { AdminLoginTypes } from "src/commons/store/store.types";
const { Tooltip } = getLibraries();

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
  adminLoginInfo,
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
  adminLoginInfo: AdminLoginTypes;
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
          readOnly={isAlreadyDeleted || adminLoginInfo.isTest}
        />
      </ContentsItems>

      {((info.modifyAt || info.answerCreatedAt) && (
        <OptionWrapper>
          <Tooltip
            tooltipText="댓글 수정일"
            useShowAnimation
            className="modify-date-wrapper"
          >
            {info.modifyAt && (
              <_PText className="answer-date">
                수정일 |{" "}
                {getDateForm({
                  firebaseTimer: info.modifyAt,
                  getDate: true,
                })}
              </_PText>
            )}
          </Tooltip>
          <Tooltip
            tooltipText="답변 작성일"
            useShowAnimation
            className="answer"
          >
            {info.answerCreatedAt && (
              <_SpanText className="answer-date">
                답변일 |{" "}
                {getDateForm({
                  firebaseTimer: info.answerCreatedAt,
                  getDate: true,
                })}
              </_SpanText>
            )}
          </Tooltip>
        </OptionWrapper>
      )) || <></>}

      {!adminLoginInfo.isTest && renderOptionList()}
    </ContentsWrapper>
  );
}

import React, { MouseEvent, MutableRefObject } from "react";
import {
  CommentsInfoWrapper,
  CommentsList,
  ContentsWrapper,
  LabelWrapper,
  MoreShowWrapper,
  OptionalButton,
  OptionalWrapper,
  SelectWrapper,
  SelectButton,
  DateWrapper,
  ContentsInfo,
  Filedset,
  QuestionTitle,
  AnswerInfoWrapper,
} from "./list.contents.styles";
import { getDateForm } from "src/main/commonsComponents/functional";
import { getListContentsInfo, ListContentsSelectType } from "./list.data";

import { _SpanTextWithHtml, _Button, _PText } from "mcm-js-commons";
import { ListContentsIProps } from "./list.contents.container";

import _SelectForm from "../../../select/select.container";
import CommentsLabel from "../label";
import StarsForm from "../../write/stars";

interface ListContentsUIProps {
  isMore: boolean;
  subContents: string;
  toggleMoreShow: (e?: MouseEvent<HTMLButtonElement>) => void;
  moreShow: boolean;
  contents: string;
  showSelect: boolean;
  toggleShowSelect: (bool?: boolean) => void;
  deleteComments: (type: ListContentsSelectType, name: string) => () => void;
  hover: boolean;
  name: string;
  _wrapperRef: MutableRefObject<HTMLLIElement>;
  adminLogin: boolean;
}

export default function ListContentsInfoUIPage({
  info,
  subContents,
  isMore,
  toggleMoreShow,
  moreShow,
  contents,
  showSelect,
  toggleShowSelect,
  deleteComments,
  hover,
  name,
  _wrapperRef,
  commentsInfo,
  changeInfo,
  adminLogin,
}: ListContentsIProps & ListContentsUIProps) {
  let answerClass = "answer";

  if (info.answer) {
    if (info.category === "bug") answerClass += " bug-answer";
    else if (info.category === "review") answerClass += " review-answer";
  }

  return (
    <CommentsList
      className="comments-list"
      hover={hover}
      onClick={() => toggleShowSelect(true)}
      ref={_wrapperRef}
    >
      {/* {render && ( */}
      <CommentsInfoWrapper>
        <LabelWrapper hover={hover}>
          <CommentsLabel
            info={info}
            commentsInfo={commentsInfo}
            changeInfo={changeInfo}
            adminLogin={adminLogin}
            hideStar={info.category === "bug"}
          />
        </LabelWrapper>
        <ContentsWrapper>
          <Filedset isBug={info.category === "bug"}>
            <legend>
              <StarsForm
                isView
                isBugMode
                rating={info.bugLevel || 0}
                category="bug"
                tooltipPosition="bottom"
              />
            </legend>
            <ContentsInfo
              hasQuestion={info.category === "question"}
              className={(info.category === "question" && "qna-contents") || ""}
            >
              {info.category === "question" && (
                <QuestionTitle> Q. </QuestionTitle>
              )}
              <_SpanTextWithHtml
                className="comments"
                dangerouslySetInnerHTML={moreShow ? contents : subContents}
              />
            </ContentsInfo>
          </Filedset>

          {isMore && (
            <MoreShowWrapper>
              <_Button onClickEvent={toggleMoreShow} className="more-show">
                {moreShow ? "간략히" : "더 보기"}
              </_Button>
            </MoreShowWrapper>
          )}

          {info.answer && (
            <ContentsInfo
              className={`qna-contents ${answerClass}`}
              hasQuestion={info.category === "question"}
              isAnswer={true}
            >
              {info.category === "question" && (
                <QuestionTitle> A. </QuestionTitle>
              )}
              <AnswerInfoWrapper>
                <_SpanTextWithHtml
                  className="comments"
                  dangerouslySetInnerHTML={info.answer}
                />
                {info.answerCreatedAt && (
                  <_PText className="answer-date">
                    {getDateForm({ firebaseTimer: info.answerCreatedAt })}
                  </_PText>
                )}
              </AnswerInfoWrapper>
            </ContentsInfo>
          )}

          <OptionalWrapper>
            <DateWrapper className="createdAt">
              {info.createdAt && ( // 작성일
                <b className="date">
                  {getDateForm({ firebaseTimer: info.createdAt })}
                </b>
              )}
              {info.modifyAt && (
                <b className="date">
                  (수정 일자 :{" "}
                  {getDateForm({ firebaseTimer: info.modifyAt, getDate: true })}
                  )
                </b>
              )}
            </DateWrapper>

            <SelectWrapper className="select-wrapper" hover={hover}>
              <OptionalButton hover={hover}>...</OptionalButton>
              <_SelectForm
                show={showSelect}
                closeEvent={() => toggleShowSelect(false)}
                autoCloseOffTargetName={name}
              >
                {getListContentsInfo(adminLogin, info).map((el) => {
                  return (
                    <SelectButton
                      onClickEvent={deleteComments(el.value, name)}
                      key={`comments-select-list-${info.id}`}
                    >
                      {el.name}
                    </SelectButton>
                  );
                })}
              </_SelectForm>
            </SelectWrapper>
          </OptionalWrapper>
        </ContentsWrapper>
      </CommentsInfoWrapper>
    </CommentsList>
  );
}

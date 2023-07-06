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
} from "./list.styles";
import { getDateForm } from "src/main/commonsComponents/functional";
import { getListContentsInfo, ListContentsSelectType } from "./list.data";

import { _SpanTextWithHtml, _Button } from "mcm-js-commons";
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
  return (
    <CommentsList
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
          />
        </LabelWrapper>
        <ContentsWrapper>
          <Filedset isBug={info.category === "bug"}>
            <legend>
              <StarsForm
                isView
                isBugMode
                rating={info.bugLevel || 0}
                category=""
              />
            </legend>
            <ContentsInfo hasQuestion={info.category === "question"}>
              {info.category === "question" && (
                <QuestionTitle> Q. </QuestionTitle>
              )}
              <_SpanTextWithHtml
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

          {info.category === "question" && info.completeAnswer && (
            <ContentsInfo
              hasQuestion={info.category === "question"}
              isAnswer={true}
            >
              {info.category === "question" && (
                <QuestionTitle> A. </QuestionTitle>
              )}
              <_SpanTextWithHtml
                dangerouslySetInnerHTML={info.completeAnswer}
              />
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

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

import { _SpanTextWithHtml, _Button } from "mcm-js-commons";
import { ListContentsIProps } from "./list.contents.container";

// import ContentsOptionalPage from "./functional/contents.select.functional.container";

import _SelectForm from "../../../select/select.container";
import { getDateForm } from "src/main/commonsComponents/functional";
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
  deleteComments: (type: "delete" | "modify", name: string) => () => void;
  hover: boolean;
  name: string;
  _wrapperRef: MutableRefObject<HTMLLIElement>;
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
                <b className="date">{getDateForm(info.createdAt)}</b>
              )}
              {info.modifyAt && (
                <b className="date">
                  (수정 일자 : {getDateForm(info.modifyAt, true)})
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
                {(
                  [
                    { name: "수정", value: "modify" },
                    { name: "삭제", value: "delete" },
                  ].filter((el) => {
                    if (el.name === "수정") {
                      if (info.category === "bug" && info.bugStatus !== 0)
                        return false;
                      if (info.category === "question" && info.completeAnswer)
                        return false;
                      return true;
                    }
                    return true;
                  }) as Array<{ name: string; value: "modify" | "delete" }>
                ).map((el) => {
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

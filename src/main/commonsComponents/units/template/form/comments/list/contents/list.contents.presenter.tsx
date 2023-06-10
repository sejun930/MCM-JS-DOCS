import React, { MutableRefObject } from "react";
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
} from "./list.styles";

import { _SpanTextWithHtml, _Button } from "mcm-js-commons";
import { ListContentsIProps } from "./list.contents.container";

// import ContentsOptionalPage from "./functional/contents.select.functional.container";

import _SelectForm from "../../../select/select.container";
import { getDateForm, getUuid } from "src/main/commonsComponents/functional";

interface ListContentsUIProps {
  isMore: boolean;
  subContents: string;
  toggleMoreShow: () => void;
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
  getLabel,
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
}: ListContentsIProps & ListContentsUIProps) {
  return (
    <CommentsList
      hover={hover}
      onClick={() => toggleShowSelect(true)}
      ref={_wrapperRef}
    >
      {/* {render && ( */}
      <CommentsInfoWrapper>
        <LabelWrapper>
          {getLabel(info).map((el) => {
            return <React.Fragment key={getUuid()}>{el}</React.Fragment>;
          })}
        </LabelWrapper>
        <ContentsWrapper>
          <_SpanTextWithHtml
            dangerouslySetInnerHTML={moreShow ? contents : subContents}
          />
          {isMore && (
            <MoreShowWrapper>
              <_Button onClickEvent={toggleMoreShow} className="more-show">
                {moreShow ? "간략히" : "더 보기"}
              </_Button>
            </MoreShowWrapper>
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

            <SelectWrapper className="select-wrapper">
              <OptionalButton>...</OptionalButton>
              <_SelectForm
                show={showSelect}
                closeEvent={() => toggleShowSelect(false)}
                autoCloseOffTargetName={name}
              >
                {(
                  [
                    { name: "수정", value: "modify" },
                    { name: "삭제", value: "delete" },
                  ] as Array<{ name: string; value: "modify" | "delete" }>
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
      {/* )} */}
    </CommentsList>
  );
}

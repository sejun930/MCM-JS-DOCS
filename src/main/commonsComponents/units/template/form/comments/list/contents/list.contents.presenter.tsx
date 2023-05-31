import {
  CommentsInfoWrapper,
  CommentsList,
  ContentsWrapper,
  LabelWrapper,
  MoreShowWrapper,
  OptionalButton,
  OptionalWrapper,
  SelectWrapper,
  DateWrapper,
} from "./list.styles";
import React from "react";

import { _SpanTextWithHtml, _Button } from "mcm-js-commons";
import { ListContentsIProps } from "./list.contents.container";

import SelectListOptional from "src/main/commonsComponents/units/template/form/comments/list/contents/select/contents.select";
import { getDateForm, getUuid } from "src/main/commonsComponents/functional";
import { InfoTypes } from "../../comments.types";

interface ListContentsUIProps {
  isMore: boolean;
  subContents: string;
  toggleMoreShow: () => void;
  moreShow: boolean;
  contents: string;
  showSelect: boolean;
  toggleShowSelect: (bool?: boolean) => void;
  modifyComments: (comment: InfoTypes, isDelete?: boolean) => Promise<boolean>;
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
  modifyComments,
}: ListContentsIProps & ListContentsUIProps) {
  return (
    <CommentsList>
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
            <DateWrapper>
              {info.createdAt && ( // 작성일
                <b className="date">{getDateForm(info.createdAt)}</b>
              )}
              {info.modifyAt && (
                <b className="date">
                  (수정 일자 : {getDateForm(info.modifyAt, true)})
                </b>
              )}
            </DateWrapper>

            <SelectWrapper>
              <OptionalButton onClick={() => toggleShowSelect(true)}>
                ...
              </OptionalButton>
              <SelectListOptional
                show={showSelect}
                closeEvent={() => toggleShowSelect(false)}
                list={[
                  { name: "수정", value: "modify" },
                  { name: "삭제", value: "delete" },
                ]}
                info={info}
                modifyComments={modifyComments}
              />
            </SelectWrapper>
          </OptionalWrapper>
        </ContentsWrapper>
      </CommentsInfoWrapper>
      {/* )} */}
    </CommentsList>
  );
}

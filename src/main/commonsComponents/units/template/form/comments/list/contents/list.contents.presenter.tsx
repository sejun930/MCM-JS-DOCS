import {
  CommentsInfoWrapper,
  CommentsList,
  ContentsWrapper,
  LabelWrapper,
  MoreShowWrapper,
  OptionalButton,
  OptionalWrapper,
  SelectWrapper,
} from "./list.styles";
import React from "react";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

import { _SpanTextWithHtml, _Button } from "mcm-js-commons";
import { ListContentsIProps } from "./list.contents.container";

import SelectListOptional from "src/main/commonsComponents/units/template/form/comments/list/contents/select/contents.select";

interface ListContentsUIProps {
  isMore: boolean;
  subContents: string;
  toggleMoreShow: () => void;
  moreShow: boolean;
  contents: string;
  showSelect: boolean;
  toggleShowSelect: (bool?: boolean) => void;
}

export default function ListContentsInfoUIPage({
  info,
  date,
  getLabel,
  subContents,
  isMore,
  toggleMoreShow,
  moreShow,
  contents,
  showSelect,
  toggleShowSelect,
}: ListContentsIProps & ListContentsUIProps) {
  const { getUuid } = CommonsHooksComponents();
  return (
    <CommentsList>
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
            <b className="createdAt">{date}</b>

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
              />
            </SelectWrapper>
          </OptionalWrapper>
        </ContentsWrapper>
      </CommentsInfoWrapper>
    </CommentsList>
  );
}

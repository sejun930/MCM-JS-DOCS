import { MutableRefObject } from "react";
import styled from "@emotion/styled";

import { _SpanTextWithHtml, _Button } from "mcm-js-commons";
import { InfoTypes } from "../../write/comments.write.types";
import { ListContentsIProps } from "./list.contents.container";

interface ListContentsUIProps {
  isMore: boolean;
  subContents: string;
  toggleMoreShow: () => void;
  moreShow: boolean;
  contents: string;
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
}: ListContentsIProps & ListContentsUIProps) {
  return (
    <CommentsList>
      <CommentsInfoWrapper>
        <LabelWrapper>{getLabel(info)}</LabelWrapper>

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
            <OptionalButton>...</OptionalButton>
          </OptionalWrapper>
        </ContentsWrapper>
      </CommentsInfoWrapper>
    </CommentsList>
  );
}

export const CommentsList = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px;
  border-top: dotted 1px black;
  transition: all 0.3s ease-out;
  min-height: 70px;

  :hover {
    background-color: #dddddd;

    .category-contents {
      /* -webkit-line-clamp: initial; 표시할 최대 줄 수 */
    }
  }
`;

export const CommentsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0px 28px;

  @keyframes SHOW_CATEGORY {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  animation: SHOW_CATEGORY 0.4s ease;

  .createdAt {
    font-size: 12px;
    color: #888888;
    font-family: "Manlo";
    word-spacing: 1px;
    margin-top: 16px;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button label {
    cursor: pointer;
  }
`;

export const MoreShowWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 18px;

  .more-show {
    padding: 10px 0px;
    width: 100%;
  }
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const OptionalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OptionalButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  /* display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0; */
`;

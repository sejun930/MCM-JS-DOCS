import styled from "@emotion/styled";

import _SubTitleTemplate from "../../title/subTitle";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import CommentsListPage from "./list/comments.list.container";
import CommentsWritePage from "./write/comments.write.container";
import _InfinityScroll from "../infinity";

import { CommentsAllInfoTypes, InfoTypes } from "./comments.types";
import { _Title } from "mcm-js-commons";

export default function CommentsUIPage({
  commentsInfo,
  addComments,
  modifyComments,
  changeInfo,
  moreLoad,
  allPage,
}: {
  commentsInfo: CommentsAllInfoTypes;
  addComments: (data: InfoTypes) => Promise<boolean>;
  modifyComments: (comment: InfoTypes, isDelete?: boolean) => Promise<boolean>;
  changeInfo: (info: CommentsAllInfoTypes) => void;
  moreLoad: () => void;
  allPage: number;
}) {
  return (
    <>
      <_SubTitleTemplate
        title="Comments"
        className="comments-subTitle"
        remakrs="해당 모듈에 대한 사용후기 및 개선점 등을 남겨주세요!"
      />
      <CommentsWritePage addComments={addComments} />
      <_InfinityScroll moreLoad={moreLoad}>
        <CommentsListPage
          commentsInfo={commentsInfo}
          modifyComments={modifyComments}
          changeInfo={changeInfo}
        />
      </_InfinityScroll>
      <TitleWrapper>
        {(commentsInfo.commentsList.length &&
          allPage === commentsInfo.filter.page && (
            <_Title titleLevel="h2"> 모든 데이터를 조회했습니다. </_Title>
          )) || <></>}
      </TitleWrapper>
    </>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  color: gray;

  h2 {
    cursor: default;
  }

  @media ${breakPoints.mobileLarge} {
    padding: 40px 0px;
    h2 {
      font-size: 20px;
    }
  }
`;

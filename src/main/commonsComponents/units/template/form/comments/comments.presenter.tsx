import styled from "@emotion/styled";

import _SubTitleTemplate from "../../title/subTitle";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import CommentsListPage from "./list/comments.list.container";
import CommentsWritePage from "./write/comments.write.container";
import _InfinityScroll from "../infinity";

import { CommentsAllInfoTypes } from "./comments.types";
import { _Title } from "mcm-js-commons";

export default function CommentsUIPage({
  commentsInfo,
  changeInfo,
  moreLoad,
  adminLogin,
  module,
  fetchCommentsList,
  render,
  loading,
}: {
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
  moreLoad: () => void;
  adminLogin: boolean;
  module: string;
  fetchCommentsList: (info?: CommentsAllInfoTypes) => void;
  render: boolean;
  loading: boolean;
}) {
  // 모든 데이터를 조회했는지에 대한 여부 확인
  const endRender =
    commentsInfo.commentsList.length &&
    !loading &&
    commentsInfo.filter.allData <=
      commentsInfo.filter.page * commentsInfo.filter.limit;

  return (
    <>
      <_SubTitleTemplate
        title="Comments"
        className="comments-subTitle"
        remakrs={`해당 모듈에 대한 사용후기 및 개선점 등을 남겨주세요! ${
          (adminLogin && "[🛠]") || ""
        }`}
      />

      {(render && (
        <CommentsWrapper>
          <CommentsInfoWrapper>
            {loading && (
              <Loading>
                <LoadingContents>
                  <_Title className="loading-title">
                    🎤 데이터 부르는 중 🎶
                  </_Title>
                </LoadingContents>
              </Loading>
            )}

            <CommentsWritePage
              module={module}
              commentsInfo={commentsInfo}
              fetchCommentsList={fetchCommentsList}
            />
          </CommentsInfoWrapper>
          <_InfinityScroll moreLoad={moreLoad}>
            <CommentsListPage
              commentsInfo={commentsInfo}
              changeInfo={changeInfo}
              adminLogin={adminLogin}
              fetchCommentsList={fetchCommentsList}
            />
          </_InfinityScroll>
          <TitleWrapper endRender={endRender || false}>
            {(endRender && (
              <_Title titleLevel="h2"> 모든 데이터를 조회했습니다. </_Title>
            )) || <></>}
          </TitleWrapper>
        </CommentsWrapper>
      )) || (
        <LoadingPageTitle> 댓글 페이지를 호출하고 있습니다.</LoadingPageTitle>
      )}
    </>
  );
}

export const CommentsInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: gray;

  ${(props: { endRender?: boolean }) =>
    props.endRender && {
      paddingTop: "30px",
      paddingBottom: "50px",
    }}

  h2 {
    cursor: default;
  }

  @media ${breakPoints.mobileLarge} {
    padding-top: 0px;
    padding-bottom: 0px;

    h2 {
      font-size: 20px;
      padding: 60px 0px;
    }
  }
`;

export const LoadingPageTitle = styled(_Title)`
  /* margin: 60px 0px; */
  color: gray;
  cursor: wait;
  margin: 40px 0px;
  margin-bottom: 60px;

  @media ${breakPoints.mobileLarge} {
    text-align: center;
    font-size: 30px;
    margin: 40px 0px;
  }

  @media ${breakPoints.mobileSmall} {
    font-size: 6vw;
    margin: 5vw 0px;
  }
`;

export const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const LoadingContents = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
  width: 100%;
  height: 100%;

  .loading-title {
    position: sticky;
    top: 50%;
    text-align: center;
    cursor: wait;
  }

  @media ${breakPoints.mobileSmall} {
    .loading-title {
      font-size: 9vw;
      white-space: pre;
    }
  }
`;

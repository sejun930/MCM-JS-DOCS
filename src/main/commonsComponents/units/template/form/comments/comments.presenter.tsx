import {
  CommentsInfoWrapper,
  CommentsWrapper,
  Loading,
  LoadingContents,
  LoadingPageTitle,
  TitleWrapper,
} from "./comments.styles";
import _SubTitleTemplate from "../../title/subTitle";

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
        <CommentsWrapper className="comments-wrapper">
          <CommentsInfoWrapper className="comments-items">
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
              <_Title titleLevel="h2" className="load-complete">
                {" "}
                모든 데이터를 조회했습니다.{" "}
              </_Title>
            )) || <></>}
          </TitleWrapper>
        </CommentsWrapper>
      )) || (
        <LoadingPageTitle> 댓글 페이지를 호출하고 있습니다.</LoadingPageTitle>
      )}
    </>
  );
}

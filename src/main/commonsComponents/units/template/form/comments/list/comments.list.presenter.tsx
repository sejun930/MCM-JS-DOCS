import {
  Category,
  CategoryWrapper,
  CategoryContents,
  CategoryItems,
  CommentListItems,
  CommentsListWrapper,
  EmptyWrapper,
  Shadow,
  // PaginationWrapper,
} from "./comments.list.styles";
import { MutableRefObject } from "react";

import { InfoTypes, CommentsAllInfoTypes } from "../comments.types";
import { categoryInitList } from "../write/comments.write.types";

import { _PText, _Button } from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";

import ListContentsInfoPage from "./contents/list.contents.container";
import CommentsFilterPage from "./filter";
import _PaginationForm from "../../pagination";

export default function CommentsListUIPage({
  commentsInfo,
  changeInfo,
  listRef,
  fetchCommentsList,
}: // changePage,
{
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
  listRef: MutableRefObject<HTMLUListElement>;
  changePage: (page: number) => void;
  fetchCommentsList: (info?: CommentsAllInfoTypes) => void;
}) {
  return (
    <CommentsListWrapper
      id="comments-list-wrapper"
      className="comments-list-render"
    >
      <CategoryWrapper>
        <CategoryContents>
          <CategoryItems render={commentsInfo.countList.all !== undefined}>
            {Object.entries(commentsInfo.countList).map((el, key) => {
              const [name] = el;

              // 현재 선택되어 있는 카테고리인지?
              const isSelected = commentsInfo.selectCategory === name;

              const info = { ...commentsInfo, ["selectCategory"]: name };

              // 해당 카테고리의 개수
              let categoryLen: string | number =
                commentsInfo.countList[name || "all"];
              if (categoryLen > 999) categoryLen = `999+`;

              // 선택 불가능한 카테고리인지? (개수가 0개일 때)
              const isDisable = categoryLen === 0;

              return (
                <Category
                  key={`comments-category-list-${name}-${key}`}
                  selected={isSelected}
                  isDisable={isDisable}
                >
                  <_Button
                    onClickEvent={() =>
                      (!isSelected && !isDisable && changeInfo(info)) ||
                      undefined
                    }
                  >
                    {categoryInitList[name]} ( {categoryLen} )
                  </_Button>
                </Category>
              );
            })}
          </CategoryItems>
          <Shadow />
        </CategoryContents>

        {commentsInfo.countList.all !== undefined && (
          <CommentsFilterPage
            commentsInfo={commentsInfo}
            changeInfo={changeInfo}
          />
        )}
      </CategoryWrapper>

      {!commentsInfo.commentsList.length ? (
        <EmptyWrapper>
          <_PText className="empty-list">
            등록된 댓글이 없습니다. <br />
            제일 먼저 댓글을 등록해보세요!
          </_PText>
        </EmptyWrapper>
      ) : (
        <CommentListItems ref={listRef}>
          {commentsInfo.commentsList.map((el) => (
            <ListContentsInfoPage
              key={getUuid()}
              info={el}
              commentsInfo={commentsInfo}
              changeInfo={changeInfo}
              fetchCommentsList={fetchCommentsList}
            />
          ))}
          {/* <PaginationWrapper>
            <_PaginationForm
              allData={commentsInfo.filter.allData}
              currentPage={commentsInfo.filter.page}
              limit={commentsInfo.filter.limit}
              changePageEvent={changePage}
              startPage={commentsInfo.filter.startPage}
            />
          </PaginationWrapper> */}
        </CommentListItems>
      )}
    </CommentsListWrapper>
  );
}

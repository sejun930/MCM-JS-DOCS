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

import { CommentsAllInfoTypes } from "../comments.types";
import { categoryInitList } from "../write/comments.write.types";

import { _PText, _Button } from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";

import ListContentsInfoPage from "./contents/list.contents.container";
import CommentsFilterPage from "./filter";
// import _PaginationForm from "../../pagination";

export default function CommentsListUIPage({
  commentsInfo,
  changeInfo,
  listRef,
  fetchCommentsList,
}: {
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
  listRef: MutableRefObject<HTMLUListElement>;
  fetchCommentsList: (info?: CommentsAllInfoTypes) => void;
}) {
  return (
    <CommentsListWrapper
      id="comments-list-wrapper"
      className="comments-list-render"
    >
      <CategoryWrapper className="comments-list-category-wrapper">
        <CategoryContents>
          <CategoryItems
            className="comments-category-wrapper"
            render={commentsInfo.countFilterList.all !== undefined}
          >
            {Object.entries(commentsInfo.countFilterList).map((el, key) => {
              const name = el[0] || "all";

              // 현재 선택되어 있는 카테고리인지?
              const isSelected = commentsInfo.selectCategory === name;
              const info = { ...commentsInfo, ["selectCategory"]: name };

              // 해당 카테고리의 개수
              let categoryLen: string | number =
                commentsInfo.countFilterList[name].count;
              if (categoryLen > 999) categoryLen = `999+`;

              // 선택 불가능한 카테고리인지? (개수가 0개일 때)
              const isDisable = categoryLen === 0;
              return (
                <Category
                  className="comments-category"
                  key={`comments-category-list-${name}-${key}`}
                  selected={isSelected}
                  isDisable={isDisable}
                >
                  <_Button
                    className={(isSelected && "selected-category") || ""}
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
          <Shadow className="category-list-shadow" />
        </CategoryContents>

        {commentsInfo.countFilterList.all.count !== undefined && (
          <CommentsFilterPage
            commentsInfo={commentsInfo}
            changeInfo={changeInfo}
          />
        )}
      </CategoryWrapper>

      {!commentsInfo.commentsList.length ? (
        <EmptyWrapper>
          <_PText className="empty-list">조회된 댓글이 없습니다.</_PText>
        </EmptyWrapper>
      ) : (
        <CommentListItems ref={listRef} className="comments-list-items">
          {commentsInfo.commentsList.map((el) => (
            <ListContentsInfoPage
              key={getUuid()}
              info={el}
              commentsInfo={commentsInfo}
              changeInfo={changeInfo}
              fetchCommentsList={fetchCommentsList}
            />
          ))}
        </CommentListItems>
      )}
    </CommentsListWrapper>
  );
}

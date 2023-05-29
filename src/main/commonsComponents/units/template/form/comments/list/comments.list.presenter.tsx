import {
  Category,
  CategoryWrapper,
  CategoryItems,
  FilterWrapper,
  CommentListItems,
  CommentsListWrapper,
  EmptyWrapper,
} from "./comments.list.styles";

import { InfoTypes } from "../comments.types";
import { categoryInitList } from "../write/comments.write.types";
import { getDateForm } from "src/main/commonsComponents/functional";

import {
  _PText,
  _Button,
  _SpanTextWithHtml,
  _Title,
  _Input,
} from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";

import ListContentsInfoPage from "./contents/list.contents.container";
import CommentsSearchPage from "./search";
import { FetchCommentsListTypes } from "src/commons/store/comments";

export default function CommentsListUIPage({
  commentsList,
  category,
  changeCategory,
  countList,
  getLabel,
  filterCommentsList,
  modifyComments,
}: {
  commentsList: Array<InfoTypes>;
  category: string;
  changeCategory: (category: string) => void;
  countList: { [key: string]: number };
  getLabel: (info: InfoTypes) => Array<JSX.Element>;
  filterCommentsList: (props: FetchCommentsListTypes) => void;
  modifyComments: (comment: InfoTypes) => void;
}) {
  return (
    <CommentsListWrapper>
      <CategoryWrapper>
        <CategoryItems>
          {categoryInitList.map((listInfo, key) => {
            // 현재 선택되어 있는 카테고리인지?
            const isSelected = category === listInfo.value;

            return (
              <Category
                key={`comments-category-list-${listInfo.value}-${key}`}
                selected={isSelected}
              >
                <_Button
                  onClickEvent={() =>
                    (!isSelected &&
                      filterCommentsList({ category: listInfo.value })) ||
                    undefined
                  }
                >
                  {listInfo.secondName || listInfo.name} ({" "}
                  {countList[listInfo.value || "all"]} )
                </_Button>
              </Category>
            );
          })}
        </CategoryItems>

        {/* <FilterWrapper>
          <CommentsSearchPage />
        </FilterWrapper> */}
      </CategoryWrapper>

      {!commentsList.length ? (
        <EmptyWrapper>
          <_PText className="empty-list">
            등록된 댓글이 없습니다. <br />
            제일 먼저 댓글을 등록해보세요!
          </_PText>
        </EmptyWrapper>
      ) : (
        <CommentListItems>
          {commentsList.map((el) => {
            // let createdAt; // 작성 일자 저장
            // if (el.createdAt) createdAt = getDateForm(el.createdAt);

            return (
              <ListContentsInfoPage
                key={getUuid()}
                info={el}
                getLabel={getLabel}
                filterCommentsList={filterCommentsList}
                modifyComments={modifyComments}
              />
            );
          })}
        </CommentListItems>
      )}
    </CommentsListWrapper>
  );
}

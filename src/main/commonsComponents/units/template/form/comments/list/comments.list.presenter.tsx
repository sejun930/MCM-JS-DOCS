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

import { CommentsAllInfoTypes } from "../comments.types";

export default function CommentsListUIPage({
  commentsInfo,
  saveCommentsInfo,
  getLabel,
  modifyComments,
  changeCategory,
}: {
  commentsInfo: CommentsAllInfoTypes;
  saveCommentsInfo: (info: Partial<CommentsAllInfoTypes>) => void;
  getLabel: (info: InfoTypes) => Array<JSX.Element>;
  modifyComments: (comment: InfoTypes, isDelete?: boolean) => Promise<boolean>;
  changeCategory: (category: string) => void;
}) {
  return (
    <CommentsListWrapper>
      <CategoryWrapper>
        <CategoryItems render={commentsInfo.countList.all !== undefined}>
          {Object.entries(commentsInfo.countList).map((el, key) => {
            const [name] = el;

            // 현재 선택되어 있는 카테고리인지?
            const isSelected = commentsInfo.selectCategory === name;

            return (
              <Category
                key={`comments-category-list-${name}-${key}`}
                selected={isSelected}
              >
                <_Button
                  onClickEvent={() =>
                    (!isSelected && changeCategory(name)) || undefined
                  }
                >
                  {categoryInitList[name]} ({" "}
                  {commentsInfo.countList[name || "all"]} )
                </_Button>
              </Category>
            );
          })}
        </CategoryItems>

        {/* <FilterWrapper>
          <CommentsSearchPage />
        </FilterWrapper> */}
      </CategoryWrapper>

      {!commentsInfo.commentsList.length ? (
        <EmptyWrapper>
          <_PText className="empty-list">
            등록된 댓글이 없습니다. <br />
            제일 먼저 댓글을 등록해보세요!
          </_PText>
        </EmptyWrapper>
      ) : (
        <CommentListItems>
          {commentsInfo.commentsList.map((el) => (
            <ListContentsInfoPage
              key={getUuid()}
              info={el}
              getLabel={getLabel}
              modifyComments={modifyComments}
            />
          ))}
        </CommentListItems>
      )}
    </CommentsListWrapper>
  );
}

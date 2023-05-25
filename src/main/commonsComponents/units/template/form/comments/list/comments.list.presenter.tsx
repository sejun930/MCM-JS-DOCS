import {
  Category,
  CategoryWrapper,
  CommentListItems,
  CommentsListWrapper,
  EmptyWrapper,
} from "./comments.list.styles";

import { InfoTypes, categoryInitList } from "../write/comments.write.types";
import { getDateForm } from "src/main/commonsComponents/functional";

import { _PText, _Button, _SpanTextWithHtml, _Title } from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";

import ListContentsInfoPage from "./contents/list.contents.container";

export default function CommentsListUIPage({
  commentsList,
  category,
  changeCategory,
  countList,
  getLabel,
  render,
}: {
  commentsList: Array<InfoTypes>;
  category: string;
  changeCategory: (category: string) => void;
  countList: { [key: string]: number };
  getLabel: (info: InfoTypes) => Array<JSX.Element>;
  render: boolean;
}) {
  return (
    <CommentsListWrapper>
      <CategoryWrapper>
        {categoryInitList.map((listInfo, key) => {
          return (
            <Category key={`comments-category-list-${listInfo.value}-${key}`}>
              <_Button
                className={(key === 0 && "category-select-button") || undefined}
                onClickEvent={() =>
                  (category !== listInfo.value &&
                    changeCategory(listInfo.value)) ||
                  undefined
                }
                id={`category-${listInfo.value || "all"}`}
              >
                {listInfo.secondName || listInfo.name} ({" "}
                {countList[listInfo.value || "all"]} )
              </_Button>
            </Category>
          );
        })}
      </CategoryWrapper>

      {!commentsList.length ? (
        <EmptyWrapper>
          <_PText className="empty-list">
            등록된 댓글이 없습니다. <br />
            제일 먼저 댓글을 등록해보세요!
          </_PText>
        </EmptyWrapper>
      ) : (
        <CommentListItems render={render}>
          {commentsList.map((el) => {
            let createdAt; // 작성 일자 저장
            if (el.createdAt) createdAt = getDateForm(el.createdAt);

            return (
              <ListContentsInfoPage
                key={getUuid()}
                info={el}
                getLabel={getLabel}
                render={render}
              />
            );
          })}
        </CommentListItems>
      )}
    </CommentsListWrapper>
  );
}

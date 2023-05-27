import {
  Category,
  CategoryWrapper,
  CategoryItems,
  FilterWrapper,
  CommentListItems,
  CommentsListWrapper,
  EmptyWrapper,
  //   Form,
} from "./comments.list.styles";

import { InfoTypes, categoryInitList } from "../write/comments.write.types";
import { getDateForm } from "src/main/commonsComponents/functional";

import {
  _PText,
  _Button,
  _SpanTextWithHtml,
  _Title,
  _Input,
} from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";
import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

import ListContentsInfoPage from "./contents/list.contents.container";
import CommentsSearchPage from "./search";

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
  changeCategory: ({ category }: { category: string }) => void;
  countList: { [key: string]: number };
  getLabel: (info: InfoTypes) => Array<JSX.Element>;
  render: boolean;
}) {
  const { getRouter } = CommonsHooksComponents();
  const router = getRouter();

  return (
    <CommentsListWrapper>
      <CategoryWrapper>
        <CategoryItems>
          {categoryInitList.map((listInfo, key) => {
            let selectCategory = router.query.c;
            if (selectCategory === "all") selectCategory = "";

            return (
              <Category
                key={`comments-category-list-${listInfo.value}-${key}`}
                selected={selectCategory === listInfo.value}
              >
                <_Button
                  onClickEvent={() =>
                    (selectCategory !== listInfo.value &&
                      changeCategory({ category: listInfo.value })) ||
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

      {/* {!commentsList.length ? (
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
      )} */}
    </CommentsListWrapper>
  );
}

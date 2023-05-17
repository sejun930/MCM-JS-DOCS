import styled from "@emotion/styled";
import { InfoTypes, categoryInitList } from "../write/comments.write.types";

import { _PText, _Button, _SpanText } from "mcm-js-commons";
import { categoryName } from "../write/comments.write.types";
import { v4 as uuidv4 } from "uuid";

export default function CommentsListUIPage({
  commentsList,
  category,
  changeCategory,
  countList,
}: {
  commentsList: Array<InfoTypes>;
  category: string;
  changeCategory: (category: string) => void;
  countList: { [key: string]: number };
}) {
  return (
    <CommentsListWrapper>
      <CategoryWrapper>
        {categoryInitList.map((listInfo, key) => {
          // 현재 선택중인 카테고리
          const isSelected = category === listInfo.value;

          return (
            <Category
              key={`comments-category-list-${listInfo.value}-${key}`}
              isSelected={isSelected}
            >
              <_Button
                className="category-select-button"
                onClickEvent={() => changeCategory(listInfo.value)}
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
        <CommentListItems>
          {commentsList.map((el) => {
            return (
              <CommentsList key={uuidv4()}>
                <CommentsInfoWrapper>
                  {!category && (
                    <_SpanText className="category-label">
                      {categoryName[el.category]}
                    </_SpanText>
                  )}
                  <_SpanText className="category-contents">
                    {el.contents}
                  </_SpanText>
                </CommentsInfoWrapper>
              </CommentsList>
            );
          })}
        </CommentListItems>
      )}
    </CommentsListWrapper>
  );
}

interface StyleTypes {
  isSelected?: boolean;
}

export const CommentsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  gap: 50px 0px;
`;

export const CategoryWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 0px 26px;
  height: 24px;
  border-left: solid 3px gray;
  padding-left: 16px;
`;

export const Category = styled.li`
  .category-select-button {
    transition: all 0.3s;
    font-size: 14px;
    color: #666666;

    ${(props: StyleTypes) =>
      props.isSelected && {
        fontWeight: 700,
        color: "#aa5656",
        cursor: "default",
      }}
  }
`;

export const EmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  background-color: #cccccc;
  border-radius: 10px;
  padding: 36px 0px;
  cursor: not-allowed;

  .empty-list {
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.04rem;
    color: #656565;
  }
`;

export const CommentListItems = styled.ul`
  display: flex;
  flex-direction: column;

  .leng {
    font-size: 14px;
  }
`;

export const CommentsList = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-top: dotted 1px black;
  gap: 20px 0px;
`;

export const CommentsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 20px;

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

  .category-label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    background-color: #c88ea7;
    color: #ffffff;
    font-weight: 700;
    padding: 6px 0px;
    border-radius: 10px;
    min-width: 70px;
  }
`;

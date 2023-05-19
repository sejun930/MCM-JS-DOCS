import styled from "@emotion/styled";
import { InfoTypes, categoryInitList } from "../write/comments.write.types";
import { getDateForm } from "src/main/commonsComponents/functional";

import { _PText, _Button, _SpanText } from "mcm-js-commons";
import { categoryName } from "../write/comments.write.types";
import { v4 as uuidv4 } from "uuid";
import StarsForm from "../write/stars";

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
            let date; // 작성 일자 저장
            if (el.createdAt)
              date = getDateForm(
                new Date(
                  el.createdAt.seconds * 1000 +
                    el.createdAt.nanoseconds / 1000000
                )
              );

            return (
              <CommentsList key={uuidv4()}>
                <CommentsInfoWrapper>
                  {!category && (
                    <_SpanText className="category-label">
                      {categoryName[el.category]}
                    </_SpanText>
                  )}
                  {el.category === "review" && (
                    <StarsForm isView category="review" rating={el.rating} />
                  )}
                  <_SpanText className="category-contents">
                    {el.contents}
                    <b className="createdAt">{date}</b>
                  </_SpanText>
                </CommentsInfoWrapper>
                <OptionalWrapper className="optional">
                  <OptaionalItems>수정</OptaionalItems>
                  <OptaionalItems>삭제</OptaionalItems>
                  <OptaionalItems>답변</OptaionalItems>
                </OptionalWrapper>
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
  /* gap: 20px 0px; */
  transition: all 0.3s ease-out;
  min-height: 70px;

  :hover {
    background-color: #dddddd;

    /* .optional {
      position: relative;
      max-height: 40px;
      padding-top: 20px;
    } */
  }
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
    cursor: default;
  }

  .createdAt {
    font-size: 12px;
    padding-left: 10px;
    color: #888888;
    font-family: "Manlo";
    word-spacing: 1px;
  }
`;

export const OptionalWrapper = styled.ul`
  display: flex;
  gap: 0px 10px;
  transition: all 0.4s ease;
  max-height: 0px;
  overflow: hidden;
  /* position: absolute; */
`;

export const OptaionalItems = styled.li``;

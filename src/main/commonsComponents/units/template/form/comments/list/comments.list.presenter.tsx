import styled from "@emotion/styled";
import { InfoTypes, categoryInitList } from "../write/comments.write.types";

import { _PText, _Button } from "mcm-js-commons";

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
          {/* <_PText className="leng">
            현재 {commentsList.length}개의 댓글이 등록되어 있습니다.
          </_PText> */}
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

  /* margin-top: 30px; */
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

export const CommentListItems = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .leng {
    font-size: 14px;
  }
`;

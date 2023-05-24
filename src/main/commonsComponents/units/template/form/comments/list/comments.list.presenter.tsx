import styled from "@emotion/styled";
import { InfoTypes, categoryInitList } from "../write/comments.write.types";
import { getDateForm } from "src/main/commonsComponents/functional";

import { _PText, _Button, _SpanTextWithHtml } from "mcm-js-commons";
import { v4 as uuidv4 } from "uuid";

import ListContentsInfoPage from "./contents/list.contents.container";

export default function CommentsListUIPage({
  commentsList,
  category,
  changeCategory,
  countList,
  getLabel,
}: {
  commentsList: Array<InfoTypes>;
  category: string;
  changeCategory: (category: string) => void;
  countList: { [key: string]: number };
  getLabel: (info: InfoTypes) => Array<JSX.Element>;
}) {
  return (
    <CommentsListWrapper>
      <CategoryWrapper>
        {categoryInitList.map((listInfo, key) => {
          return (
            <Category key={`comments-category-list-${listInfo.value}-${key}`}>
              <_Button
                className={(key === 0 && "category-select-button") || undefined}
                onClickEvent={() => changeCategory(listInfo.value)}
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
              <ListContentsInfoPage
                key={uuidv4()}
                info={el}
                date={date || ""}
                getLabel={getLabel}
              />
              //   <CommentsList key={uuidv4()}>
              //   <CommentsInfoWrapper>
              //     <LabelWrapper>{getLabel(el)}</LabelWrapper>

              //     <ContentsWrapper>
              //       <_SpanTextWithHtml
              //         dangerouslySetInnerHTML={el.contents}
              //         className="category-contents"
              //       />
              //       <b className="createdAt">{date}</b>
              //     </ContentsWrapper>
              //   </CommentsInfoWrapper>
              //   <OptionalButton className="disable-drag">...</OptionalButton>
              //   </CommentsList>
            );
          })}
        </CommentListItems>
      )}
    </CommentsListWrapper>
  );
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
  .cmm-button-unit {
    transition: all 0.3s;
    font-size: 14px;
    color: #666666;
  }

  .category-select-button {
    color: #aa5656;
    cursor: default;
    font-weight: 700;
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

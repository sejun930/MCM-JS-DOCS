import {
  Category,
  CategoryWrapper,
  CategoryItems,
  CommentListItems,
  CommentsListWrapper,
  EmptyWrapper,
} from "./comments.list.styles";
import { MutableRefObject } from "react";

import { InfoTypes, CommentsAllInfoTypes } from "../comments.types";
import { categoryInitList } from "../write/comments.write.types";

import {
  _PText,
  _Button,
  // _SpanTextWithHtml,
  // _Title,
  // _Input,
} from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";

import ListContentsInfoPage from "./contents/list.contents.container";
import CommentsFilterPage from "./filter";
// import PageNationPage from "../../pageNation";

export default function CommentsListUIPage({
  commentsInfo,
  modifyComments,
  changeInfo,
  listRef,
  adminLogin,
}: {
  commentsInfo: CommentsAllInfoTypes;
  modifyComments: (comment: InfoTypes, isDelete?: boolean) => Promise<boolean>;
  changeInfo: (info: CommentsAllInfoTypes) => void;
  listRef: MutableRefObject<HTMLUListElement>;
  adminLogin: boolean;
}) {
  return (
    <CommentsListWrapper>
      <CategoryWrapper>
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

            return (
              <Category
                key={`comments-category-list-${name}-${key}`}
                selected={isSelected}
              >
                <_Button
                  onClickEvent={() =>
                    (!isSelected && changeInfo(info)) || undefined
                  }
                >
                  {categoryInitList[name]} ( {categoryLen} )
                </_Button>
              </Category>
            );
          })}
        </CategoryItems>

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
              modifyComments={modifyComments}
              commentsInfo={commentsInfo}
              changeInfo={changeInfo}
            />
          ))}
        </CommentListItems>
      )}
    </CommentsListWrapper>
  );
}

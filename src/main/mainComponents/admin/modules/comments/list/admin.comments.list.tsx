import styled from "@emotion/styled";
import { _Title } from "mcm-js-commons";

import { FetchCommentsTypes } from "../admin.comments.types";
import AdminCommentsDetailPage from "./detail/admin.comments.detail.container";
import { CommentsAllInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";

export default function AdminCommentsListPage({
  info,
  changeLoading,
  fetchComments,
}: {
  info: CommentsAllInfoTypes;
  changeLoading: (bool: boolean) => void;
} & FetchCommentsTypes) {
  const { commentsList, selectModule, selectCategory } = info;
  const isEmpty = commentsList.length === 0;

  return (
    <Wrapper isEmpty={isEmpty} id="admin-comments-list-wrapper">
      <ListWrapper>
        {(commentsList &&
          commentsList.length &&
          commentsList.map((el, idx) => (
            <AdminCommentsDetailPage
              key={`admin-commnets-list-${selectModule}-${selectCategory}-${el.id}-${idx}`}
              info={el}
              // @ts-ignore
              commentsInfo={info}
              changeLoading={changeLoading}
              fetchComments={fetchComments}
            />
          ))) || (
          <_Title titleLevel="h2" className="empty-title">
            조회된 데이터가 없습니다. <br /> 필터 및 카테고리를 재설정해보세요.
          </_Title>
        )}
      </ListWrapper>
    </Wrapper>
  );
}

export interface StyleTypes {
  isEmpty?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border-top: double 4px black; */
  /* border-bottom: solid 3px black; */

  ${(props: StyleTypes) =>
    props.isEmpty && {
      borderBottom: "unset",
    }}
`;

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  /* gap: 30px 0px; */

  .empty-title {
    display: flex;
    color: gray;
  }
`;

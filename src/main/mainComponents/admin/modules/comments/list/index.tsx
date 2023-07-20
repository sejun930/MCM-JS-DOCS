import styled from "@emotion/styled";
import { _Title, _SpanText, _Button, _PTextWithHtml } from "mcm-js-commons";

import { AdminCommentsInitType } from "../admin.comments.types";
import { getDateForm } from "src/main/commonsComponents/functional";
import { useState } from "react";

import AdminCommentsDetailPage from "./detail";

export default function AdminCommentsListPage({
  info,
  changeLoading,
}: {
  info: AdminCommentsInitType;
  changeLoading: (bool: boolean) => void;
}) {
  const { commentsList, selectModule, selectCategory } = info;
  const isEmpty = commentsList.length === 0;

  // 댓글 삭제하기
  const removeComments = () => {};

  return (
    <Wrapper isEmpty={isEmpty}>
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
  margin-top: 30px;
  border-top: double 4px black;
  border-bottom: solid 3px black;

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

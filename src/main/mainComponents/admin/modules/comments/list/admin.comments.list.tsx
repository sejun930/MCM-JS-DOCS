import styled from "@emotion/styled";
import { _Title, _SpanTextWithHtml } from "mcm-js-commons";

import { FetchCommentsTypes } from "../admin.comments.types";
import AdminCommentsDetailPage from "./detail/admin.comments.detail.container";
import { CommentsAllInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { AdminLoginTypes } from "src/commons/store/store.types";

export default function AdminCommentsListPage({
  info,
  changeLoading,
  fetchComments,
  adminLoginInfo,
}: {
  info: CommentsAllInfoTypes;
  changeLoading: (bool: boolean) => void;
  adminLoginInfo: AdminLoginTypes;
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
              adminLoginInfo={adminLoginInfo}
            />
          ))) || (
          <_Title titleLevel="h2" className="empty-title">
            <_SpanTextWithHtml
              dangerouslySetInnerHTML={
                !info.selectModule
                  ? `조회할 모듈 이름을 선택해주세요.`
                  : `조회된 데이터가 없습니다. <br /> 필터 및 카테고리를 재설정해보세요.`
              }
            />
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

  ${(props: StyleTypes) =>
    props.isEmpty && {
      borderBottom: "unset",
    }}
`;

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  .empty-title {
    display: flex;
    color: gray;
  }
`;

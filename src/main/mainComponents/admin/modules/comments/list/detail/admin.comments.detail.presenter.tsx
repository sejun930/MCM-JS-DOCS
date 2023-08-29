import {
  ButtonWrapper,
  ListDetailWrapper,
  ListHeaderWrapper,
  ListOptionalWrapper,
  RemoveButton,
} from "./admin.comments.detail.styles";

import { _SpanText } from "mcm-js-commons";
import {
  getDateForm,
  getLibraries,
} from "src/main/commonsComponents/functional";

import CommentsLabel from "src/main/commonsComponents/units/template/form/comments/list/label";
import AdminCommentsContentsPage from "./contents/admin.comments.contents.container";

import {
  CommentsAllInfoTypes,
  InfoTypes,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { FetchCommentsTypes } from "../../admin.comments.types";

const { Tooltip } = getLibraries();
export default function AdminCommentsDetailUIPage({
  info,
  commentsInfo,
  isAlreadyDeleted,
  removeComments,
  changeLoading,
  fetchComments,
}: {
  info: InfoTypes;
  commentsInfo: CommentsAllInfoTypes;
  isAlreadyDeleted: boolean;
  removeComments: (isBlock: boolean) => void;
  changeLoading: (bool: boolean) => void;
} & FetchCommentsTypes) {
  return (
    <ListDetailWrapper>
      <ListHeaderWrapper>
        <CommentsLabel info={info} adminLogin commentsInfo={commentsInfo} />
        <ListOptionalWrapper>
          {info.createdAt && (
            <Tooltip tooltipText="댓글 작성일" useShowAnimation>
              <_SpanText className="date">
                {getDateForm({
                  firebaseTimer: info.createdAt,
                  getDate: true,
                })}
              </_SpanText>
            </Tooltip>
          )}
          <ButtonWrapper>
            <RemoveButton
              onClickEvent={() =>
                (!isAlreadyDeleted && removeComments(false)) || undefined
              }
              buttonType="button"
              alreadyDeleted={isAlreadyDeleted}
            >
              삭제{(isAlreadyDeleted && "됨") || undefined}
            </RemoveButton>
            <RemoveButton
              onClickEvent={() => removeComments(true)}
              buttonType="button"
            >
              차단
            </RemoveButton>
          </ButtonWrapper>
        </ListOptionalWrapper>
      </ListHeaderWrapper>

      <AdminCommentsContentsPage
        info={info}
        changeLoading={changeLoading}
        commentsInfo={commentsInfo}
        fetchComments={fetchComments}
        isAlreadyDeleted={isAlreadyDeleted}
      />
    </ListDetailWrapper>
  );
}

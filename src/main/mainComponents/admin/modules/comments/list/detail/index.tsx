import styled from "@emotion/styled";

import CommentsLabel from "src/main/commonsComponents/units/template/form/comments/list/label";
import {
  CommentsAllInfoTypes,
  InfoTypes,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { AdminCommentsInitType } from "../../admin.comments.types";

import { Tooltip } from "mcm-js";
import {
  _SpanText,
  _Button,
  _PTextWithHtml,
  _SpanTextWithHtml,
  _Input,
} from "mcm-js-commons";
import { getDateForm } from "src/main/commonsComponents/functional";
import { getDoc, getResult } from "src/commons/libraries/firebase";
import AdminCommentsContentsPage from "./contents";
import apis from "src/commons/libraries/commons.apis";

export default function AdminCommentsDetailPage({
  info,
  commentsInfo,
  changeLoading,
}: {
  info: InfoTypes;
  commentsInfo: CommentsAllInfoTypes & AdminCommentsInitType;
  changeLoading: (bool: boolean) => void;
}) {
  // 개수 카운트 정보 가져오기
  const updateFilterCount = async (
    changeData: InfoTypes,
    isDelete?: boolean
  ) => {
    const { category, answer } = changeData;
    const countDoc = getDoc("comments", commentsInfo.selectModule, "count");

    const countList = getResult(await apis(countDoc).read());
    const target = countList.filter(
      (el) => el.category === changeData.category
    )[0];

    // 변경전의 원본 데이터
    const origin = { ...info };

    if (target) {
      if (category === "question") {
        // 질문에 답변이 등록될 경우 (= 기존 원본에 답변이 없었을 경우)
        if (answer && !origin.answer) {
          target["question-complete"]++;
        }
      }
    }

    // id값 제외하기
    const { id, ...updateResult } = target;

    // 개수 업데이트
    try {
      await countDoc.doc(id).update(updateResult);
      return true;
    } catch (err) {
      alert("개수 업데이트에 실패했습니다.");
      console.log(err);

      return false;
    }
  };

  // 댓글 삭제하기
  const removeComments = () => {};

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
                (info.deletedAt !== null && removeComments()) || undefined
              }
              buttonType="button"
            >
              삭제{(info.deletedAt && "됨") || undefined}
            </RemoveButton>
            <RemoveButton onClickEvent={removeComments} buttonType="button">
              차단
            </RemoveButton>
          </ButtonWrapper>
        </ListOptionalWrapper>
      </ListHeaderWrapper>

      <AdminCommentsContentsPage
        info={info}
        changeLoading={changeLoading}
        commentsInfo={commentsInfo}
        updateFilterCount={updateFilterCount}
      />
    </ListDetailWrapper>
  );
}

export const ListDetailWrapper = styled.li`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  border-bottom: solid 1px gray;
`;

export const ListHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .label-wrapper {
    flex-direction: row;
    gap: 0px 10px;
    align-items: center;
  }
`;

export const ListOptionalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0px 10px;

  .date {
    font-size: 12px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0px 10px;
`;

export const RemoveButton = styled(_Button)`
  font-size: 12px;
`;

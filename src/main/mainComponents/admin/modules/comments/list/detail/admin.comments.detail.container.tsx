import AdminCommentsDetailUIPage from "./admin.comments.detail.presenter";
import {
  _SpanText,
  _Button,
  _PTextWithHtml,
  _SpanTextWithHtml,
  _Input,
} from "mcm-js-commons";

import {
  CommentsAllInfoTypes,
  InfoTypes,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { AdminCommentsInitType } from "../../admin.comments.types";
import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

import {
  getDoc,
  getResult,
  getServerTime,
} from "src/commons/libraries/firebase";
import apis from "src/commons/libraries/apis/commons.apis";

export default function AdminCommentsDetailPage({
  info,
  commentsInfo,
  changeLoading,
  fetchComments,
}: {
  info: InfoTypes;
  commentsInfo: CommentsAllInfoTypes & AdminCommentsInitType;
  changeLoading: (bool: boolean) => void;
  fetchComments: (info?: AdminCommentsInitType) => void;
}) {
  // 이미 삭제된 댓글인지 체크
  const isAlreadyDeleted = info.deletedAt !== null;

  // 개수 카운트 정보 가져오기
  const updateFilterCount = async (
    changeData: InfoTypes,
    isDelete?: boolean
  ) => {
    const { category, answer } = changeData;
    const countDoc = getDoc("comments", commentsInfo.selectModule, "count");
    const countList = getResult(await apis().read(countDoc));

    const target = countList.filter(
      (el) => el.category === changeData.category
    )[0];

    if (target) {
      if (isDelete) {
        // 전체 개수에서 1개 제거
        target["count"]--;
      }

      if (category === "question") {
        if (!isDelete) {
          // 질문에 답변이 등록될 경우 (= 기존 원본에 답변이 없었을 경우)
          if (answer && !info.answer) {
            target["question-complete"]++;
          }
        } else {
          if (answer) {
            // 답변이 완료된 댓글 삭제라면 해당 개수만큼 제거
            target["question-complete"]--;
          }
        }
      } else if (category === "bug") {
        if (!isDelete) {
          // 이슈에 답변 등록
          if (info.bugStatus !== 2 && changeData.bugStatus === 2) {
            // 이슈 처리 완료라면 완료에 추가
            target["bug-complete"]++;
          }
        } else {
          if (info.bugStatus === 2) {
            // 해결이 완료된 이슈라면 해당 개수만큼 제거
            target["bug-complete"]--;
          }
          // 버그 레벨만큼 삭제
          target[`bug-${info.bugLevel}`]--;
        }
      } else if (category === "review") {
        // 리뷰 삭제하기
        if (isDelete) {
          // 해당 리뷰 점수만큼 제거
          target[`review-${info.rating}`]--;
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
  const removeComments = async (isBlock: boolean) => {
    // 삭제일 경우 이미 삭제된 게시물인지 체크
    if (!isBlock && info.deletedAt) return;

    let msg = "해당 댓글을 삭제하시겠습니까?";
    if (isBlock)
      msg = "해당 유저를 차단하시겠습니까? \n댓글은 자동으로 삭제됩니다.";

    if (window.confirm(msg)) {
      const _info: WriteInfoTypes = { ...(info as WriteInfoTypes) };
      // 삭제일 등록
      _info.deletedAt = getServerTime();

      let ableBlock = isBlock; // 차단 가능 여부
      try {
        await getDoc("comments", commentsInfo.selectModule, "comment")
          .doc(_info.id)
          .update(_info);

        if (isBlock) {
          // 이미 차단된 유저인지 검증
          const blockDoc = await getDoc("block", "user", "ip")
            .where("ip", "==", info.ip) // 해당 아이피 검색
            .where("canceledAt", "==", null)
            .limit(1)
            .get(); // 차단 해제되지 않은 유저만 검색

          if (!blockDoc.empty) {
            alert("이미 차단된 유저입니다.");
            ableBlock = false;
          } else {
            // 해당 유저 차단하기
            await apis().block({
              commentId: info.id,
              ip: info.ip,
              contents: info.contents,
              category: info.category,
              module: commentsInfo.selectModule,
            });
          }
        }

        // 전체 개수 및 필터 조정
        if (await updateFilterCount(_info as InfoTypes, true)) {
          alert(
            isBlock && ableBlock
              ? "차단이 완료되었습니다."
              : "댓글 삭제가 완료되었습니다."
          );
          fetchComments(commentsInfo);
        }
      } catch (err) {
        alert("댓글 삭제에 실패했습니다.");
        console.log(err);
      }
    }
  };

  return (
    <AdminCommentsDetailUIPage
      info={info}
      commentsInfo={commentsInfo}
      isAlreadyDeleted={isAlreadyDeleted}
      removeComments={removeComments}
      changeLoading={changeLoading}
      updateFilterCount={updateFilterCount}
      fetchComments={fetchComments}
    />
  );
}

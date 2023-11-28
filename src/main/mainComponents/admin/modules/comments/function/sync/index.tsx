import { _Button } from "mcm-js-commons";
import { FunctionPropsTypes } from "../../admin.comments.types";
import { deepCopy } from "src/main/commonsComponents/functional";

import countApis from "src/commons/libraries/apis/comments/count/count.apis";
import { getDoc, getResult } from "src/commons/libraries/firebase";

import {
  InfoTypes,
  initCountList,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
// import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import adminApis from "src/commons/libraries/apis/admin/admin.apis";
import apis from "src/commons/libraries/apis/commons.apis";

// 댓글 정보와 개수 최신화 업데이트
export default function SyncCommentsFunction(props: FunctionPropsTypes) {
  const { changeLoading, module, info, fetchComments, checkLoading } = props;

  // 개수 최신화하기
  const syncComments = async () => {
    if (!checkLoading() || !(await adminApis().check(true))) return;

    if (window.confirm("댓글 동기화 작업을 실행하시겠습니까?")) {
      const _info = deepCopy(info);
      const { countFilterList } = _info;

      try {
        changeLoading(true);

        // 전체 데이터 가져오기
        const commentsList = getResult(
          await apis(getDoc("comments", module, "comment")).read()
        );

        // 현재 모듈의 카운트 리스트 가져오기
        const countList = deepCopy(countFilterList);
        // 모든 개수 초기화
        initCountList.forEach((el) => {
          const { category } = el;
          countList[category] = { ...el, id: countList[category].id };
        });

        // 카테고리 개수 종합하기
        commentsList.forEach((el: InfoTypes) => {
          const {
            category,
            answer,
            answerCreatedAt,
            bugStatus,
            deletedAt,
            rating,
            bugLevel,
          } = el;

          // 삭제된 댓글이라면 삭제 1개 증가
          if (!deletedAt) {
            // 전체 개수 1개 증가
            countList.all.count++;
            // 해당 카테고리의 개수 1개 더하기
            countList[category].count++;
          } else {
            // 삭제되었다면 삭제 개수 1개 증가
            countList[category].deleted++;
            countList.all.deleted++;
          }

          if (category === "question") {
            if (answer && answerCreatedAt) {
              // 카테고리가 문의이면서, 답변이 등록되어 있는 경우

              // 삭제되었다면, 삭제 개수 1개 증가
              if (deletedAt) countList.question["question-complete-deleted"]++;
              // 삭제되지 않은 경우에만 완료 개수 1개 증가
              else countList.question["question-complete"]++;
            }
          } else if (category === "review") {
            // 카테고리가 리뷰일 경우

            if (!deletedAt) {
              // 삭제되지 않은 해당 점수의 카테고리 개수 1개 증가
              countList[category][`${category}-${rating}`]++;
            } else {
              // 삭제된 해당 평점의 삭제 개수 1개 증가
              countList[category][`${category}-${rating}-deleted`]++;
            }
          } else if (category === "bug") {
            // 카테고리가 이슈일 경우

            if (!deletedAt) {
              // 삭제되지 않은 해당 버그 레벨의 카테고리 개수 1개 증가
              countList[category][`${category}-${bugLevel}`]++;
            } else {
              // 삭제된 해당 버그 레벨의 삭제 개수 1개 증가
              countList[category][`${category}-${bugLevel}-deleted`]++;
            }

            if (bugStatus === 2) {
              if (!deletedAt) {
                // 해결 완료된 이슈일 경우, 해결 완료 1개 증가
                countList[category][`${category}-${bugLevel}-complete`]++;
                countList[category]["bug-complete"]++;
              } else {
                countList[category]["bug-complete-deleted"]++;

                // 삭제된 해결 완료 개수 1개 증가
                countList[category][
                  `${category}-${bugLevel}-complete-deleted`
                ]++;
              }
            }
          }
        });

        // 전체 개수와 비교했을 때 일치하지 않는다면 새로 갱신
        const tempAllData =
          countList.bug.count +
          countList.question.count +
          countList.review.count;
        if (countList.all.count !== tempAllData)
          countList.all.count = tempAllData;

        try {
          // 카테고리 서버에 저장하기
          await Promise.all(
            Object.entries(countList).filter(async (el) => {
              const categoryName: string = el[0];
              // @ts-ignore
              const { id, ...list } = el[1];

              _info.countFilterList[categoryName] = list;

              // 최종 업데이트
              return await countApis({ module }).update(id, list);
            })
          );
        } catch (err2) {
          console.log(err2);
          alert("카테고리 업데이트에 실패했습니다.");
        }
        fetchComments({ info: _info });
        alert("동기화가 완료되었습니다.");
        changeLoading(false);
      } catch (err) {
        console.log(err);
        alert("댓글 리스트 조회에 실패했습니다.");
      }
    }
  };

  return (
    <_Button onClickEvent={syncComments} className="admin-function-btn">
      댓글 동기화
    </_Button>
  );
}

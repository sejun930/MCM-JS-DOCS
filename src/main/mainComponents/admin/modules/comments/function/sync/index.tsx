import { _Button } from "mcm-js-commons";

import { getDoc } from "src/commons/libraries/firebase";
import {
  InfoTypes,
  initCountList,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { FunctionPropsTypes } from "../../admin.comments.types";
import { deepCopy } from "src/main/commonsComponents/functional";

// 댓글 정보와 개수 최신화 업데이트
export default function SyncCommentsFunction(props: FunctionPropsTypes) {
  const { changeLoading, module, info, fetchComments, checkLoading } = props;

  // 개수 최신화하기
  const syncComments = async () => {
    if (!checkLoading()) return;

    if (window.confirm("댓글 동기화 작업을 실행하시겠습니까?")) {
      try {
        changeLoading(true);

        // 전체 데이터 가져오기 (삭제된 게시물 제외)
        const commentsList = (
          await getDoc("comments", module, "comment")
            .where("deletedAt", "==", null)
            .get()
        ).docs;

        // 현재 모듈의 카운트 리스트 가져오기
        const countList: { [key: string]: number } = deepCopy(info.countList);
        // 모든 개수 초기화
        for (const key in countList) {
          countList[key] = 0;
        }

        // 필터 정보도 함께 가져오기
        const filterCountList: {
          [key: string]: { [key: string]: number };
        } = {};

        // 모든 필터 개수 초기화
        initCountList.forEach((el) => {
          const { category, count, ...filterList } = el;
          // @ts-ignore
          filterCountList[category] = filterList;
        });

        if (commentsList && commentsList.length) {
          commentsList.forEach((el) => {
            const data = el.data() as InfoTypes;

            countList.all++; // 전체 데이터 수 1개 증가
            countList[data.category]++; // 해당 카테고리 수 1개 증가

            if (data.category === "bug") {
              // 카테고리가 이슈일 경우
              if (data.bugStatus === 2) {
                // 수정이 완료된 경우
                filterCountList.bug["bug-complete"]++;
              }
              // 해당 버그 레벨 1개 증가
              if (data.bugLevel) filterCountList.bug[`bug-${data.bugLevel}`]++;
            } else if (data.category === "question") {
              // 카테고리가 문의일 경우
              if (data.answer && data.answerCreatedAt) {
                // 답변이 완료된 경우
                filterCountList.question["question-complete"]++;
              }
            } else if (data.category === "review") {
              // 카테고리가 리뷰일 경우, 해당 리뷰 점수 1개 증가
              if (data.rating)
                filterCountList.review[`review-${data.rating}`]++;
            }
          });
        }

        try {
          const countListDoc = getDoc("comments", module, "count");

          // 서버에 데이터 저장하기
          const fetchCountListResult = (await countListDoc.get()).docs;
          if (fetchCountListResult && fetchCountListResult.length) {
            await Promise.all(
              fetchCountListResult.map((el) => {
                let { category } = el.data();
                const id = el.id; // doc id값 저장

                const changeInfo = {
                  category,
                  count: countList[category],
                  ...filterCountList[category],
                };

                countListDoc.doc(id).update(changeInfo);
              })
            );

            const _info = { ...info };
            _info.countList = countList;
            // @ts-ignore
            _info.countFilterList = filterCountList;

            fetchComments(_info);
            alert("동기화가 완료되었습니다.");
            changeLoading(false);
          }
        } catch (err2) {
          alert("댓글 개수 데이터 조회에 실패했습니다.");
          console.log(err2);
        }
      } catch (err) {
        alert("댓글 데이터 조회에 실패했습니다.");
        console.log(err);
      }
    }
  };

  return (
    <_Button onClickEvent={syncComments} className="admin-function-btn">
      댓글 동기화
    </_Button>
  );
}

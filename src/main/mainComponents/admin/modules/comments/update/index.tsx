import styled from "@emotion/styled";

import { Tooltip } from "mcm-js";
import { _Button } from "mcm-js-commons";

import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import { getDoc } from "src/commons/libraries/firebase";
import { InfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { AdminCommentsInitType } from "../admin.comments.types";

// 댓글 정보와 개수 최신화 업데이트
export default function UpdateComments({
  module,
  loading,
  changeLoading,
  info,
  fetchComments,
}: {
  module: string;
  loading: boolean;
  changeLoading: (bool: boolean, forcing?: boolean) => void;
  info: AdminCommentsInitType;
  fetchComments: (info: AdminCommentsInitType) => void;
}) {
  // 개수 최신화하기
  const updateComments = async () => {
    checkAccessToken(true); // 관리자 로그인 체크
    if (loading) return alert("동기화 작업중입니다.");

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
        const countList: { [key: string]: number } = { ...info.countList };
        // 모든 개수 초기화
        for (const key in countList) {
          countList[key] = 0;
        }

        // 필터 정보도 함께 가져오기
        const filterCountList = { ...info.countFilterList };
        // 모든 필터 개수 초기화
        Object.entries(filterCountList).forEach((el) => {
          const keyName = el[0]; // key 이름

          for (const key in el[1]) {
            filterCountList[keyName][key] = 0;
          }
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
    <Tooltip
      tooltipText={
        loading ? "동기화 진행중입니다." : "댓글의 개수를 동기화합니다."
      }
      useShowAnimation
    >
      <UpdateBtn onClickEvent={updateComments} loading={loading}>
        댓글 동기화
      </UpdateBtn>
    </Tooltip>
  );
}

interface StyleTypes {
  loading?: boolean;
}

export const UpdateBtn = styled(_Button)`
  border: unset;
  height: 100%;

  ${(props: StyleTypes) =>
    props.loading && {
      cursor: "default",
      color: "gray",
    }}
`;

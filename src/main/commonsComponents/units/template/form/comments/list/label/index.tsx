import { Label, LabelWrapper, UserIP } from "./label.styles";

import { _Button } from "mcm-js-commons";
import React, { MouseEvent } from "react";

// import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
import { CommentsAllInfoTypes, InfoTypes } from "../../comments.types";
import { getUuid } from "src/main/commonsComponents/functional";

import { categoryInitList } from "../../write/comments.write.types";
import StarsForm from "../../write/stars";

// label 렌더용 컴포넌트
export default function CommentsLabel({
  info,
  commentsInfo,
  changeInfo,
  showCategoryName,
  modifyRatingEvent,
  adminLogin,
}: {
  info: InfoTypes;
  commentsInfo?: CommentsAllInfoTypes;
  changeInfo?: (info: CommentsAllInfoTypes) => void; // 댓글 정보 수정하기
  showCategoryName?: boolean; // 카테고리 출력 여부
  modifyRatingEvent?: (value: number) => void; // 평점 수정 이벤트 (평점 수정 가능)
  adminLogin: boolean | null;
}) {
  const renderLabel = () => {
    const nodeList = [];

    // 전체 카테고리일 경우, 각각의 카테고리 명 출력
    if (showCategoryName || commentsInfo?.selectCategory === "all") {
      // 카테고리 변경하기
      const changeCategory = (e?: MouseEvent<HTMLButtonElement>) => {
        if (showCategoryName) return;
        if (e) e.stopPropagation();

        if (commentsInfo && changeInfo)
          changeInfo({ ...commentsInfo, ["selectCategory"]: info.category });
      };

      nodeList.push(
        <_Button onClickEvent={changeCategory} buttonType="button">
          <Label>{categoryInitList[info.category]}</Label>
        </_Button>
      );
    }

    if (info.category === "review" || info.category === "bug") {
      // 리뷰일 경우 평점 추가
      nodeList.push(
        <StarsForm
          isView={!modifyRatingEvent}
          category={info.category}
          rating={info.category === "review" ? info.rating : info.bugLevel}
          changeEvent={modifyRatingEvent}
          isBugMode={info.category === "bug"}
        />
      );
    }

    if (info.category === "bug") {
      // 버그일 경우 처리 결과
      const bugStatus: { [key: number]: string } = {
        0: "확인 대기중",
        1: "이슈 처리중",
        2: "이슈 해결",
      };
      nodeList.push(
        <Label className={`bug-label-${info.bugStatus || 0}`}>
          {bugStatus[info.bugStatus || 0]}
        </Label>
      );
    } else if (info.category === "question") {
      // 문의일 경우
      nodeList.push(
        <Label className={`question-label-${info.answer ? 1 : 0}`}>
          {info.answer ? "답변 완료" : "답변 대기 중"}
        </Label>
      );
    }

    // 관리자일 경우 아이피 노출
    if (adminLogin)
      nodeList.push(<UserIP className="user-ip">({info.ip})</UserIP>);

    return nodeList;
  };

  return (
    <LabelWrapper className="label-wrapper" readOnly={!changeInfo}>
      {renderLabel().map((node) => (
        <React.Fragment key={getUuid()}>{node}</React.Fragment>
      ))}
    </LabelWrapper>
  );
}

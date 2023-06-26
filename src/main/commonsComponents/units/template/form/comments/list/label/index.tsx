import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { _SpanText, _Button } from "mcm-js-commons";
import React, { MouseEvent } from "react";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
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
}: {
  info: InfoTypes;
  commentsInfo?: CommentsAllInfoTypes;
  changeInfo?: (info: CommentsAllInfoTypes) => void; // 댓글 정보 수정하기
  showCategoryName?: boolean; // 카테고리 출력 여부
  modifyRatingEvent?: (value: number) => void; // 평점 수정 이벤트 (평점 수정 가능)
}) {
  const renderLabel = () => {
    let nodeList = [];

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
        0: "확인 대기 중",
        1: "버그 수리 중",
        2: "해결 완료",
      };
      nodeList.push(
        <Label className={`bug-label-${info.bugStatus || 0}`}>
          {bugStatus[info.bugStatus || 0]}
        </Label>
      );
    } else if (info.category === "question") {
      // 문의일 경우
      nodeList.push(
        <Label className={`question-label-${info.completeAnswer ? 1 : 0}`}>
          {info.completeAnswer ? "답변 완료" : "답변 대기 중"}
        </Label>
      );
    }

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

interface StyleTypes {
  readOnly?: boolean;
}

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px 0px;

  .mcm-button-unit {
    ${(props: StyleTypes) =>
      props.readOnly && {
        cursor: "default",
      }}
  }

  @media ${breakPoints.mobileLarge} {
    flex-direction: row;
    gap: 0px 10px;
  }
`;

export const Label = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 10px;
  background-color: #c88ea7;
  color: #ffffff;
  margin: 0px;

  &.bug-label-0,
  &.question-label-0 {
    background-color: #eeeeee;
    color: gray;
  }

  &.bug-label-1 {
    background-color: #e5f9db;
    color: black;
  }

  &.bug-label-2,
  &.question-label-1 {
    background-color: #19a7ce;
    color: white;
  }
`;

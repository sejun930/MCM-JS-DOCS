import React, { CSSProperties, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { getUuid } from "src/main/commonsComponents/functional";
import { _Button, _SpanText } from "mcm-js-commons";

export default function StarsForm({
  rating,
  category,
  changeEvent,
  isView,
  isBugMode,
}: {
  rating?: number; // 평점 정보, 있다면 defaultValue로 노출
  category: string;
  changeEvent?: (rating: number) => void;
  isView?: boolean;
  isBugMode?: boolean; // 버그 카테고리 모드용
}) {
  // 별점 선택시 영역 계산 state
  const [selectRating, setSelectRating] = useState(0);
  // 마우스 호버시 영역 계산 state
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setSelectRating(rating || 0);
  }, [rating]);

  useEffect(() => {
    if (!category) {
      selectStar(0);
    }
  }, [category, rating]);

  // 평점 hover 하기
  const hoverStar = (idx: number) => () => {
    if (!isView) setHoverRating(idx);
  };

  // 평점 선택하기
  const selectStar = (idx: number) => () => {
    if (isView) return;
    setSelectRating(idx);

    if (changeEvent) changeEvent(idx);
  };

  const renderEmoji = () => {
    let str = "⭐";
    if (isBugMode) str = "🔥";
    if (isView && !isBugMode) str = "🌟";

    return str;
  };

  return (
    <Wrapper
      onMouseOut={hoverStar(0)}
      isView={isView}
      className="stars-wrapper"
    >
      {Array.from(new Array(isView ? 1 : 5), () => 1).map((_, idx) => {
        const star = idx + 1;
        // 호버된 영역 표시
        const isHoverArea = hoverRating >= star;
        // 선택된 영역 표시
        const isSelect = selectRating >= star;

        return (
          <Star
            key={getUuid()}
            type="button"
            isHoverArea={isHoverArea}
            onMouseOver={hoverStar(star)}
            onClick={selectStar(star)}
            isSelect={isSelect}
            isView={isView}
            rating={selectRating}
            className={`star star-${idx}`}
            isBugMode={isBugMode}
          >
            {renderEmoji()}
          </Star>
        );
      })}
      {isView && <_SpanText className="rating-number">({rating})</_SpanText>}
    </Wrapper>
  );
}

interface StylesTypes {
  isView?: boolean;
  rating?: number;
  isHoverArea?: boolean;
  isSelect?: boolean;
  isBugMode?: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 0px 10px;

  ${(props: StylesTypes) =>
    props.isView && {
      width: "auto",
      gap: "0px 6px",
    }}

  .select-star {
    text-shadow: 0 0 0 rgba(170, 86, 86) !important; /* 새 이모지 색상 부여 */
  }

  .last-star {
    cursor: default;
  }

  .rating-number {
    font-size: 12px;
  }
`;

export const Star = styled.button`
  font-size: 20px; /* 이모지 크기 */
  color: transparent; /* 기존 이모지 컬러 제거 */
  text-shadow: 0 0 0 #999999; /* 새 이모지 색상 부여 */
  transition: all 0.3s;

  ${(props: StylesTypes) =>
    props.isHoverArea && {
      textShadow: "0 0 0 rgba(170, 86, 86, 0.3)",
    }}

  ${(props) =>
    props.isSelect && {
      textShadow: "0 0 0 rgba(170, 86, 86)",
    }}

  ${(props) =>
    props.isView && {
      textShadow: "0 0 0 #999999",
      fontSize: "22px",
      position: "relative",
      display: "flex",
      "--rating": `${0.2 * (props.rating || 1)}`,
      opacity: 0.8,
      cursor: "default",
    }}

  :after {
    content: "⭐";
    position: absolute;
    color: transparent;
    text-shadow: 0 0 0 #aa5656;
    font-size: 22px;
    transform: scale(var(--rating));
    display: ${(props) => (props.isView ? "flex" : "none")};

    ${(props) => {
      let styles = {
        left: "0px",
        top: "-0.5px",
      };

      if (props.rating === 1) styles = { left: "-0.5px", top: "-1px" };
      if (props.rating === 2) styles = { left: "-0.8px", top: "-1.3px" };
      if (props.rating === 3) styles = { left: "0px", top: "-1px" };
      if (props.rating === 4) styles = { left: "-0.1px", top: "-1px" };

      return styles;
    }}
    ${(props) =>
      props.isBugMode && {
        display: "none",
      }}
  }

  // 이슈 색상별로 출력하기
  ${(props) => {
    const styles = { textShadow: "" };

    if (props.isBugMode && props.isView) {
      if (props.rating === 1) styles.textShadow = "0 0 0 #0079FF";
      if (props.rating === 2) styles.textShadow = "0 0 0 #00DFA2";
      if (props.rating === 3) styles.textShadow = "0 0 0 #CBB279";
      if (props.rating === 4) styles.textShadow = "0 0 0 #E57C23";
      if (props.rating === 5) styles.textShadow = "0 0 0 #B70404";
    }

    return styles;
  }}
`;

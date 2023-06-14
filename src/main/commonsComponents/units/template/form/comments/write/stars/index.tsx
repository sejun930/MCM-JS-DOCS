import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { getUuid } from "src/main/commonsComponents/functional";
import { _Button, _SpanText } from "mcm-js-commons";

export default function StarsForm({
  rating,
  category,
  changeEvent,
  isView,
}: {
  rating?: number; // 평점 정보, 있다면 defaultValue로 노출
  category: string;
  changeEvent?: (rating: number) => void;
  isView?: boolean;
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

  return (
    <Wrapper
      onMouseLeave={hoverStar(0)}
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
            onMouseEnter={hoverStar(star)}
            onClick={selectStar(star)}
            isSelect={isSelect}
            isView={isView}
            rating={selectRating}
          >
            ⭐
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
    /* left: var(--rating); // -0.2px; */
    transform: scale(var(--rating));
    display: ${(props) => (props.isView ? "flex" : "none")};
  }
`;

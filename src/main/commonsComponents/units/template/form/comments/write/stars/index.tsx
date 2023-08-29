import { Star, Wrapper } from "./stars.styles";
import React, { useEffect, useState } from "react";

import { getLibraries, getUuid } from "src/main/commonsComponents/functional";
import { _SpanText } from "mcm-js-commons";
import { starsTooltipTextList } from "./stars.tooltip.text";

const { Tooltip } = getLibraries();
export default function StarsForm({
  rating,
  category,
  changeEvent,
  isView,
  isBugMode,
  tooltipPosition,
}: {
  rating?: number; // 평점 정보, 있다면 defaultValue로 노출
  category: string;
  changeEvent?: (rating: number) => void;
  isView?: boolean;
  isBugMode?: boolean; // 버그 카테고리 모드용
  tooltipPosition?: "top" | "bottom"; // tootlip 메시지 방향 지정
}) {
  // 별점 선택시 영역 계산 state
  const [selectRating, setSelectRating] = useState(0);
  // 마우스 호버시 영역 계산 state
  // const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setSelectRating(rating || 0);
  }, [rating]);

  useEffect(() => {
    if (!category) {
      selectStar(0);
    }
  }, [category, rating]);

  // 평점 선택하기
  const selectStar = (idx: number) => () => {
    if (isView || idx === selectRating) return;
    setSelectRating(idx);

    if (changeEvent) changeEvent(idx);
  };

  const renderEmoji = () => {
    let str = "⭐";
    if (isBugMode) str = "🔥";
    // if (isView && !isBugMode) str = "🌟";

    return str;
  };

  return (
    <Wrapper isView={isView} className="stars-wrapper">
      {Array.from(new Array(isView ? 1 : 5), () => 1).map((_, idx) => {
        const star = idx + 1;
        // 호버된 영역 표시
        // const isHoverArea = hoverRating >= star;
        // 선택된 영역 표시
        const isSelect = selectRating >= star;
        // 이미 선택된 영역인지
        const isAlready = selectRating === idx + 1;

        // Tooltip 메세지
        let tooltipMessage = "";
        if (starsTooltipTextList[category]) {
          tooltipMessage = starsTooltipTextList[category][idx];

          if (isView && rating)
            tooltipMessage = starsTooltipTextList[category][rating - 1];
        }

        return (
          <Tooltip
            key={getUuid()}
            tooltipText={tooltipMessage}
            isDisable={!tooltipMessage}
            useShowAnimation
            position={tooltipPosition || "top"}
          >
            <Star
              type="button"
              // isHoverArea={isHoverArea}
              onClick={selectStar(star)}
              isSelect={isSelect}
              isView={isView}
              rating={selectRating}
              className={`star star-${idx}`}
              isBugMode={isBugMode}
              isAlready={isAlready}
            >
              {renderEmoji()}
            </Star>
          </Tooltip>
        );
      })}
      {isView && <_SpanText className="rating-number">({rating})</_SpanText>}
    </Wrapper>
  );
}

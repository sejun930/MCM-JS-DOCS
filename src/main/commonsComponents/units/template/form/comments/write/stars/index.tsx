import styled from "@emotion/styled";

import { v4 as uuidv4 } from "uuid";
import { _Button } from "mcm-js-commons";
import { useEffect, useState } from "react";

let selectRating = 0;
export default function StarsForm({
  rating,
  category,
  changeEvent,
}: {
  rating?: number; // 평점 정보, 있다면 defaultValue로 노출
  category: string;
  changeEvent: (rating: number) => void;
}) {
  const [starList, setStarList] = useState<Array<Element>>([]);

  useEffect(() => {
    selectRating = rating || 0;

    if (!starList.length) {
      setStarList(Array.from(document.getElementsByClassName("star")));
    }
  }, []);

  useEffect(() => {
    if (selectRating) {
      selectStar(selectRating);
    }
  }, [category]);

  // 평점 hover 하기
  const hoverStar = (idx: number, remove?: boolean) => {
    let tempList = Array.from(document.getElementsByClassName("star"));

    // 기존의 hover 되어 있는 평점 제거
    tempList.forEach((node) => node.classList.remove("hover-star"));

    if (!remove) {
      tempList = tempList.slice(0, idx);
      // hover 적용하기
      tempList.forEach((node) => node.classList.add("hover-star"));
    }
  };

  // 평점 선택하기
  const selectStar = (idx: number) => {
    let tempList = Array.from(document.getElementsByClassName("star"));
    tempList.forEach((node) => {
      node.classList.remove("select-star");
      node.classList.remove("last-star");
    });
    selectRating = idx;

    tempList = tempList.slice(0, idx);
    tempList.forEach((node, key) => {
      node.classList.add("select-star");

      if (key + 1 === selectRating) node.classList.add("last-star");
    });
    changeEvent(selectRating);
  };

  return (
    <Wrapper onMouseLeave={() => hoverStar(0, true)}>
      {Array.from(new Array(5), () => 1).map((_, key) => (
        <Star
          key={uuidv4()}
          onClick={() =>
            (selectRating !== key + 1 && selectStar(key + 1)) || undefined
          }
          onMouseEnter={() => hoverStar(key + 1)}
          className={`star`}
          type="button"
        >
          ⭐
        </Star>
      ))}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 0px 10px;

  .hover-star {
    text-shadow: 0 0 0 rgba(170, 86, 86, 0.3); /* 새 이모지 색상 부여 */
  }

  .select-star {
    text-shadow: 0 0 0 rgba(170, 86, 86); /* 새 이모지 색상 부여 */
  }

  .last-star {
    cursor: default;
  }
`;

export const Star = styled.button`
  font-size: 20px; /* 이모지 크기 */
  color: transparent; /* 기존 이모지 컬러 제거 */
  text-shadow: 0 0 0 #f0f0f0; /* 새 이모지 색상 부여 */
  transition: all 0.3s;
`;

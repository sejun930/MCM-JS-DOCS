import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { CSSProperties } from "react";

interface StylesTypes {
  isView?: boolean;
  rating?: number;
  selectRating?: number; // 현재 선택된 점수
  isHoverArea?: boolean;
  isSelect?: boolean;
  isBugMode?: boolean;
  isAlready?: boolean;
  isModifyMode?: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 0px 10px;

  ${(props: StylesTypes) => {
    let styles: CSSProperties & { [key: string]: string } = {};

    if (props.isView) styles = { width: "auto", gap: "0px 6px" };
    if (!props.isBugMode && !props.isModifyMode) {
      styles.gap = "0px";
    }

    return styles;
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

  .mcm-tooltip-tail-contents {
    font-size: 14px;

    .star {
      height: 100%;
    }
  }

  @media ${breakPoints.mobileLarge} {
    gap: 0px 10px;
  }
`;

export const Star = styled.button`
  width: 20px;
  height: 20px;
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

    ${(props) =>
    props.isAlready && {
      cursor: "default",
    }} 
    
  // 이슈 색상별로 출력하기
  ${(props) => {
    const { selectRating, rating, isView } = props;
    let styles: CSSProperties & { [key: string]: string } = {};

    if (props.isBugMode) {
      // 이슈 색상 정하기
      const colors = ["0079FF", "00DFA2", "CBB279", "E57C23", "B70404"];

      if (props.isView && selectRating)
        styles.textShadow = `0 0 0 #${colors[selectRating - 1]}`;
    } else {
      // 리뷰 이미지 가져오기
      styles = {
        backgroundImage: `url("/images/commons/icons/star/star_${rating}.gif")`,
        backgroundSize: "cover",
        width: `${isView ? 36 : 30}px`,
        height: `${isView ? 36 : 30}px`,
      };

      // 선택 모드일 경우
      if (!isView) {
        styles.opacity = selectRating === rating ? "1" : "0.5";
      }
    }

    return styles;
  }}
`;

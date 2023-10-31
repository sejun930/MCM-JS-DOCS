import { CSSProperties } from "react";
import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { _Link, _Button } from "mcm-js-commons";

interface StyleTypes {
  isSelected?: boolean;
  isAdmin?: boolean;
  hasError?: boolean;
  isCheckedFavorite?: boolean;
}

export const ListWrapper = styled.ul`
  padding: 20px 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px 0px;
  position: sticky;
  top: 125px;

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};
    const { isSelected, isAdmin, hasError } = props;

    if (isSelected) {
      // 현재 선택된 모듈이라면
      styles.padding = "0px";
      styles.paddingTop = "1rem";
    }
    if (isAdmin) styles.padding = "0px";
    if (hasError) styles.paddingTop = "0px";

    return styles;
  }}

  @media ${breakPoints.mobileLarge} {
    padding: 1rem 0px;

    ${(props) =>
      props.isAdmin && {
        padding: "0px",
      }}
  }
`;

export const Link = styled(_Link)`
  width: 100%;

  ${(props: StyleTypes) =>
    props.isSelected && {
      width: "calc(100% + 50px)",
    }}
`;

export const EmptyResult = styled.li`
  margin-top: 20px;

  .empty-search-result {
    padding: 0px;
    font-size: 14px;
    color: #777777;
  }

  @media ${breakPoints.mobileLarge} {
    margin-top: 0px;
  }
`;

export const List = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  // 선택된 모듈일 경우
  ${(props: StyleTypes) =>
    props.isSelected && {
      width: "calc(100% + 50px)",
      padding: "0.5rem",
      paddingLeft: "1rem",
      backgroundColor: "#aa5656 !important",
      color: "white",
      borderRadius: "10px",
      height: "36px",
    }}

  .module-favorite-btn {
    ${(props) =>
      props.isSelected && {
        right: "25px",
        textShadow: `0 0 0 rgba(255, 255, 255)`,
      }}
  }

  // 마우스 호버시 즐겨찾기 아이콘 노출
  :hover {
    .module-favorite-btn {
      opacity: 1;
    }
  }

  .module-favorite-btn {
    // 선택된 모듈은 즐겨찾기 투명도 해제
    ${(props) =>
      props.isSelected && {
        opacity: "1 !important",
      }}
  }

  @media ${breakPoints.mobileLarge} {
    // 모바일에서는 아이콘 무조건 노출
    .module-favorite-btn {
      opacity: 1;
      right: 10px;

      ${(props) =>
        props.isSelected && {
          right: "60px",
        }}
    }
  }
`;

export const Favorite = styled(_Button)`
  position: absolute;
  right: 0;
  opacity: 0;
  color: transparent;
  text-shadow: 0 0 0 rgba(120, 120, 120); /* 새 이모지 색상 부여 */
  font-size: 16px;
  transition: all 0.25s ease;

  ${(props: StyleTypes) =>
    props.isCheckedFavorite && {
      color: "white",
      opacity: 1,
    }}
`;

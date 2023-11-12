import { CSSProperties } from "react";
import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isSelected?: boolean;
  isAdmin?: boolean;
  hasError?: boolean;
}

export const ListWrapper = styled.ul`
  padding: 20px 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px 0px;
  position: sticky;
  top: 125px;
  width: 100%;

  &#nav-list-select {
    padding: 0px;
    padding-top: 1rem;

    .nav-list-items {
      width: calc(100% + 50px);
      padding: 0.5rem;
      padding-left: 1rem;
      background-color: ${(props) => (props.isAdmin && "#525FE1") || "#aa5656"};
      color: white;
      border-radius: 10px;
      height: 36px;

      .module-favorite-btn {
        opacity: 1;
        right: 25px;
        text-shadow: 0 0 0 rgba(255, 255, 255);
      }
    }
  }

  ${(props: StyleTypes) => {
    const styles: CSSProperties & { [key: string]: string } = {};
    const { isAdmin, hasError } = props;

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

    &#nav-list-select {
      .module-favorite-btn {
        right: 60px !important;
      }
    }
  }
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

  .icons-form {
    position: absolute;
    transform: translate3d(-10px, -6px, 0px);
  }

  // 마우스 호버시 즐겨찾기 아이콘 노출
  :hover {
    .module-favorite-btn {
      opacity: 1;
    }
  }

  @media ${breakPoints.mobileLarge} {
    // 모바일에서는 아이콘 무조건 노출
    .module-favorite-btn {
      opacity: 1;
      right: 10px;
    }
  }
`;

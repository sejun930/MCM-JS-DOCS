import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  render?: boolean;
  selected?: boolean;
}

export const CommentsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;

  @media ${breakPoints.mobileLarge} {
    margin-top: 20px;
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  border-bottom: double 5px black;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 3;
  padding: 20px 0px;

  @media ${breakPoints.mobileLarge} {
    gap: 10px 0px;
    top: 50px;
    align-items: flex-end;
    padding: 10px 0px;
  }
`;

export const CategoryContents = styled.div`
  display: flex;
  height: 24px;
  border-left: solid 3px gray;
  padding-left: 16px;
  position: relative;
  /* width: 100%; */

  @media ${breakPoints.mobileLarge} {
    max-width: 80%;
  }
`;

export const CategoryItems = styled.ul`
  display: flex;
  align-items: center;
  opacity: 0;
  gap: 0px 26px;

  ${(props: StyleTypes) =>
    props.render && {
      opacity: 1,
    }};

  @media ${breakPoints.mobileLarge} {
    height: auto;
    width: 100%;
    gap: 0px 20px;
  }

  @media ${breakPoints.mobileSmall} {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    padding-right: 30px;
  }
`;

export const Shadow = styled.div`
  display: none;

  @media ${breakPoints.mobileSmall} {
    display: flex;
    position: absolute;
    right: 0;
    width: 20px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export const Category = styled.li`
  .mcm-button-unit {
    transition: all 0.3s;
    font-size: 14px;
    color: #666666;

    ${(props: StyleTypes) =>
      props.selected && {
        color: "#aa5656",
        cursor: "default",
        fontWeight: 700,
      }}
  }

  @media ${breakPoints.mobileSmall} {
    white-space: pre;
  }
`;

export const EmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  background-color: #cccccc;
  border-radius: 10px;
  padding: 36px 0px;
  cursor: not-allowed;

  .empty-list {
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.04rem;
    color: #656565;
  }

  @media ${breakPoints.mobileLarge} {
    .empty-list {
      font-size: 16px;
      line-height: 26px;
    }
  }
`;

export const CommentListItems = styled.ul`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  border: double 3px #0a4d68;
  align-items: center;
  justify-content: center;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: white;
  position: sticky;
  bottom: 0;
`;

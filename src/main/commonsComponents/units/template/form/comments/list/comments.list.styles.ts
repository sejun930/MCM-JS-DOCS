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
  align-items: center;
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
    position: unset;
    align-items: flex-end;
  }
`;

export const CategoryItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 0px 26px;
  height: 24px;
  border-left: solid 3px gray;
  padding-left: 16px;
  opacity: 0;

  ${(props: StyleTypes) =>
    props.render && {
      opacity: 1,
    }};

  @media ${breakPoints.mobileLarge} {
    gap: 0px 20px;
    padding-left: 10px;
    height: auto;
    width: 100%;
    /* justify-content: space-between; */
  }

  @media ${breakPoints.mobileSmall} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px 0px;
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
  /* min-height: 300px; */
`;

export const LoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  border: double 3px #0a4d68;
  align-items: center;
  justify-content: center;
`;

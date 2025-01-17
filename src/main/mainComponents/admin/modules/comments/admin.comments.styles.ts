import styled from "@emotion/styled";

import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isLoading?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 48px;

  ${(props: StyleTypes) =>
    props.isLoading && {
      filter: "blur(3px)",
    }}
`;

export const ModuleSelectWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ModuleSelector = styled.select`
  padding: 6px 10px;
  font-size: 16px;
  font-weight: 700;
  width: 120px;
  cursor: pointer;
`;

export const CommentsWrapper = styled.ul`
  margin-top: 60px;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-title {
    font-size: 30px;
    letter-spacing: -0.05rem;
    position: fixed;
    top: 70%;
  }
`;

export const AdminFunctionalWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  .settings-icon {
    width: 20px;
  }

  .admin-function-select {
    top: 60px;
  }
`;

export const PaginationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: white;
  z-index: 10;
  border-top: solid 3px black;
  left: 0;
`;

export const PaginationItems = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const CategoryFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

export const CommentsOptionWrapper = styled.div`
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 100;
  border-bottom: double 4px black;
  padding-bottom: 30px;

  @media ${breakPoints.mobileLarge} {
    padding-bottom: 10px;
    top: -16px;
  }
`;

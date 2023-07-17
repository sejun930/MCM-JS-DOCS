import styled from "@emotion/styled";

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

  ${(props: StyleTypes) =>
    props.isLoading && {
      filter: "blur(3px)",
    }}
`;

export const ModuleSelectWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
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
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-title {
    font-size: 30px;
    letter-spacing: -0.05rem;
  }
`;

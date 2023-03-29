import styled from "@emotion/styled";

export const Wrapper = styled.section`
  border: solid 1px #dddddd;
  border-top: unset;
  /* border-bottom: solid 1px #dddddd; */
`;

export const OptionalWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  cursor: pointer;
  width: 100%;
`;

export const CodeInfoWrapper = styled.div`
  /* max-height: 0px; */
  overflow: hidden;
  transition: all 0.65s ease-out;
  max-height: 0px;

  .copy-wrapper {
    border-radius: 0px;

    .copy-text {
      padding-left: 0px;
    }
  }

  ${(props: { showCode?: boolean }) =>
    props.showCode && {
      maxHeight: "60vh",
    }}
`;

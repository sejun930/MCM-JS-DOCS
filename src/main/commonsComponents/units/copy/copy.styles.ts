import styled from "@emotion/styled";

interface StyleTypes {
  isCopied?: boolean;
  offCopyAnimation?: boolean;
  isCode?: boolean;
}

export const CopyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f3f3;
  width: 100%;
  /* padding: 1rem; */
  border-radius: 5px;
  min-height: 60px;
  padding: 1rem 0px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.isCode && {
      backgroundColor: "#333333",
    }}

  .hide {
    position: absolute;
    opacity: 0;
  }

  .copyInput {
    width: 100%;
    height: 100%;
    border: unset;
    background-color: unset;
    cursor: pointer;
    outline: none;
    font-size: 16px;
  }

  ._copyIcon_ {
    width: 20px;
    transition: all 0.3s ease-out;
  }

  :before,
  :after {
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    transition: all 0.3s;

    ${(props: StyleTypes) =>
      props.isCopied &&
      !props.offCopyAnimation && {
        width: "100%",
        height: "100%",
      }}

    ${(props) =>
      props.isCode && {
        display: "none",
      }}
  }

  :before {
    bottom: 0;
    left: 0;
    border-left: 2px solid #95bdff;
    border-bottom: 2px solid #95bdff;
    border-radius: 0 0 0 4px;
  }

  :after {
    top: 0;
    right: 0;
    border-right: 2px solid #95bdff;
    border-top: 2px solid #95bdff;
    border-radius: 0 4px 0 0px;
  }
`;

export const CopyButton = styled.button`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CopyText = styled.div`
  display: flex;
  padding-left: 1rem;
`;

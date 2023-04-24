import styled from "@emotion/styled";

interface IStyleProps {
  hasMultiple?: boolean;
  isSelected?: boolean;
}

export const CopyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .copy-wrapper {
    border-radius: 0px 0px 5px 5px;
  }
`;

export const TapWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50px;

  ${(props: IStyleProps) =>
    !props.hasMultiple && {
      height: "0px",
    }}
`;

export const Tap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: double 2px black;
  border-bottom: unset;
  width: 100%;
  height: 30px;
  border-radius: 15px 15px 0px 0px;
  transition: all 0.3s ease;
  color: gray;

  ${(props: IStyleProps) =>
    props.isSelected && {
      height: "40px",
      color: "white",
      backgroundColor: "#aa5656",
      borderColor: "white",
      fontWeight: 700,
      cursor: "default",
      border: "unset",
    }}

  :hover {
    height: 40px;
  }
`;

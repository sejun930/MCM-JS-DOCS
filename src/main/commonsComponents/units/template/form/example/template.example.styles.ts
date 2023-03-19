import styled from "@emotion/styled";

interface StyleTypes {
  offBoard?: boolean;
  isFull?: boolean;
}

export const ExampleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 60px 0px;
`;

export const ExampleItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;

  h3 {
    font-size: 20px;
  }

  ._open_module_button_ {
    padding: 0.7rem 1.5rem;
    border-radius: 10px;
    background-color: #7b2869;
    color: white;
    font-weight: 700;
    font-size: 14px;
    width: fit-content;
  }

  ${(props: StyleTypes) =>
    props.isFull && {
      width: "100%",
    }}
`;

export const ExampleResult = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: solid 1px #dddddd;
  margin-top: 15px;
  border-radius: 5px;

  ${(props: StyleTypes) =>
    props.offBoard && {
      border: "unset",
      height: "auto",
    }}
`;

export const ExampleContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ._exmaple_remarks_ {
    font-size: 14px;
    margin-top: 10px;
    color: #666666;
  }
`;

export const ExampleContentsItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.3rem 1rem;
  border-bottom: solid 1px #dddddd;

  ._module_open_button_ {
    width: fit-content;
  }
`;

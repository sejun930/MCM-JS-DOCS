import styled from "@emotion/styled";

interface StyleTypes {
  offBoard?: boolean;
  isFull?: boolean;
}

export const ExampleTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .exmaple-subTitle {
    display: flex;
  }

  .subTitle-title-wrapper {
    align-items: flex-end;
    .toggle-all-code-btn {
      font-size: 16px;
    }
  }
`;

export const ExampleContentsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 60px 0px;
`;

export const ExampleContentsItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;

  h3 {
    font-size: 20px;
  }

  .error-form {
    display: flex;
    align-items: center;
    /* color: #7b2869; */
    font-weight: 700;
  }

  ${(props: StyleTypes) =>
    props.isFull && {
      width: "100%",
    }}
`;

export const ExampleResultList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* border: solid 1px #dddddd; */
  /* border-bottom: 0px; */
  margin-top: 15px;
  border-radius: 5px;

  ${(props: StyleTypes) =>
    props.offBoard && {
      border: "unset",
      height: "auto",
    }}
`;

export const ExampleListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .example-remarks {
    font-size: 14px;
    margin-top: 16px;
    color: #666666;
    line-height: 20px;
    letter-spacing: -0.01rem;
  }
`;

export const ExampleListItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.3rem 1rem;
  border: solid 1px #dddddd;

  ._module_open_button_ {
    width: fit-content;
  }

  .mcm-error-unit {
    margin-top: 0px;
  }
`;

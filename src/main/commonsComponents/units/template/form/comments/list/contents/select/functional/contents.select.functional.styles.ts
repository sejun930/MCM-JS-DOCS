import styled from "@emotion/styled";

interface StyleTypes {
  isSuccess?: boolean;
  isDelete?: boolean;
}

export const OptionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;

  .mcm-title-unit {
    text-align: center;
    font-size: 22px;
  }

  .optional-input {
    margin-top: 30px;

    .mcm-textArea-unit {
      height: 200px;
      resize: none;

      ${(props: StyleTypes) =>
        props.isDelete && {
          cursor: "default",
        }}
    }
  }
`;

export const ConfirmButtonWrapper = styled.div`
  margin-top: 40px;
  text-align: center;

  .confirm-button {
    font-size: 16px;
  }

  .disable {
    color: gray;
    cursor: not-allowed;
  }

  .able {
    color: black;
    cursor: pointer;
  }
`;

export const Message = styled.div`
  display: flex;

  .message {
    font-size: 16px;
    font-weight: 700;
    color: rgb(170, 86, 86);

    ${(props: StyleTypes) =>
      props.isSuccess && {
        color: "rgb(25, 167, 206) !important",
      }}
  }
`;

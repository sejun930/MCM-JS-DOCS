import styled from "@emotion/styled";

interface StyleTypes {
  isSuccess?: boolean;
}

export const OptionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;

  .mcm-title-unit {
    text-align: center;
    font-size: 24px;
  }

  .optional-input {
    margin-top: 30px;

    .mcm-textArea-unit {
      height: 160px;
      resize: none;
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

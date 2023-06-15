import styled from "@emotion/styled";

interface StyleTypes {
  isSuccess?: boolean;
  isDelete?: boolean;
  isReviewCategory?: boolean;
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
    /* margin-top: 30px; */

    .mcm-textArea-unit {
      height: 220px;
      resize: none;

      ${(props: StyleTypes) =>
        props.isReviewCategory && {
          height: "160px",
        }}

      ${(props) =>
        props.isDelete && {
          cursor: "default",
        }}
    }
  }

  .stars-wrapper {
    justify-content: flex-start;
    margin-top: 10px;
  }

  .mcm-close-button-unit {
    border-top: unset;
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

export const CommentsInfoWrapper = styled.div`
  margin: 24px 0px;
  margin-bottom: 10px;
`;

export const CommentsInfoItems = styled.div`
  display: flex;
  width: 100%;

  .optional-input {
    width: 100%;
  }
`;

export const CategoryInfo = styled.div`
  display: flex;
  width: 100%;

  .label-wrapper {
    flex-direction: row;
    gap: 0px 12px;
    width: 100%;

    .stars-wrapper {
      margin-top: 0px;
      width: auto;
    }
  }
`;

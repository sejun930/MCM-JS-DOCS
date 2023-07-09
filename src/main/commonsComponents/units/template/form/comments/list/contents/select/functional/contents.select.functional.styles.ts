import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isSuccess?: boolean;
  isDelete?: boolean;
  isReviewCategory?: boolean;
  adminLogin?: boolean;
}

export const Form = styled.form`
  height: 100%;
  @media ${breakPoints.mobileLarge} {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
  }
`;

export const OptionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;

  .mcm-title-unit {
    text-align: center;
    font-size: 22px;
  }

  .optional-input {
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

  @media ${breakPoints.mobileLarge} {
    padding: 0rem;
    height: auto;

    .mcm-title-unit {
      /* margin: 10px 0px; */
      margin-bottom: 20px;
    }

    .optional-input {
      .mcm-textArea-unit {
        height: 180px;
        font-size: 12px;
      }
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

  @media ${breakPoints.mobileLarge} {
    margin-top: 20px;

    .confirm-button {
      font-size: 14px;
    }
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

  @media ${breakPoints.mobileLarge} {
    margin: 0px;
    margin-bottom: 10px;
  }
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
    align-items: center;

    .stars-wrapper {
      margin-top: 0px;
      width: auto;
    }
  }

  @media ${breakPoints.mobileSmall} {
    .label-wrapper {
      flex-wrap: wrap;
      gap: 6px 12px;
    }

    p {
      font-size: 10px;
      padding: 6px;
    }
  }
`;

import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isSuccess?: boolean;
  isDelete?: boolean;
  isReviewCategory?: boolean;
  adminLogin?: boolean;
  waiting?: boolean;
  isAnswerType?: boolean;
  isSelected?: boolean;
  disableSelected?: boolean;
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
      height: 100%;
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

  @media ${breakPoints.mobileLarge} {
    padding: 0rem;
    height: auto;

    .mcm-title-unit {
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

  @media ${breakPoints.mobileLarge} {
    margin-top: 20px;
  }
`;

export const ConfirmButton = styled(_Button)`
  font-size: 16px;

  ${(props: StyleTypes) =>
    props.waiting && {
      cursor: "default",
      color: "gray",
    }}

  @media ${breakPoints.mobileLarge} {
    font-size: 14px;
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

  .mcm-input-unit-wrapper {
    width: 100%;

    .mcm-input-unit-items {
      height: 240px;

      textArea {
        resize: none;
        height: 100%;
        width: 100%;

        ${(props: StyleTypes) =>
          props.isAnswerType && {
            resize: "none",
            width: "100%",
          }}
      }
    }
  }

  @media ${breakPoints.mobileLarge} {
    .mcm-input-unit-wrapper {
      .mcm-input-unit-items {
        height: 270px;
      }
    }
  }

  @media ${breakPoints.mobileSmall} {
    flex-direction: column;

    .mcm-input-unit-wrapper {
      .mcm-input-unit-items {
        ${(props: StyleTypes) =>
          props.isAnswerType && {
            height: "140px",
          }}
      }
    }
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

export const BugStatusWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 10px;
  gap: 0px 24px;
`;

export const BugStatusButton = styled(_Button)`
  font-size: 12px;
  color: gray;

  ${(props: StyleTypes) =>
    props.isSelected && {
      color: "#19a7ce",
      fontWeight: "700",
      cursor: "default",
    }}

  ${(props) =>
    props.disableSelected && {
      cursor: "not-allowed",
    }}
`;

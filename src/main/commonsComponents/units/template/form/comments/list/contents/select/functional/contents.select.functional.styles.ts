import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { CSSProperties } from "react";

interface StyleTypes {
  isSuccess?: boolean;
  isDelete?: boolean;
  isReviewCategory?: boolean;
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
      margin-bottom: 16px;
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
  margin: 16px 0px;
  /* margin-bottom: 10px; */

  @media ${breakPoints.mobileLarge} {
    margin-top: 0px;
  }
`;

export const CommentsInfoItems = styled.div`
  display: flex;
  width: 100%;

  .mcm-input-unit-wrapper {
    width: 100%;

    .mcm-input-unit-items {
      height: 230px;

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
      height: 260px;

      .mcm-input-unit-items {
        height: 100%;
      }
    }
  }

  @media ${breakPoints.mobileSmall} {
    flex-direction: column;
    height: 260px;

    .mcm-input-unit-wrapper {
      height: 100%;
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

  @media ${breakPoints.mobileLarge} {
    .label-wrapper {
      justify-content: center;
      /* height: 38px; */
      overflow-y: auto;
    }
  }

  @media ${breakPoints.mobileSmall} {
    .label-wrapper {
      flex-wrap: wrap;
      gap: 6px 12px;
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

  ${(props: StyleTypes) => {
    let styles: CSSProperties & { [key: string]: string } = {};

    // 선택된 항목이라면
    if (props.isSelected)
      styles = { color: "#19a7ce", fontWeight: "700", cursor: "default" };

    // 선택이 불가능한 경우
    if (props.disableSelected) styles.cursor = "not-allowed";

    return styles;
  }}
`;

import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { _Button } from "mcm-js-commons";

interface StyleTypes {
  render?: boolean;
  hover?: boolean;
  hasQuestion?: boolean;
  isAnswer?: boolean;
  isBug?: boolean;
}

export const CommentsList = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 24px 20px;
  border-bottom: dotted 1px black;
  transition: all 0.3s ease-out;
  min-height: 70px;

  ${(props: StyleTypes) =>
    props.hover && {
      backgroundColor: "#9BABB8 !important",
      color: "white !important",
    }}

  .createdAt {
    .date {
      ${(props) =>
        props.hover && {
          color: "white",
        }}
    }
  }

  .mcm-tooltip-wrapper {
    color: black;
  }

  :hover {
    background-color: ${(props) => !props.hover && "#dddddd"};

    .select-wrapper {
      display: flex;
    }
  }

  @media ${breakPoints.mobileLarge} {
    padding: 20px 0px;

    :hover {
      background-color: ${(props) => !props.hover && "unset"};
    }

    ${(props: StyleTypes) =>
      props.hover && {
        backgroundColor: "#9BABB8 !important",
        color: "white !important",
        paddingLeft: "10px",
      }}
  }
`;

export const CommentsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0px 20px;

  @keyframes SHOW_CATEGORY {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  animation: SHOW_CATEGORY 0.4s ease;

  .date {
    font-size: 12px;
    color: #888888;
    font-family: "Manlo";
    word-spacing: 1px;
  }

  @media ${breakPoints.mobileLarge} {
    flex-direction: column;

    .date {
      font-size: 10px;
    }
  }
`;

export const LabelWrapper = styled.div`
  min-width: 82px;
  height: 100%;

  .star {
    ${(props: StyleTypes) =>
      props.hover && {
        textShadow: "0 0 0 #ffffff",
      }}
  }

  @media ${breakPoints.mobileLarge} {
    min-width: auto;
    width: 100%;
    display: flex;
  }
`;

export const MoreShowWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

  .more-show {
    padding-top: 18px;
  }
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1px 0px;
  padding-left: 8px;

  .mcm-span-unit {
    width: 100%;
  }

  @media ${breakPoints.mobileLarge} {
    padding: 0px;
    margin-top: 12px;
  }
`;

export const OptionalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  height: 20px;
`;

export const OptionalButton = styled.button`
  font-size: 20px;
  font-weight: 500;

  ${(props: StyleTypes) =>
    props.hover && {
      color: "white",
    }}
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: none;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  cursor: default;

  ${(props: StyleTypes) =>
    props.hover && {
      display: "flex",
    }}

  .mcm-unit-select-list-wrapper {
    flex-direction: row;
    justify-content: space-between;
  }

  .mcm-unit-select {
    top: -50px;
    flex-direction: column-reverse;
    width: max-content;

    .mcm-close-button-unit {
      transform: translate3d(5px, 5px, 0px);
    }
  }
`;

export const Select = styled.li`
  :hover {
    background-color: #c2dedc;
  }
`;

export const SelectButton = styled(_Button)`
  :hover {
    background-color: #c2dedc;
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  gap: 0px 10px;

  .date {
    transition: all 0.3s ease-out;
  }

  @media ${breakPoints.mobileLarge} {
    flex-direction: column;
    gap: 4px 0px;
  }
`;

export const ContentsInfo = styled.div`
  display: flex;
  align-items: center;
  line-height: 26px;

  ${(props: StyleTypes) =>
    props.hasQuestion && {
      padding: "10px 14px",
      backgroundColor: "aliceblue",
      borderRadius: "10px",
      color: "black",
    }}

  ${(props) =>
    props.isAnswer && {
      backgroundColor: "antiquewhite",
      marginTop: "16px",
    }}

    &.answer {
    padding: 14px;
    border-radius: 10px;
    color: black;
    align-items: baseline;
  }

  .comments {
    ${(props) =>
      props.hasQuestion && {
        paddingLeft: "16px",
      }}
  }

  .anwser-date {
    margin-top: 10px;
    font-size: 10px;
  }

  .mcm-span-unit {
    overflow-wrap: anywhere;
  }

  @media ${breakPoints.mobileLarge} {
    flex-direction: column;
    align-items: baseline;
    gap: 10px 0px;
    border-radius: 10px 0px 0px 10px;

    &.answer {
      border-radius: 10px 0px 0px 10px;
    }

    span {
      font-size: 14px;
      line-height: 22px;
    }

    .comments {
      padding: 0;
    }
  }
`;

export const AnswerContents = styled.div`
  display: flex;
`;

export const QuestionTitle = styled.span`
  font-size: 20px !important;
  font-weight: 500;
  width: 20px;
  display: flex;
  justify-content: center;
`;

export const Filedset = styled.fieldset`
  border: unset;
  width: 100%;
  padding: 0px;
  margin: 0px;

  ${(props: StyleTypes) =>
    props.isBug && {
      border: "double 3px #aa5656",
      padding: "14px",
    }}

  legend {
    display: none;

    ${(props) =>
      props.isBug && {
        display: "block",
        padding: "0px 10px",
      }}
  }
`;

export const AnswerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .answer-date {
    margin-top: 10px;
    font-size: 12px;
    color: gray;
  }
`;

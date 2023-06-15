import styled from "@emotion/styled";

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
  border-top: dotted 1px black;
  transition: all 0.3s ease-out;
  min-height: 70px;

  ${(props: StyleTypes) =>
    props.hover && {
      backgroundColor: "#9BABB8",
      color: "white",
    }}

  .createdAt {
    .date {
      ${(props) =>
        props.hover && {
          color: "white",
        }}
    }
  }

  :hover {
    background-color: ${(props) => !props.hover && "#dddddd"};

    .select-wrapper {
      display: flex;
    }
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
`;

export const MoreShowWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  /* margin-top: 18px; */

  .more-show {
    padding: 10px 0px;
    padding-top: 18px;
    width: 100%;
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

  .mcm-unit-select {
    top: 30px;
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
`;

export const ContentsInfo = styled.div`
  display: flex;
  align-items: center;
  line-height: 26px;

  ${(props: StyleTypes) =>
    props.hasQuestion && {
      gap: "0px 18px",
      padding: "10px 14px",
      backgroundColor: "aliceblue",
      borderRadius: "10px",
      color: "black",
    }}

  ${(props) =>
    props.isAnswer && {
      backgroundColor: "antiquewhite",
      marginTop: "10px",
    }}
`;

export const QuestionTitle = styled.span`
  font-size: 20px;
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

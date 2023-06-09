import styled from "@emotion/styled";

import { _Button } from "mcm-js-commons";

interface StyleTypes {
  render?: boolean;
  hover?: boolean;
}

export const CommentsList = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 20px;
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
  }
`;

export const CommentsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0px 28px;

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
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 82px;

  button label {
    cursor: pointer;
  }
`;

export const MoreShowWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 18px;

  .more-show {
    padding: 10px 0px;
    width: 100%;
  }
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const OptionalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const OptionalButton = styled.button`
  /* cursor: pointer; */
  font-size: 20px;
  font-weight: 500;
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: default;

  .mcm-unit-select {
    top: 30px;
    /* margin-right: 30px; */
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

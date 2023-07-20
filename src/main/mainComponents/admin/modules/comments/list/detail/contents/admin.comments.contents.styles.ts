import styled from "@emotion/styled";
import { _Button, _PTextWithHtml } from "mcm-js-commons";

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const ContentsItems = styled.div`
  display: flex;

  .answer-teatarea-wrapper {
    width: 50%;

    .mcm-input-unit-items {
      border: double 2px gray;
      border-left: unset;

      .answer-textarea {
        padding: 16px;
        max-height: 300px;
        height: 100px;
        min-height: 100%;
      }
    }
  }
`;

export const ContentsBtn = styled(_Button)`
  width: 50%;
  text-align: left;
  border: double 2px black;
  border-radius: 10px 0px 0px 10px;
`;

export const Contents = styled(_PTextWithHtml)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  border-radius: 10px;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  font-size: 14px;
  padding: 16px;
  /* max-height: 180px; */
  height: 100%;

  &.open {
    -webkit-line-clamp: unset;
    max-height: 100%;
  }
`;

export const OptionWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
  align-items: center;

  .answer-date {
    font-size: 12px;
    color: gray;
  }
`;

export const OptionList = styled.div`
  display: flex;
  gap: 0px 10px;
`;

export const OptionBtn = styled(_Button)`
  font-size: 12px;
  padding: 6px 10px;
  border: solid 1px gray;
  border-radius: 6px;
  width: 96px;

  &.select {
    background-color: #525fe1;
    border: #525fe1;
    color: white;
    font-weight: 700;
  }

  &.disable {
    background-color: gray;
    color: #dddddd;
    cursor: not-allowed;
  }
`;

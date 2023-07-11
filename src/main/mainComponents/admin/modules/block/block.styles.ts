import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isTbody?: boolean;
  alreadyCancel?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .empty-block-list-title {
    font-size: 24px;
    letter-spacing: -0.05rem;
    color: gray;
  }
`;

export const BlockListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px 0px;
`;

export const OptionalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BlockListItems = styled.table`
  width: 100%;
  border: solid 1px black;

  .checked {
    background-color: #efefef;
  }

  thead {
    border-bottom: double 2px black;

    td {
      font-weight: 700;
      font-size: 14px;
      white-space: pre;
    }
  }

  tbody {
    display: flex;
    flex-direction: column;

    tr {
      td {
        font-size: 12px;
      }

      .block-contents {
        padding-right: 20px;
      }
    }
  }

  .block-select {
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .mcm-checkbox-unit-label {
      min-width: 20px;
    }
  }

  .block-ip {
    min-width: 160px;
  }

  .block-contents {
    width: 100%;
    max-width: 100%;

    .block-contents-info {
      max-height: 30px;
      overflow: auto;
    }
  }

  .block-date,
  .block-cancel {
    min-width: 160px;

    span {
      display: none;
    }
  }

  .block-ip {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media ${breakPoints.mobileLarge} {
    thead {
      display: none;
    }

    tbody {
      tr {
        .block-contents {
          padding: 0;

          /* .block-contents-info {
              min-height: 30px;
              height: 30px;
              max-height: 100%;
            } */
        }

        .block-date,
        .block-cancel {
          span {
            display: inline-block;
          }
        }
      }
    }
  }
`;

export const Tr = styled.tr`
  padding: 10px;
  display: flex;

  td {
    text-align: center;
  }

  ${(props: StyleTypes) =>
    props.isTbody && {
      padding: "16px 10px",
      borderTop: "dotted",
      alignItems: "center",
      cursor: props.alreadyCancel ? "default" : "pointer",
      backgroundColor: props.alreadyCancel ? "#F5F5F5" : "white",
      height: "52px",
    }}

  @media ${breakPoints.mobileLarge} {
    ${(props: StyleTypes) =>
      props.isTbody && {
        flexDirection: "column",
        gap: "16px 0px",
        height: "auto",
      }}
  }
`;

export const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0px 20px;

  .filter-icon {
    width: 20px;
    height: 20px;
  }

  .selected {
    color: #00c4ff;
    font-weight: 700;
  }

  .remove-block-user-btn {
    border: solid 1px gray;
    padding: 10px;
    border-radius: 10px;
    font-size: 12px;
    background-color: white;
  }

  @media ${breakPoints.mobileLarge} {
    position: fixed;
    flex-direction: column;
    gap: 10px 0px;
    top: 170px;
    right: 30px;
    font-size: 12px;

    button {
      font-size: 12px;
    }
  }
`;

export const FilterItems = styled.div`
  display: flex;

  .block-filter-list {
    left: -60px;
    top: 35px;
    width: 130px;

    .mcm-unit-select-list-wrapper {
      gap: 12px;

      li {
        display: flex;
        align-items: center;
        justify-content: center;

        button {
          font-size: 12px;
          padding: 0;
        }
      }
    }
  }

  @media ${breakPoints.mobileLarge} {
    .block-filter-list {
      left: -25px;
      top: 30px;
    }
  }
`;

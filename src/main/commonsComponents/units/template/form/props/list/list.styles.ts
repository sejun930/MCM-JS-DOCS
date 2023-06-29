import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { _PText } from "mcm-js-commons";

interface StyleTypes {
  isRequired?: boolean;
  isLast?: boolean;
}

export const PropsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
`;

export const PropsMobileInfoWrapper = styled.div`
  display: none;
  gap: 0px 10px;
  align-items: center;

  .box-color {
    width: 20px;
    height: 20px;
    background-color: #fff2cc;
  }

  .mcm-span-unit {
    font-size: 12px;
    font-weight: 700;
  }

  @media ${breakPoints.mobileLarge} {
    display: flex;
  }
`;

export const PropsTable = styled.table`
  width: 100%;
  border: dotted 2px #bbbbbb;

  caption {
    display: none;
  }

  thead {
    td {
      white-space: pre;
    }
  }

  tbody {
    td {
      font-weight: 400;
      font-size: 14px;
    }
  }

  @media ${breakPoints.mobileLarge} {
    margin-top: 20px;

    .props-list-header-wrapper {
      display: none;
    }
  }
`;

export const Tr = styled.tr`
  ${(props: StyleTypes) =>
    props.isRequired && {
      backgroundColor: "#FFF2CC",
    }}

  td {
    font-size: 16px;
    font-weight: 700;
    border: solid 1px #bbbbbb;
    padding: 15px 10px;
    letter-spacing: -0.5px;
    line-height: 24px;

    ${(props: StyleTypes) =>
      props.isRequired && {
        fontWeight: `700 !important`,
      }}
  }

  .props-name {
    width: 20%;
  }
  .props-notice {
    width: 55%;
  }
  .props-type {
    width: 15%;
    text-align: center;
  }
  .props-required {
    width: 10%;
    text-align: center;
  }

  @media ${breakPoints.mobileLarge} {
    display: flex;
    flex-direction: column;
    border-bottom: solid 2px black;

    ${(props) =>
      props.isLast && {
        border: "unset",
      }}

    td {
      width: 100% !important;
      border: unset;
      text-align: center;
      font-weight: 400 !important;
    }

    .props-name {
      border-bottom: dotted 1px black;
      font-size: 18px;
      font-weight: 800 !important;
    }

    .props-type {
      padding-top: 10px;
      color: gray;
    }

    .props-required {
      display: none;
    }
  }
`;

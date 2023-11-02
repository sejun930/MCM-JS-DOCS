import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

// import { _PText } from "mcm-js-commons";

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

export const PropsRequiredInfoWrapper = styled.div`
  display: flex;
  gap: 0px 10px;
  align-items: center;
  margin-bottom: 20px;

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

  caption {
    display: none;
  }

  .props-list-header-wrapper {
    td {
      text-align: center;
    }
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
      line-height: 22px;
    }
  }

  @media ${breakPoints.mobileLarge} {
    /* margin-top: 20px; */
    border: solid 2px black;

    .props-list-header-wrapper {
      display: none;
    }
  }
`;

export const Tr = styled.tr`
  :hover {
    .module-props-copy-button {
      display: inline-block;
    }
  }

  .copy-btn {
    display: none;
  }

  &.isRequired-list {
    background-color: #fff2cc;

    td {
      font-weight: 700;
    }
  }

  td {
    font-size: 16px;
    font-weight: 700;
    border: solid 1px #bbbbbb;
    padding: 15px 10px;
    letter-spacing: -0.7px;
    line-height: 24px;

    ${(props: StyleTypes) =>
      props.isRequired && {
        fontWeight: `700 !important`,
      }}
  }

  .props-name {
    width: 20%;
    span {
      font-size: 16px;
    }
  }
  .props-notice {
    width: 60%;

    b {
      font-weight: 700;
      color: #aa5656;
    }
  }
  .props-type {
    width: 20%;
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

    :hover {
      .module-props-copy-button {
        display: none;
      }
    }

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

      span {
        font-size: 18px;
        font-weight: 800 !important;
      }
    }

    .props-type {
      padding-top: 10px;
      font-size: 12px;
      line-height: 20px;
      color: gray;
    }

    .props-required {
      display: none;
    }

    .props-notice {
      padding-top: 24px;
    }
  }
`;

export const CopyCode = styled(_Button)`
  padding-left: 5px;
  display: none;
`;

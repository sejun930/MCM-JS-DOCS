import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &#functional-form {
    .mcm-props-list-wrapper {
      margin-top: 0px;
    }
  }

  .bold-code {
    /* background-color: white; */
    border: dotted 2px white;
    padding: 6px 8px;
    transition: all 0.25s;
    text-align: left;
    line-height: 26px;
    font-size: 14px;
    color: #9d9d9d;

    span {
      /* color: black; */
      font-weight: 700;
      font-family: "Manlo";
    }

    :hover {
      background-color: #aa5656;

      span {
        color: white;
      }
    }
  }

  @media ${breakPoints.mobileLarge} {
    &#functional-form {
      .mcm-props-list-wrapper {
        margin-top: 10px;
      }
    }
  }
`;

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

  @media ${breakPoints.mobileLarge} {
    &#functional-form {
      .mcm-props-list-wrapper {
        margin-top: 10px;
      }
    }
  }
`;

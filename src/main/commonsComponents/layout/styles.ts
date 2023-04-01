import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export const LayoutWrapper = styled.div`
  height: 100%;

  @media ${breakPoints.mobile} {
    ._halfDrag_controller_ {
      display: none;
    }
  }
`;

export const LayoutContentsWrapper = styled.div`
  display: flex;
  min-width: 100%;

  ._halfDrag_controller_ {
    background-color: #e8e2e2;
  }

  @media ${breakPoints.mobile} {
    ._halfDrag_leftPage_ {
      width: 20% !important;
    }

    ._halfDrag_rightPage_ {
      width: 80% !important;
    }
  }
`;

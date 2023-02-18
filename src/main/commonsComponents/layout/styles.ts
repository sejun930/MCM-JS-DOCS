import styled from "@emotion/styled";
import { breakPoints } from "src/commons/styles/responsiveBreakPoints";

export const LayoutWrapper = styled.div`
  height: 100%;
`;

export const LayoutContentsWrapper = styled.div`
  display: flex;
  width: 100%;

  ._halfDrag_controller_ {
    background-color: #e8e2e2;
  }

  @media ${breakPoints.mobile} {
    ._halfDrag_leftPage_ {
      width: calc(20%) !important;
    }

    ._halfDrag_rightPage_ {
      width: calc(80%) !important;
    }
  }
`;

import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isAdmin?: boolean;
}

export const LayoutWrapper = styled.div`
  /* height: -webkit-fill-available; */

  @media ${breakPoints.mobileLarge} {
    ._halfDrag_controller_ {
      display: none;
    }
  }
`;

export const LayoutContentsWrapper = styled.div`
  display: flex;
  min-width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  /* height: auto; */

  ._halfDrag_controller_ {
    background-color: #e8e2e2;
  }

  @media (min-width: 1601px) {
    border: solid 3px #aa5656;
    border-top: unset;
    border-bottom: unset;

    ${(props: StyleTypes) =>
      props.isAdmin && {
        borderColor: "#525FE1",
      }}
  }

  @media ${breakPoints.mobileLarge} {
    ._halfDrag_leftPage_ {
      width: 20% !important;
    }

    ._halfDrag_rightPage_ {
      width: 80% !important;
    }
  }
`;

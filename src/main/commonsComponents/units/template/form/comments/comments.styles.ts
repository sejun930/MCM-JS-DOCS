import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { _Title } from "mcm-js-commons";

export const CommentsInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: gray;

  ${(props: { endRender?: boolean }) =>
    props.endRender && {
      paddingTop: "30px",
      paddingBottom: "50px",
    }}

  h2 {
    cursor: default;
  }

  @media ${breakPoints.mobileLarge} {
    padding-top: 0px;
    padding-bottom: 0px;

    h2 {
      font-size: 20px;
      padding: 60px 0px;
    }
  }
`;

export const LoadingPageTitle = styled(_Title)`
  /* margin: 60px 0px; */
  color: gray;
  cursor: wait;
  margin: 40px 0px;
  margin-bottom: 60px;

  @media ${breakPoints.mobileLarge} {
    text-align: center;
    font-size: 30px;
    margin: 40px 0px;
  }

  @media ${breakPoints.mobileSmall} {
    font-size: 6vw;
    margin: 5vw 0px;
  }
`;

export const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const LoadingContents = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  .loading-title {
    position: sticky;
    /* top: 50%; */
    bottom: 160px;
    text-align: center;
    cursor: wait;
  }

  @media ${breakPoints.mobileSmall} {
    .loading-title {
      font-size: 9vw;
      white-space: pre;
    }
  }
`;

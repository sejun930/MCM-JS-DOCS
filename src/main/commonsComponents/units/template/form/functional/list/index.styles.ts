import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export const FunctionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;

  @media ${breakPoints.mobileLarge} {
    margin-top: 10px;
  }
`;

export const FunctionalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  background-color: #eeeeee;
  padding: 20px 24px;

  .functional-name {
    font-size: 20px;
  }

  .function-remarks {
    font-size: 14px;
    margin-top: 10px;
    white-space: pre;
    overflow: auto;
  }

  @media ${breakPoints.mobileLarge} {
    padding: 20px;

    .function-remarks {
      /* font-size: 12px; */
      white-space: unset;
      margin-top: 16px;
    }
  }
`;

export const PropsInfoWrapper = styled.div`
  /* overflow: hidden; */
  border-left: solid 4px rgba(170, 86, 86, 0.4);
`;

export const PropsInfoItems = styled.div`
  padding: 24px;
  padding-right: 0px;

  .props-title {
    font-weight: 500;
    font-size: 18px;
  }

  .functional-props-code-wrapper {
    margin-top: 16px;
  }

  @media ${breakPoints.mobileLarge} {
    padding: 18px;
    padding-right: 0px;
  }
`;

export const PropsInfoList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  .same-props {
    color: gray;
    font-size: 14px;

    .move-props-list {
      color: blue;
      font-weight: 700;
    }
  }

  .props-list-wrapper {
    margin-top: 16px;
  }

  @media ${breakPoints.mobileLarge} {
    .same-props {
      font-size: 12px;
    }
  }
`;

export const InfoListWrapper = styled.ul`
  padding: 16px;
  margin-top: 16px;
  background-color: #f9f9f9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px 0px;

  @media ${breakPoints.mobileLarge} {
    gap: 14px 0px;
  }
`;

export const Info = styled.li`
  font-size: 16px;
  list-style: inside;

  b {
    color: #aa5656;
    font-weight: 700;
  }

  @media ${breakPoints.mobileLarge} {
    font-size: 14px;
  }
`;

export const ExampleCodeBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

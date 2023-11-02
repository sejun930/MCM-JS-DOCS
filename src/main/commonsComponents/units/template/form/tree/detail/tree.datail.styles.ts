import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  isDisable?: boolean;
}

export const Wrapper = styled.div`
  width: 40%;
  position: relative;

  @media ${breakPoints.mobileLarge} {
    width: 100%;
    min-height: 60px;

    ${(props: StyleTypes) =>
      props.isDisable && {
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
      }}
  }
`;

export const EmptySelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const DetailWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DetailRole = styled.div`
  padding: 1rem;
  overflow: auto;
  overflow-x: hidden;
  height: 100%;

  @media ${breakPoints.mobileLarge} {
    height: 140px;
    padding: 0.8rem;
  }
`;

export const DetailInfoWrapper = styled.article`
  display: flex;
  flex-direction: column;
  height: 85%;

  .tree-detail-info-role {
    text-align: center;
    line-height: 24px;
    color: #444444;
    letter-spacing: -0.8px;

    b {
      color: black;
    }
  }

  @media ${breakPoints.mobileLarge} {
    .tree-detail-info-role {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const DetailTitleInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: solid 2px #666666;
  white-space: pre;
  overflow-x: auto;
  padding: 12px 20px;
  padding-right: 0px;
  justify-content: space-around;
  min-height: 80px;
  height: 90px;
  overflow-y: hidden;

  .tree-title {
    width: 100%;
    font-size: 14px;
    word-spacing: 1px;
  }

  @media ${breakPoints.mobileLarge} {
    gap: 0;
    justify-content: space-between;
    height: 70px;
    min-height: 70px;
  }
`;

export const DetailTitle = styled.div`
  width: 100%;
  display: flex;

  span {
    min-width: 120px;
  }

  code {
    display: flex;
    align-items: center;
  }

  @media ${breakPoints.mobileLarge} {
    span {
      font-size: 14px;
      min-width: 100px;
    }

    code {
      padding: 0;
      font-size: 14px;
      padding-right: 20px;
    }
  }
`;

export const ParentsWrapper = styled.div`
  position: relative;
  height: 15%;
  width: 100%;

  .tree-detail-button {
    height: 100%;
    width: 100%;
    border-top: double 2px black;
    border-radius: 0px 0px 10px 0px;

    .my-parents {
      height: 100%;
      display: flex;
      padding: 0.5rem;
      padding-left: 12px;
      font-size: 14px;
      align-items: center;
      white-space: pre;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;

      code {
        margin-left: 6px;
      }
    }
  }

  @media ${breakPoints.mobileLarge} {
    height: 40px;
    display: flex;

    .tree-detail-button {
      .my-parents {
        font-size: 12px;
        padding: 0.8rem;
        padding-bottom: 0;
        padding-top: 0;

        code {
          font-size: 12px;
        }
      }
    }
  }
`;

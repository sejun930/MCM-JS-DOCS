import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { _PText, _Title, _Anchor, _Image } from "mcm-js-commons";

import Template from "../commonsComponents/units/template/main";
import _SubTitleTemplate from "../commonsComponents/units/template/title/subTitle";
import _Copy from "../commonsComponents/units/copy";

export default function MainHomePage() {
  return (
    <Template>
      <ProjectInfoWrapper>
        <_Title>
          <span className="mcm-name-title">MCM</span>{" "}
          <span>(My Custom Modules)</span>
        </_Title>
        <ProjectInfo>
          <_PText>
            <span>"쉽게 커스텀할 수 있는 모듈을 만들어보면 어떨까?"</span>{" "}
            <span>하는 생각에서 시작된 프로젝트입니다.</span>
          </_PText>
          <_PText>
            <span>실력이 부족한 개발자가 혼자 만든 기능들이다 보니</span>{" "}
            <span>이슈 발생 확률이 상당할 수도 있습니다. 😅</span>
          </_PText>
          <_PText>
            <span>이용중에 발생되는 이슈나 개선점들을</span>{" "}
            <span>가감없이 말씀해주시면 감사하겠습니다! 🙇</span>
          </_PText>
        </ProjectInfo>
      </ProjectInfoWrapper>

      <ProjectDetailInfoWrapper>
        <_SubTitleTemplate title="Install" className="npm-install" />
        <InstallWrapper>
          <InstallItems>
            <_Title titleLevel="h3">npm</_Title>
            <_Copy text="npm install mcm-js" />
          </InstallItems>
          <InstallItems>
            <_Title titleLevel="h3">yarn</_Title>
            <_Copy text="yarn add mcm-js" />
          </InstallItems>
        </InstallWrapper>
      </ProjectDetailInfoWrapper>
    </Template>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProjectInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px 0px;

  @media (max-width: 767px) {
    /* @media ${breakPoints.mobile767} { */
    gap: 16px 0px;
    padding-top: 40px;

    .mcm-title-unit {
      font-size: 30px;
    }
  }

  @media (max-width: 500px) {
    gap: 30px 0px;
    padding-top: 60px;

    .mcm-title-unit {
      display: flex;
      flex-direction: column;
      align-items: center;

      .mcm-name-title {
        font-size: 50px;
      }

      span {
        white-space: pre;
      }
    }
  }
`;

export const ProjectInfo = styled.div`
  .mcm-p-unit {
    font-size: 16px;
    line-height: 26px;
  }

  @media (max-width: 767px) {
    /* @media ${breakPoints.mobile767} { */
    .mcm-p-unit {
      font-size: 14px;
      line-height: 24px;
    }
  }

  @media (max-width: 500px) {
    /* @media ${breakPoints.mobile500} { */
    .mcm-p-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      white-space: pre;
    }
  }
`;

export const ProjectDetailInfoWrapper = styled.section`
  padding-top: 120px;

  @media (max-width: 767px) {
    /* @media ${breakPoints.mobile767} { */
    h2 {
      font-size: 22px;
    }
  }

  @media (max-width: 500px) {
    /* @media ${breakPoints.mobile500} { */
    padding-top: 140px;
  }
`;

export const NpmAdress = styled.div`
  display: flex;

  .mcm-anchor-unit {
    display: flex;
    align-items: flex-end;
    margin-left: 8px;

    .npm-icon {
      width: 18px;
    }
  }
`;

export const InstallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  gap: 20px 0px;

  @media (max-width: 767px) {
    /* @media ${breakPoints.mobile767} { */
    padding-top: 20px;
  }
`;

export const InstallItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px 0px;

  .copy-text {
    padding-bottom: 0px;
  }

  @media (max-width: 767px) {
    /* @media ${breakPoints.mobile767} { */
    .mcm-title-unit {
      font-size: 18px;
    }
  }
`;

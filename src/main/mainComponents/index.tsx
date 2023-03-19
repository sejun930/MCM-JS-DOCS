import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { _PText, _Title, _Anchor } from "mcm-js-commons";

import Template from "../commonsComponents/units/template/main";
import _SubTitleTemplate from "../commonsComponents/units/template/title/subTitle";
import _Copy from "../commonsComponents/units/copy";

export default function MainHomePage() {
  return (
    <Template>
      <ProjectInfoWrapper>
        <_Title>MCM (My Custom Modules)</_Title>
        <ProjectInfo>
          <_PText>{`'라이브러리를 쉽게 커스텀할 수 있게 하는 모듈을 만들어보면 어떨까?' 하는 생각에서 시작된 프로젝트입니다.`}</_PText>
          <_PText>
            실력이 부족한 개발자가 직접 만든 기능들이다 보니 이슈 발생 확률이
            상당할 수도 있습니다. 😅
          </_PText>
          <_PText>
            이용중에 발생되는 버그나 사용중에 느꼈었던 개선점들을 가감없이
            말씀해주시면 감사하겠습니다! 🙇
          </_PText>
        </ProjectInfo>
      </ProjectInfoWrapper>

      <ProjectDetailInfoWrapper>
        <_SubTitleTemplate title="Install" className="npmInstall">
          <NpmAdress>
            <b>MCM-js npm : </b>
            <_Anchor href="https://www.npmjs.com/package/mcm-js">
              https://www.npmjs.com/package/mcm-js
            </_Anchor>
          </NpmAdress>
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
        </_SubTitleTemplate>
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

  @media ${breakPoints.mobile} {
    gap: 4vw 0px;

    .mcm-title-unit {
      font-size: 5.2vw;
    }
  }
`;

export const ProjectInfo = styled.div`
  line-height: 26px;

  @media ${breakPoints.mobile} {
    .mcm-p-unit {
      font-size: 3.5vw;
    }

    line-height: 5.5vw;
  }
`;

export const ProjectDetailInfoWrapper = styled.section`
  .npmInstall {
    padding-top: 120px;
  }

  @media ${breakPoints.mobile} {
    h2 {
      font-size: 6vw;
    }

    .npmInstall {
      padding-top: 18vw;
    }
  }
`;

export const NpmAdress = styled.div`
  display: flex;

  @media ${breakPoints.mobile} {
    flex-direction: column;
    font-size: 3.6vw;
  }
`;

export const InstallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  gap: 20px 0px;

  @media ${breakPoints.mobile} {
    padding-top: 8vw;
    gap: 8vw 0px;
  }
`;

export const InstallItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px 0px;

  @media ${breakPoints.mobile} {
    .mcm-title-unit {
      font-size: 5vw;
    }
  }
`;

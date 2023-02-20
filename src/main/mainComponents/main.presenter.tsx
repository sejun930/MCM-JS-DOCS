import styled from "@emotion/styled";

import Template from "../commonsComponents/units/template/main";
import _Title from "../commonsComponents/units/title";
import _PText from "../commonsComponents/units/text/p";
import _SmallTitleTemplate from "../commonsComponents/units/template/smallTitle";
import _A from "../commonsComponents/units/link/anchor";
import _Copy from "../commonsComponents/units/copy";

export default function MainHomePage() {
  return (
    <Template>
      <ProjectInfoWrapper>
        <_Title title="MCM (My Custom Modules)" titleLevel="h1" />
        <ProjectInfo>
          <_PText text="'라이브러리를 쉽게 커스텀할 수 있게 하는 모듈을 만들어보면 어떨까?' 하는 생각에서 시작된 프로젝트입니다." />
          <_PText text="실력이 부족한 개발자가 직접 만든 기능들이다 보니 이슈 발생 확률이 상당할 수도 있습니다. 😅" />
          <_PText text="이용중에 발생되는 버그나 사용중에 느꼈었던 개선점들을 가감없이 말씀해주시면 감사하겠습니다! 🙇" />
        </ProjectInfo>
      </ProjectInfoWrapper>

      <ProjectDetailInfoWrapper>
        <_SmallTitleTemplate title="💾 Install" className="npmInstall">
          <div>
            <b>MCM-js npm : </b>
            <_A href="https://www.npmjs.com/package/mcm-js">
              https://www.npmjs.com/package/mcm-js
            </_A>
          </div>
          <InstallWrapper>
            <InstallItems>
              <_Title titleLevel="h3" title="npm" />
              <_Copy text="npm install mcm-js" />
            </InstallItems>
            <InstallItems>
              <_Title titleLevel="h3" title="yarn" />
              <_Copy text="yarn add mcm-js" />
            </InstallItems>
          </InstallWrapper>
        </_SmallTitleTemplate>
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
`;

export const ProjectInfo = styled.div`
  line-height: 26px;
`;

export const ProjectDetailInfoWrapper = styled.section`
  .npmInstall {
    padding-top: 80px;
  }
`;

export const InstallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  gap: 20px 0px;
`;

export const InstallItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px 0px;
`;

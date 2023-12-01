import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import Template from "src/main/commonsComponents/units/template/main";
// import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";

export default function ModulePage({ module }: { module: string }) {
  return (
    <Template>
      <ModulesInfoWrapper>
        {/* <_MainTitleTemplate module={module} /> */}
      </ModulesInfoWrapper>
    </Template>
  );
}

export const ModulesInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 240px 0px;

  @media ${breakPoints.mobileLarge} {
    gap: 180px 0px;
  }
`;

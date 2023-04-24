import styled from "styled-components";

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";

export default function ModulePage({ module }: { module: string }) {
  console.log(module);
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
  gap: 160px 0px;
`;

import styled from "@emotion/styled";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
import { _PText } from "mcm-js-commons";

import _SubTitleTemplate from "../../title/subTitle";
import _Copy from "../../../copy";

// 사용 방법에 대한 폼
export default function _HowUseForm({ code }: { code: string }) {
  const { getExampleCode } = getExampleCodeComponnet();

  return (
    <_SubTitleTemplate title="사용 방법" className="_howUse_Title_">
      <CodeWrapper role="code-wrapper">
        <_PText className="_howUse_example_notice_">
          기본값으로 사용할 수 있는 예시 코드입니다.
        </_PText>
        <_Copy text={getExampleCode(code)} type="Code" />
      </CodeWrapper>
    </_SubTitleTemplate>
  );
}

export const CodeWrapper = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px 0px;
`;

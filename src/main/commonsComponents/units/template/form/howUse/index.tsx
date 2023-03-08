import styled from "@emotion/styled";
import HowUseScriptComponnet from "./howUse.script";

import _SubTitleTemplate from "../../title/subTitle";
import _PText from "../../../text/p";
import _Copy from "../../../copy";

import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";
import { CodeInfoTypes } from "src/main/mainComponents/modules/modal/example/modal.example.code.data";

// 사용 방법에 대한 폼
export default function _HowUseForm({ codeInfo }: { codeInfo: CodeInfoTypes }) {
  const { getHowUseExampleCode } = HowUseScriptComponnet();
  const [module] = useRecoilState(moduleState);

  return (
    <_SubTitleTemplate title="사용 방법" className="_howUse_Title_">
      <CodeWrapper role="code-wrapper">
        <_PText
          text="기본값으로 사용할 수 있는 예시 코드입니다."
          className="_howUse_example_notice_"
        />
        <_Copy text={getHowUseExampleCode(module, codeInfo)} type="Code" />
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

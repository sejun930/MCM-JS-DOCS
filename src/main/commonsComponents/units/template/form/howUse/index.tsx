import styled from "@emotion/styled";

import _SubTitleTemplate from "../../title/subTitle";
import _PText from "../../../text/p";
import _Copy from "../../../copy";

import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

// 사용 방법에 대한 폼
export default function _HowUseForm() {
  const [module] = useRecoilState(moduleState);

  const getRemarks = () => {
    return `- 페이지 최상위에 MCM의 _${module}을 호출해주세요.`;
  };

  return (
    <_SubTitleTemplate title="사용 방법">
      <CodeWrapper>
        <_PText text={getRemarks()} />
        <_Copy text={`import { _${module} } from "MCM-js"`} type="Code" />
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

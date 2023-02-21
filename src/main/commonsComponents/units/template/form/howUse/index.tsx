import styled from "@emotion/styled";

import _SubTitleTemplate from "../../title/subTitle";
import _PText from "../../../text/p";
import _Copy from "../../../copy";

import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

interface IProps {
  title: string; // 서브 타이틀에 적용할 타이틀 내용
}

// 사용 방법에 대한 폼
export default function _HowUseForm({ title }: IProps) {
  const [module] = useRecoilState(moduleState);

  const getRemarks = () => {
    return `- 페이지 최상위에 MCM 안의 _${module}을 호출해주세요.`;
  };

  return (
    <_SubTitleTemplate title={title}>
      <CodeWrapper>
        <_PText text={getRemarks()} />
        <_Copy text='import { _Modal } from "MCM-js"' type="Code" />
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

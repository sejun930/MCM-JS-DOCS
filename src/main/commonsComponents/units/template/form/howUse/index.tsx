import React from "react";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
import { CopyWrapper, TapWrapper, Tap } from "./index.styles";

import { useRecoilState } from "recoil";
import { moduleState, versState } from "src/commons/store";

import _SubTitleTemplate from "../../title/subTitle";
import _Copy from "../../../copy";

import { Wrapper } from "../form.commons.styles";
import { howUseTextList } from "./data";

// 사용 방법에 대한 폼
export default function _HowUseForm({
  codeInfo,
  exmapleContents,
}: {
  codeInfo: Array<any>;
  exmapleContents: React.ReactNode | string;
}) {
  const [module] = useRecoilState(moduleState);
  const [vers, setVers] = useRecoilState(versState);
  const { getExampleCode } = getExampleCodeComponnet();

  return (
    <Wrapper>
      <_SubTitleTemplate
        title="How To Use"
        className="howUse-subTitle"
        remakrs={
          howUseTextList[module]
            ? howUseTextList[module]
            : `기본적으로 사용할 수 있는 예시입니다.`
        }
      />
      <CopyWrapper>
        <TapWrapper hasMultiple={codeInfo.length > 1}>
          {codeInfo.map((el, i) => (
            <Tap
              key={`${module}_vers_tap_${i}`}
              isSelected={i === vers}
              onClick={() => i !== vers && setVers(i)}
              // style={{ width: `${Math.floor(100 / codeInfo.length)}%` }}
            >
              {el.title}
            </Tap>
          ))}
        </TapWrapper>
        {codeInfo[vers].basic && (
          <_Copy
            text={getExampleCode(codeInfo[vers].basic, exmapleContents, vers)}
            type="Code"
          />
        )}
      </CopyWrapper>
    </Wrapper>
  );
}

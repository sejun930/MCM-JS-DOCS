import React, { MutableRefObject, useEffect, useRef } from "react";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
import { CopyWrapper, TapWrapper, Tap } from "./index.styles";

import { useRecoilState } from "recoil";
import { moduleState, versState } from "src/commons/store";

import _SubTitleTemplate from "../../title/subTitle";
import _Copy from "../../../copy";

import { Wrapper } from "../form.commons.styles";
import { howUseTextList } from "./data";
import { ExampleCodeListTypes } from "src/main/mainComponents/modules/modal/example/modal.example.code.data";

let eventStart: boolean = false; // 스크롤 이벤트 시작여부
let debouncing: ReturnType<typeof setTimeout> | number; // 디바운싱 이벤트
// 사용 방법에 대한 폼
export default function _HowUseForm({
  codeInfo,
  exmapleContents,
}: {
  codeInfo: ExampleCodeListTypes;
  exmapleContents: React.ReactNode | string;
}) {
  const _ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    document.addEventListener("scroll", setFixedTap);
    return () => {
      document.removeEventListener("scroll", setFixedTap);
    };
  });

  const setFixedTap = () => {
    clearTimeout(debouncing);

    if (_ref.current) {
      debouncing = setTimeout(() => {
        const scrollTop = window.scrollY;
        const endLine = // 종료 위치
          scrollTop +
          (_ref.current.offsetTop - scrollTop) +
          _ref.current.clientHeight;

        if (!eventStart && scrollTop > endLine) {
          eventStart = true;
          console.log("*********** 시작 ***********");
        } else if (eventStart && scrollTop <= endLine) {
          eventStart = false;
          console.log("*********** 종료 ***********");
        }
      }, 10);
    }
  };

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
        <TapWrapper hasMultiple={codeInfo.title.length > 1} ref={_ref}>
          {codeInfo?.title.length &&
            codeInfo?.title.map((el, i) => (
              <Tap
                key={`${module}_vers_tap_${i}`}
                isSelected={i === vers}
                onClick={() => i !== vers && setVers(i)}
              >
                {el}
              </Tap>
            ))}
        </TapWrapper>
        {codeInfo.basic[vers] !== undefined && (
          <_Copy
            text={getExampleCode(codeInfo.basic[vers], exmapleContents, vers)}
            type="Code"
          />
        )}
      </CopyWrapper>
    </Wrapper>
  );
}

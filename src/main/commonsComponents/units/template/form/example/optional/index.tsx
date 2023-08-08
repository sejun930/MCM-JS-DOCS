import { CodeInfoWrapper, OptionalWrapper, Wrapper } from "./optional.styles";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import { useRecoilState } from "recoil";
import { versState } from "src/commons/store";

import _ExampleOptionalCodeIconPage from "./code";
import _Copy from "src/main/commonsComponents/units/copy";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";

import { Tooltip } from "mcm-js";
import { getCommonsHighlight } from "src/commons/highlight";

// 예시용에 추가적으로 붙는 옵션 폼 페이지 (ex : 코드보기 등등)
export default function _ExampleOptionalFormPage({
  code,
  content,
  isOpen,
  changeOpenList,
  codeIdx,
  changeContent,
  allHeightList,
}: {
  code: string;
  content: string | JSX.Element;
  isOpen: boolean;
  changeOpenList: (idx: number, list?: Array<boolean>) => void;
  codeIdx: number;
  changeContent: string;
  allHeightList: { [key: number]: number };
}) {
  // 코드 보기 및 가리기
  const [showCode, setShowCode] = useState(false);
  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [vers] = useRecoilState(versState);
  const { getExampleCode, getCommonsReturn } = getExampleCodeComponnet();

  useEffect(() => {
    if (_wrapperRef?.current) {
      const children = _wrapperRef.current.children[0];
      if (children) {
        // 각각의 코드 총 높이값 저장하기
        allHeightList[codeIdx] = children.clientHeight;
      }
    }
  }, [vers]);

  // 코드 보기 toggle
  const toggleShowCode = () => {
    setShowCode(!showCode);
    changeOpenList(codeIdx);
  };

  useEffect(() => {
    setShowCode(isOpen);
  }, [isOpen]);

  return (
    <Wrapper>
      <Tooltip
        tooltipText={`코드 ${isOpen ? "닫기" : "열기"}`}
        useShowAnimation
      >
        <OptionalWrapper onClick={toggleShowCode}>
          <_ExampleOptionalCodeIconPage showCode={showCode} />
        </OptionalWrapper>
      </Tooltip>
      <CodeInfoWrapper
        showCode={showCode}
        ref={_wrapperRef}
        allHeight={allHeightList[codeIdx]}
      >
        <_Copy
          text={getExampleCode({
            code,
            children: content,
            idx: vers || 0,
            changeContent,
          })}
          type="Code"
          showText={getCommonsHighlight.return(
            getCommonsReturn({
              code,
              children: content,
              idx: vers || 0,
              changeContent,
            })
          )}
          position="Top"
        />
      </CodeInfoWrapper>
    </Wrapper>
  );
}

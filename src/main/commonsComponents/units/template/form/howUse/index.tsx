import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
import { CopyWrapper, TapWrapper, TapItems, FixedTap } from "./index.styles";

import { useRecoilState } from "recoil";
import { moduleState, versState } from "src/commons/store";

import _SubTitleTemplate from "../../title/subTitle";
import _Copy from "../../../copy";
import TapListPage from "./tapList";

import { Wrapper } from "../form.commons.styles";
import { howUseTextList } from "./data";
import { ExampleCodeListTypes } from "src/main/mainComponents/modules/modal/example/modal.example.code.data";

let eventStart: boolean = false; // 스크롤 이벤트 시작여부
let itemsHeight: number = 0; // tap items 태그의 높이값 설정
let eventDebouncing: ReturnType<typeof setTimeout> | number; // 디바운싱 이벤트

// 사용 방법에 대한 폼
export default function _HowUseForm({
  codeInfo,
  exmapleContents,
}: {
  codeInfo: ExampleCodeListTypes;
  exmapleContents: React.ReactNode | string;
}) {
  const [module] = useRecoilState(moduleState);
  const [vers] = useRecoilState(versState);
  const [fixed, setFixed] = useState(false);
  const [tempVers, setTempVers] = useState(0);
  const { getExampleCode } = getExampleCodeComponnet();

  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _fixedRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    setFixedTap(); // 화면 렌더시 최초 실행
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", setFixedTap);
    return () => {
      document.removeEventListener("scroll", setFixedTap);
    };
  });

  const bonusHeight = 80;
  const setFixedTap = () => {
    clearTimeout(eventDebouncing);

    if (_wrapperRef.current && _fixedRef.current) {
      if (!itemsHeight) itemsHeight = _wrapperRef.current.offsetHeight;

      eventDebouncing = setTimeout(() => {
        const scrollTop = window.scrollY;
        const endLine = // 종료 위치
          scrollTop +
          (_wrapperRef.current?.offsetTop - scrollTop) +
          _wrapperRef.current.clientHeight;
        setTempVers(vers);

        if (!eventStart && scrollTop + bonusHeight >= endLine) {
          eventStart = true;
          _fixedRef.current.classList.add("fixed-mode");
          setFixed(true);

          setTimeout(() => {
            _fixedRef.current.classList.add("show");
            _fixedRef.current.classList.add("widen");
          }, 100);
        } else if (
          eventStart &&
          scrollTop + bonusHeight <= _wrapperRef.current.offsetTop
        ) {
          eventStart = false;

          if (_fixedRef.current.classList.contains("widen"))
            _fixedRef.current.classList.remove("widen");

          if (_fixedRef.current.classList.contains("show"))
            _fixedRef.current.classList.remove("show");

          setFixed(false);
        }
      }, 10);
    }
  };

  const changeTempVers = (i: number) => {
    setTempVers(i);
  };

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
        <TapWrapper
          hasMultiple={codeInfo.title.length > 1}
          ref={_wrapperRef}
          allLength={codeInfo.title.length || 0}
          vers={tempVers}
          isFixed={fixed}
        >
          <TapItems isFixed={fixed} itemsHeight={itemsHeight}>
            <TapListPage tapList={codeInfo.title || []} />
          </TapItems>
          <FixedTap ref={_fixedRef}>
            <TapListPage
              tapList={codeInfo.title || []}
              changeTempVers={changeTempVers}
              isFixedMode={fixed}
            />
          </FixedTap>
        </TapWrapper>

        {codeInfo.basic[vers] !== undefined && (
          <_Copy
            text={getExampleCode({
              code: codeInfo.basic[vers],
              children: exmapleContents,
              idx: vers,
            })}
            type="Code"
          />
        )}
      </CopyWrapper>
    </Wrapper>
  );
}

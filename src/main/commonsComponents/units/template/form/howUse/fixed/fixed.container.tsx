import { useState, useRef, MutableRefObject, useEffect } from "react";

import ExampleFixedUIPage from "./fixed.presenter";
import { ExampleCodeListTypes } from "src/main/mainComponents/modules/modal/example/modal.example.code.data";

let eventStart: boolean = false; // 스크롤 이벤트 시작여부
let itemsHeight: number = 0; // tap items 태그의 높이값 설정
let eventDebouncing: ReturnType<typeof setTimeout> | number; // 디바운싱 이벤트

const bonusHeight = 80; // 스크롤 오차 범위
export default function ExampleFixedPage({
  codeInfo,
  endPointRef,
  vers,
}: {
  codeInfo: ExampleCodeListTypes;
  endPointRef: HTMLDivElement;
  vers: number;
}) {
  // fixed 모드 실행 여부
  const [fixed, setFixed] = useState(false);
  // vers 임시 저장용
  const [tempVers, setTempVers] = useState(0);

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

  const setFixedTap = () => {
    clearTimeout(eventDebouncing);

    if (_wrapperRef.current && _fixedRef.current && endPointRef) {
      if (!itemsHeight) itemsHeight = _wrapperRef.current.offsetHeight;

      eventDebouncing = setTimeout(() => {
        const scrollTop = window.scrollY;
        const startFixedPoint = // Fixed 시작 위치
          scrollTop +
          (_wrapperRef.current?.offsetTop - scrollTop) +
          _wrapperRef.current?.clientHeight;
        setTempVers(vers);

        const endFixedPoint = // Fixed 종료 위치
          scrollTop +
          (endPointRef?.offsetTop - scrollTop) +
          endPointRef?.clientHeight;

        if (
          !eventStart &&
          scrollTop + bonusHeight >= startFixedPoint &&
          endFixedPoint > scrollTop
        ) {
          // fixed 모드 돌입
          eventStart = true;
          _fixedRef.current.classList.add("fixed-mode");
          setFixed(true);

          setTimeout(() => {
            _fixedRef.current.classList.add("show");
            _fixedRef.current.classList.add("widen");
          }, 100);
          // fixed 모드 종료
        } else if (
          eventStart &&
          (scrollTop + bonusHeight <= _wrapperRef.current.offsetTop ||
            scrollTop > endFixedPoint)
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
    <ExampleFixedUIPage
      fixed={fixed}
      tempVers={tempVers}
      _wrapperRef={_wrapperRef}
      _fixedRef={_fixedRef}
      changeTempVers={changeTempVers}
      codeInfo={codeInfo}
      itemsHeight={itemsHeight}
    />
  );
}

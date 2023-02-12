import {
  MutableRefObject,
  ReactComponentElement,
  useEffect,
  useRef,
  useState,
} from "react";
import HalfDragUIPage from "./half-drag.presenter";

export interface IProps {
  LeftComponent: ReactComponentElement<any>; // 왼쪽에 렌더될 컴포넌트
  RightComponent: ReactComponentElement<any>; // 오른쪽에 렌더될 컴포넌트
  // 두 컴포넌트 모두 필수 컴포넌트이며, 없다면 작동되지 않는다.
  leftComponentWidth?: number | string; // 왼쪽 컴포넌트의 시작 위치값을 받아온다.
  // 위의 값으로 두개의 컴포넌트의 위치값이 결정되며, 기본값은 왼쪽과 오른쪽 모두 50%로 시작한다.
  // %와 px로 받을 수 있으며, px를 붙이지 않을 경우 자동으로 %로 계산한다.
}

// 화면을 반으로 분할해서 드래그 이벤트를 이용해 화면의 크기를 조절할 수 있는 컴포넌트
let ableMoveScroll = false; // 드래그 이벤트 시작 여부 (true일 경우만 이동 감지 실행)
export default function _HalfDrag({
  LeftComponent,
  RightComponent,
  leftComponentWidth,
}: IProps) {
  const [startHalfScroll, setStartHalfScroll] = useState(false);

  const leftRef = useRef() as MutableRefObject<HTMLDivElement>;
  const controllerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const rightRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (leftComponentWidth) {
      const { innerWidth } = window; // 브라우저 전체 크기
      // 전체의 1% 크기
      const minPercent = innerWidth * 0.01;

      let leftWidth = "50%";
      let rightWidth = "50%";

      // 시작 위치값이 정해진 경우
      if (String(leftComponentWidth).includes("px")) {
        // px 단위로 지정될 경우
        const px = Number(String(leftComponentWidth).split("px")[0]);
        if (
          px > 0 && // 1 이상의 숫자가 입력되어야 하며
          !Number.isNaN(Number(px)) && // 숫자여야 하고
          px < innerWidth // 전체 크기보다 작아야 한다.
        ) {
          leftWidth = `${px / minPercent}%`;
          rightWidth = `${(innerWidth - px) / minPercent}%`;
        }
      } else {
        // % 단위로 지정되거나 숫자 타입이 입력되는 경우
        let leftPrecent = Number(
          String(leftComponentWidth).includes("%")
            ? String(leftComponentWidth).split("%")[0]
            : leftComponentWidth
        );

        // 100을 넘어가거나 0 미만일 경우는 50%로 고정
        if (leftPrecent > 100 || leftPrecent < 0) leftPrecent = 50;

        leftWidth = `${leftPrecent}%`;
        rightWidth = `${100 - leftPrecent}%`;
      }

      if (leftRef.current) leftRef.current.style.width = `calc(${leftWidth})`;
      if (rightRef.current) {
        rightRef.current.style.width = `calc(${rightWidth})`;
      }
    }

    return () => {
      const body = document.getElementsByTagName("body")[0];
      if (body) {
        body.removeEventListener("mousemove", moveDrag);
        body.removeEventListener("click", EndDrag);
      }
    };
  }, []);

  // 버튼 클릭시 : 드래그 이벤트 시작
  const startDrag = () => {
    ableMoveScroll = true;
    setStartHalfScroll(true);

    const body = document.getElementsByTagName("body")[0];
    if (body) {
      // 스크롤 이동시 width 값 늘이기
      body.addEventListener("mousemove", moveDrag);
      // 마우스를 뗀 순간 이벤트 종료하기
      body.addEventListener("click", EndDrag);
      // 브라우저 벗어날 경우 이벤트 종료하기
      body.addEventListener("mouseleave", EndDrag);

      if (body.style) {
        body.style.cursor = "ew-resize";
      }
    }
  };

  // 스크롤 이동시 : 양쪽 컴포넌트 위치 조절
  const moveDrag = (event: any) => {
    if (ableMoveScroll) {
      const { pageX } = event; // 이동한 위치
      const { innerWidth } = window; // 브라우저 전체 크기

      // 전체의 1% 크기
      const minPercent = innerWidth * 0.01;

      // 왼쪽 컴포넌트 크기 가져오기
      let leftWidth = pageX / minPercent;
      // 오른쪽 컴포넌트 크기 가져오기
      let rightWidth = (innerWidth - pageX) / minPercent;

      if (leftWidth < 0.146) {
        leftWidth = 0;
        rightWidth = 100;
      }

      if (leftRef) {
        leftRef.current.style.width = `calc(${leftWidth}% - 10px)`;
      }
      if (rightRef) {
        rightRef.current.style.width = `calc(${rightWidth}%)`;
      }
    }
  };

  // 마우스 이벤트 종료 : 마우스에서 손가락을 뗐을 때
  const EndDrag = () => {
    ableMoveScroll = false;
    setStartHalfScroll(false);

    const body = document.getElementsByTagName("body")[0];
    if (body) {
      body.removeEventListener("mousemove", moveDrag);
      body.removeEventListener("click", EndDrag);
      body.removeEventListener("mouseleave", EndDrag);

      if (body.style) {
        body.style.cursor = "unset";
      }
    }
  };

  // 모바일용 드래그 시작 이벤트
  // 모바일용 드래그 진행 이벤트
  // 모바일용 드래그 종료 이벤트

  return (
    <HalfDragUIPage
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
      startDrag={startDrag}
      leftRef={leftRef}
      rightRef={rightRef}
      startHalfScroll={startHalfScroll}
      controllerRef={controllerRef}
    />
  );
}

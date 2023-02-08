import { MouseEvent, MutableRefObject, useRef } from "react";
import { breakPoints } from "src/commons/styles/responsiveBreakPoints";
import styled from "@emotion/styled";

import { navList } from "./data";

import CommonsHooksComponents from "../../hooks";
import _Link from "../../units/link";
import _PText from "../../units/text/p";

let ableMoveScroll = false; // 스크롤 이벤트 이동 가능 여부 (true일 경우만 실행)
let xDistance = 0; // 현재 스크롤 좌표
export default function LayoutNavPage() {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { getRouter } = CommonsHooksComponents();
  const router = getRouter();

  // 현재 선택중인 탭
  const selectTap = router.pathname.split("/").at(-1);

  // 버튼 클릭시 : 현재 위치 저장하기
  const startDrag = (event: MouseEvent<HTMLDivElement>) => {
    ableMoveScroll = true;
    xDistance = event.pageX;

    const body = document.getElementsByTagName("body")[0];
    if (body) {
      // 스크롤 이동시 width 값 늘이기
      body.addEventListener("mousemove", (event) => moveDrag(event));
      // 마우스를 뗀 순간 이벤트 종료하기
      body.addEventListener("click", EndDrag);
    }
  };

  // 0.1초 쓰로틀링 이벤트
  // let throttle: ReturnType<typeof setTimeout>;
  // 스크롤 이동시 : nav 페이지 위치 조절
  const moveDrag = (event: MouseEvent<HTMLDivElement>) => {
    if (ableMoveScroll && wrapperRef.current) {
      wrapperRef.current.style.width = `${event.pageX}px`;
    }
  };

  // 마우스 이벤트 종료 : 마우스에서 손가락을 뗐을 때
  const EndDrag = () => {
    ableMoveScroll = false;

    const body = document.getElementsByTagName("body")[0];
    if (body) {
      body.removeEventListener("mousemove", (event) => moveDrag(event));
      body.removeEventListener("click", EndDrag);
    }
  };

  return (
    <LayoutNavWrapper ref={wrapperRef}>
      <LayoutNavListWrapper>
        {navList
          .slice()
          .sort((a, b) => (a.name > b.name ? 1 : -1)) // 알파벳 순서로 정렬
          .map((el, key) => {
            const isSelect = selectTap === el.name.toLowerCase();

            return (
              <_Link
                key={`_layout_modules_list_${key}_`}
                href={
                  el.href
                    ? `/modules/${el.href}`
                    : `/modules/${el.name.toLowerCase()}`
                }
                Component={<_PText text={el.name} />}
                className={(isSelect && `_selectTap_`) || ""}
              />
            );
          })}
      </LayoutNavListWrapper>
      <ScrollControllWrapper
        id="nav_controller"
        onMouseDown={startDrag}
        // onMouseMove={moveDrag}
        // onClick={EndDrag}
        // onMouseLeave={EndDrag}
      >
        <ScorllBar>
          {Array.from(new Array(4), (_) => "·").map((_, key) => (
            <RowLine key={`_resize_line_${key + 1}_`} />
          ))}
        </ScorllBar>
      </ScrollControllWrapper>
    </LayoutNavWrapper>
  );
}

export const LayoutNavWrapper = styled.nav`
  width: 270px;
  border-right: solid 3px #aa5656;
  padding: 1rem;
  /* min-width: 200px; */
  display: flex;
  position: relative;
  overflow: hidden;

  :hover {
    #nav_controller {
      display: flex;
    }
  }

  @media ${breakPoints.mobile} {
    min-width: 100px;
  }
`;

export const LayoutNavListWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
  width: 100%;

  ._p_ {
    transition: all 0.25s ease-in;
    padding: 10px;
    border-radius: 10px;
    font-size: 1rem;

    :hover {
      background-color: #f5f5f5;
    }
  }

  ._selectTap_ {
    cursor: default !important;
    ._p_ {
      /* background-color: #20262e; */
      background-color: #473c33;
      color: white;
    }
  }
`;

export const ScrollControllWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 18px;
  height: 100%;
  background-color: #e8e2e2;
  display: none;
  align-items: center;
  cursor: ew-resize;

  :hover {
    div {
      background-color: gray;
    }
  }
`;

export const ScorllBar = styled.button`
  position: relative;
  width: 100%;
  height: 30px;
  cursor: ew-resize;
  display: flex;
  padding: 0px;
  align-items: center;
  justify-content: center;
  border: unset;
  gap: 0px 2px;
  user-select: none;
  pointer-events: none;

  p {
    margin: 0px;
    height: 8px;
  }
`;

export const RowLine = styled.div`
  height: 100%;
  width: 2px;
  background-color: black;
`;

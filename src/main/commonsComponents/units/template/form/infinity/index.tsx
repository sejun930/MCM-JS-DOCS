import styled from "@emotion/styled";
import { MutableRefObject, useEffect, useRef } from "react";

let lastHeight; // 가장 최하단 높이값 저장
let debouncing: ReturnType<typeof setTimeout>; // 디바운싱 적용
let loading = false; // 데이터 호출중

// 무한(infinity) 스크롤을 설정하는 페이지
export default function _InfinityScroll({
  children,
  moreLoad,
}: {
  children: JSX.Element;
  moreLoad: () => void; // 추가 데이터 호출 이벤트
}) {
  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  // 실시간 스크롤 체크
  const checkScroll = () => {
    if (loading) return;

    clearTimeout(debouncing);
    debouncing = setTimeout(() => {
      // 현재 스크롤 위치 구하기
      const scrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );

      // window의 크기 구하기
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // 최하단 위치 구하기
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      // 최하단에 도달할 경우 새로운 데이터 불러오기
      if (scrollTop + windowHeight + 300 >= documentHeight) {
        loading = true;
        moreLoad();

        window.setTimeout(() => {
          loading = false;
        }, 1000);
      }
    }, 20);
  };

  useEffect(() => {
    if (document) {
      document.addEventListener("scroll", checkScroll);
    }

    return () => {
      document.removeEventListener("scroll", checkScroll);
    };
  });

  return <Wrapper ref={_wrapperRef}>{children}</Wrapper>;
}

export const Wrapper = styled.div``;

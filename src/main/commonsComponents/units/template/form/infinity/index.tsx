import { useEffect } from "react";
import { getCurrentScroll } from "src/main/commonsComponents/functional";

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
  // 실시간 스크롤 체크
  const checkScroll = () => {
    if (loading) return;

    clearTimeout(debouncing);

    // 현재 스크롤 위치 구하기
    const scrollTop = getCurrentScroll();

    // window의 크기 구하기
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // 최하단 위치 구하기
    const documentHeight = getCurrentScroll();

    if (scrollTop + windowHeight + 100 >= documentHeight) {
      debouncing = setTimeout(() => {
        // 최하단에 도달할 경우 새로운 데이터 불러오기
        loading = true;
        moreLoad();

        // window.setTimeout(() => {
        loading = false;
        // }, 1000);
      }, 30);
    }
  };

  useEffect(() => {
    if (document) {
      document.addEventListener("scroll", checkScroll);
    }

    return () => {
      document.removeEventListener("scroll", checkScroll);
    };
  });

  return <>{children}</>;
}

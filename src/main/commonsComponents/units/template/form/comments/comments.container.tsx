import CommentsUIPage from "./comments.presenter";
import CommentsScriptPage from "./comments.script";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

// 현재 선택중인 카테고리 저장
let selectCategory = "";
// 디바운싱 적용
let debouncing: ReturnType<typeof setTimeout>;
export default function CommentsPage() {
  // 스크립트 호출하기
  const [loadScript, setLoadScript] = useState(false);
  // 페이지 최종 렌더하기
  const [render, setRender] = useState(false);

  const [module] = useRecoilState(moduleState);

  // 화면 끝에 도달했을 경우 렌더
  useEffect(() => {
    document.addEventListener("scroll", renderCommentsList);

    return () => {
      document.removeEventListener("scroll", renderCommentsList);
    };
  }, []);

  // 댓글 페이지 렌더하기
  const renderCommentsList = () => {
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

      if (scrollTop + windowHeight * 2 >= documentHeight) {
        // 스크립트 호출하기
        setLoadScript(true);
        clearTimeout(debouncing);

        document.removeEventListener("scroll", renderCommentsList);
      }
    }, 30);
  };

  // 카테고리 변경하기
  const changeCategory = (category: string) => {
    if (selectCategory === category) return;
    selectCategory = category;

    // 기존의 카테고리 클래스 제거
    const selectList = Array.from(
      document.getElementsByClassName("category-select-button")
    );
    if (selectList.length) {
      selectList.forEach((el) => el.classList.remove("category-select-button"));
    }

    // 선택한 카테고리 id 추가
    const target = document.getElementById(`category-${category || "all"}`);
    if (target) target.classList.add("category-select-button");
  };

  const toggleRender = (bool: boolean) => {
    setRender(bool);
  };

  return (
    <>
      {/* 스크립트 (댓글 리스트) 1차 호출 후 */}
      {loadScript && (
        <CommentsScriptPage
          loadScript={loadScript}
          module={module}
          changeCategory={changeCategory}
          toggleRender={toggleRender}
        />
      )}
      {/* 댓글 페이지 최종 렌더 */}
      <CommentsUIPage
        module={module}
        selectCategory={selectCategory}
        render={render}
      />
    </>
  );
}

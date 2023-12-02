// 스크롤 하단부에 도달할 경우에 댓글 페이지 호출
// (불필요한 api 요청 방지)

import { useState, useEffect } from "react";
import CommentsPage from "./comments.container";

import { Wrapper } from "../../../../../mainComponents";

// 디바운싱 적용
let debouncing: ReturnType<typeof setTimeout>;
export default function RenderCommentsPage() {
  const [render, setRender] = useState(false);

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
      const propsHeight = document.querySelector("#props-form");

      // 현재 스크롤 위치
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // 현재 뷰포트의 높이
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // 문서의 전체 높이
      const documentHeight = document.documentElement.scrollHeight;

      // 현재 스크롤의 위치가 화면 끝에 도달했는지 검증
      const isFinalScroll = scrollTop + windowHeight >= documentHeight;

      if (propsHeight) {
        // Props 페이지를 지났는지 체크
        if (propsHeight.getBoundingClientRect().bottom < 0 || isFinalScroll) {
          // 댓글 페이지 호출하기
          clearTimeout(debouncing);
          setRender(true);
          document.removeEventListener("scroll", renderCommentsList);
        }
      }
    }, 30);
  };

  // 1. 댓글에 필요한 스크립트` 우선 호출
  return (
    <Wrapper id="comments-form">
      {(render && <CommentsPage />) || <></>}
    </Wrapper>
  );
}

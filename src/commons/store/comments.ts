import { atom } from "recoil";
import { InfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

// 댓글 페이지 렌더 여부
export const renderState = atom({
  key: "render",
  default: false as boolean,
});

// 댓글 리스트
export const commentsListState = atom({
  key: "commentsList",
  default: [] as Array<InfoTypes>,
});

// 댓글 리스트 업데이트 함수
export const fetchCommentsListState = atom({
  key: "fetchCommentsList",
  default: (category?: string) => {},
});

// 카테고리 별 개수 리스트
export const countListState = atom({
  key: "countList",
  default: {},
});

// 현재 선택된 카테고리
export const selectCategoryState = atom({
  key: "selectCategory",
  default: "" as string,
});

// 카테고리 변경하기
export const changeCategoryState = atom({
  key: "changeCategory",
  default: (category: string) => {},
});

import { FieldValue } from "src/commons/libraries/firebase";
import { CommentsInfoTypes } from "../comments.types";

// 작성용 type
export type WriteInfoTypes = {
  [key: string]: string | number | Date | null | FieldValue | boolean;
} & CommentsInfoTypes & {
    createdAt: FieldValue | null;
    modifyAt: FieldValue | null;
    deletedAt: FieldValue | null;
  };

// 정보 저장하기
export const initInfo: WriteInfoTypes = {
  category: "all",
  password: "",
  contents: "",
  rating: 0,
  createdAt: null,
  modifyAt: null,
  deletedAt: null,
  bugStatus: 0,
  complateAnswer: false,
};

export type CategoryTypes = "all" | "bug" | "review" | "question";

// 카테고리 리스트 (카테고리 value - 카테고리 name)
export const categoryInitList: { [key: string]: string } = {
  all: "전체",
  bug: "버그 신고",
  question: "문의",
  review: "리뷰",
};

// 카테고리 배열화
export const categoryListArray = Object.entries(categoryInitList).map((el) => {
  const obj: { [key: string]: string } = {};
  obj[el[0]] = el[1];

  return obj;
});

// export const categoryInitList: Array<CategoryListType> = [
//   { name: "카테고리 선택", value: "", secondName: "전체" },
//   { name: "버그 신고", value: "bug" },
//   { name: "문의", value: "question" },
//   { name: "리뷰", value: "review" },
// ];

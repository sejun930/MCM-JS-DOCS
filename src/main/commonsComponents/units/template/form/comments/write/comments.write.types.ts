import { FieldValue } from "src/commons/libraries/firebase";

export interface InfoTypes {
  category: string;
  password: string;
  contents: string;
  rating: number;
  createdAt: FieldValue | null;
  modifyAt: FieldValue | null;
  deletedAt: FieldValue | null;
}

// 정보 저장하기
export const initInfo: InfoTypes = {
  category: "",
  password: "",
  contents: "",
  rating: 0,
  createdAt: null,
  modifyAt: null,
  deletedAt: null,
};

export type CategoryTypes = "" | "bug" | "review" | "question";
export interface CategoryListType {
  name: string;
  value: CategoryTypes;
}

// 카테고리 리스트
export const categoryInitList: Array<CategoryListType> = [
  { name: "카테고리 선택", value: "" },
  { name: "버그 신고", value: "bug" },
  { name: "문의", value: "question" },
  { name: "리뷰", value: "review" },
];

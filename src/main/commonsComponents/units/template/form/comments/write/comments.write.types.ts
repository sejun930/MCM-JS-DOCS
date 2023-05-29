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
  category: "",
  password: "",
  contents: "",
  rating: 0,
  createdAt: null,
  modifyAt: null,
  deletedAt: null,
  bugStatus: 0,
  complateAnswer: false,
};

export type CategoryTypes = "" | "bug" | "review" | "question";
export interface CategoryListType {
  name: string;
  value: CategoryTypes;
  secondName?: string;
}

// 카테고리 리스트
export const categoryInitList: Array<CategoryListType> = [
  { name: "카테고리 선택", value: "", secondName: "전체" },
  { name: "버그 신고", value: "bug" },
  { name: "문의", value: "question" },
  { name: "리뷰", value: "review" },
];

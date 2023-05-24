import { FieldValue } from "src/commons/libraries/firebase";

interface WriteCommonsTypes {
  category: string;
  password: string;
  contents: string;
  rating: number;
  bugStatus: number; // 버그 처리 여부 (0 : 대기중, 1 : 처리중, 2 : 처리 완료)
  complateAnswer: boolean; // 문의 답변 완료 (false : 대기중, true : 답변 완료)
}

// 작성용 type
export type WriteInfoTypes = {
  [key: string]: string | number | Date | null | FieldValue | boolean;
} & WriteCommonsTypes & {
    createdAt: FieldValue | null;
    modifyAt: FieldValue | null;
    deletedAt: FieldValue | null;
  };

// 날짜 관련 type
interface DateTypes {
  seconds: number;
  nanoseconds: number;
}

// 렌더용 type
export type InfoTypes = WriteCommonsTypes & {
  id: string;
  createdAt: DateTypes | null;
  modifyAt: DateTypes | null;
  deletedAt: DateTypes | null;
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

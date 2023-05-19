import { FieldValue } from "src/commons/libraries/firebase";

interface WriteCommonsTypes {
  category: string;
  password: string;
  contents: string;
  rating: number;
  isCompleteBug: boolean; // 버그가 수정되었는지에 대한 여부 (true : 수정 완료)
}

// 작성용 type
export type WriteInfoTypes = WriteCommonsTypes & {
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
  isCompleteBug: false,
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

export const categoryName: { [key: string]: string } = categoryInitList
  .filter((el) => el.value)
  .reduce((acc: { [key: string]: string }, cur) => {
    acc[cur.value] = cur.name;
    return acc;
  }, {});

import { FormEvent, MutableRefObject } from "react";

import { FieldValue } from "src/commons/libraries/firebase";
import { BlockInfoTypes, CommentsInfoTypes } from "../comments.types";
import { IsBlockTypes } from "src/commons/store/store.types";

// 작성용 type
export type WriteInfoTypes = {
  [key: string]: string | number | Date | null | FieldValue | boolean;
} & CommentsInfoTypes & {
    createdAt: FieldValue | null;
    modifyAt: FieldValue | null;
    deletedAt: FieldValue | null;
    answerCreatedAt: FieldValue | null;
  };

// 정보 저장하기
export const initInfo: WriteInfoTypes = {
  category: "all", // 댓글 카테고리
  password: "", // 비밀번호
  contents: "", // 댓글 내용
  rating: 0, // 평점 점수
  createdAt: null, // 작성 일자
  modifyAt: null, // 수정 일자
  deletedAt: null, // 삭제 일자
  bugStatus: 0, // 버그 현황 (0 : 확인 대기중, 1 : 수정 중, 2 : 해결 완료)
  answer: null, // 문의 답변
  answerCreatedAt: null, // 답변 일자
  ip: "", // 작성자 아이피
  agreeProvacy: false, // 개인정보 수집 여부
  bugLevel: 0, // 버그 중요도
};

export type CategoryTypes = "all" | "bug" | "review" | "question";

// 카테고리 리스트 (카테고리 value - 카테고리 name)
export const categoryInitList: { [key: string]: string } = {
  all: "전체",
  bug: "이슈",
  question: "문의",
  review: "리뷰",
};

// 카테고리 배열화
export const categoryListArray = Object.entries(categoryInitList).map((el) => {
  const obj: { [key: string]: string } = {};
  obj[el[0]] = el[1];

  return obj;
});

// props type
export interface IPropsTypes {
  categoryList: Array<{ [key: string]: string }>;
  changeInfo: (value: string | number | boolean) => (name: string) => void;
  input: WriteInfoTypes;
  write: (e?: FormEvent<Element>) => void;
  categoryRef: MutableRefObject<HTMLSelectElement>;
  contentsRef: MutableRefObject<HTMLTextAreaElement>;
  passwordRef: MutableRefObject<HTMLInputElement>;
  openPrivacy: boolean;
  checkWriteAble: () => {
    able: boolean;
    error: { message: string; type: string };
  };
  blockInfo: BlockInfoTypes;
  userIp: string;
}

import { CommentsInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { navList } from "src/main/commonsComponents/layout/nav/nav.data";
import { ChangeEvent } from "react";

export interface AdminCommentsInitType {
  selectModule: string;
  page: number;
  list: Array<CommentsInfoTypes>;
  count: { [key: string]: number };
  filterCount: { [key: string]: { [key: string]: number } };
  selectCategory: string;
}

export const adminCommentsInit: AdminCommentsInitType = {
  selectModule: navList[0].name || "", // 현재 선택된 모듈 이름
  page: 1, // 페이지 번호
  list: [], // 댓글 정보
  count: {}, // 댓글 개수 정보
  filterCount: {}, // 카테고리의 필터 리스트
  selectCategory: "all", // 선택한 카테고리
};

export interface AdminCommentsPropsType {
  info: AdminCommentsInitType;
  isLoading: boolean;
  changeSelectModule: (e: ChangeEvent<HTMLSelectElement>) => void;
  render: boolean;
  changeLoading: (bool: boolean) => void;
  fetchComments: (info: AdminCommentsInitType) => void;
  changeInfo: (info: AdminCommentsInitType, forcing?: boolean) => void;
}

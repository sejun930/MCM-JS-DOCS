import { InfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { navList } from "src/main/commonsComponents/layout/nav/nav.data";
import { ChangeEvent } from "react";

export interface AdminCommentsInitType {
  selectModule: string;
  page: number;
  commentsList: Array<InfoTypes>;
  countList: { [key: string]: number };
  countFilterList: { [key: string]: { [key: string]: number } };
  selectCategory: string;
  filter: {};
  isBlockUser: boolean;
}

export const adminCommentsInit: AdminCommentsInitType = {
  selectModule: navList[0].name || "", // 현재 선택된 모듈 이름
  page: 1, // 페이지 번호
  commentsList: [], // 댓글 정보
  countList: {}, // 댓글 개수 정보
  countFilterList: {}, // 카테고리의 필터 리스트
  selectCategory: "all", // 선택한 카테고리
  filter: {}, // 현재 필터 정보
  isBlockUser: false, // 차단 여부
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

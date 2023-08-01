import { InfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { navList } from "src/main/commonsComponents/layout/nav/nav.data";
import { ChangeEvent } from "react";

import { CommentsAllInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";

export type AdminCommentsInitType = CommentsAllInfoTypes & {
  selectModule: string;
};

// export interface AdminCommentsInitType {
//   selectModule: string;
//   commentsList: Array<InfoTypes>;
//   countList: { [key: string]: number };
//   countFilterList: { [key: string]: { [key: string]: number } };
//   selectCategory: string;
//   filter: {
//     allData: number;
//     page: number;
//     limit: number;
//     list: any;
//   };
//   isBlockUser: boolean;
// }

export const adminCommentsInit: AdminCommentsInitType = {
  selectModule: navList[0].name || "", // 현재 선택된 모듈 이름
  commentsList: [], // 댓글 정보
  countList: {}, // 댓글 개수 정보
  countFilterList: {}, // 카테고리의 필터 리스트
  selectCategory: "all", // 선택한 카테고리
  filter: {
    allData: 0, // 전체 댓글 수
    page: 1, // 페이지 번호
    limit: 20, // 렌더될 댓글 수
    list: {},
    startPage: 0,
  }, // 현재 필터 정보
  blockInfo: { isBlock: false },
  userIp: "",
};

export interface AdminCommentsPropsType {
  info: AdminCommentsInitType;
  isLoading: boolean;
  changeSelectModule: (e: ChangeEvent<HTMLSelectElement>) => void;
  render: boolean;
  changeLoading: (bool: boolean) => void;
  fetchComments: (info?: AdminCommentsInitType) => void;
  changeInfo: (info: AdminCommentsInitType, forcing?: boolean) => void;
  toggleSettings: (bool: boolean) => () => void;
  oepnSettings: boolean;
  checkLoading: () => boolean;
  changePage: (page: number, isInfinite?: boolean) => void;
}

export interface FunctionPropsTypes {
  module: string;
  changeLoading: (bool: boolean) => void;
  info: AdminCommentsInitType;
  fetchComments: (info?: AdminCommentsInitType) => void;
  checkLoading: () => boolean;
}

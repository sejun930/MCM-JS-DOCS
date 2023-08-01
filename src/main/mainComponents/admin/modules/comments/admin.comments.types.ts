import { ChangeEvent } from "react";
import { CommentsAllInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";

export type AdminCommentsInitType = CommentsAllInfoTypes & {
  selectModule: string;
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

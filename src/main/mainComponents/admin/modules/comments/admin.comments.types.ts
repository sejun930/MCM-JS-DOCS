import { ChangeEvent } from "react";
import { AdminLoginTypes } from "src/commons/store/store.types";
import { CommentsAllInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";

export type FetchCommentsTypes = {
  fetchComments: ({
    info,
    isInfinite,
    alertMsg,
    moveTop,
  }: {
    info?: CommentsAllInfoTypes;
    isInfinite?: boolean;
    alertMsg?: string;
    moveTop?: boolean;
  }) => Promise<void>;
};

export type AdminCommentsPropsType = {
  info: CommentsAllInfoTypes;
  isLoading: boolean;
  changeSelectModule: (e: ChangeEvent<HTMLSelectElement>) => void;
  changeLoading: (bool: boolean) => void;
  toggleSettings: (bool: boolean) => () => void;
  oepnSettings: boolean;
  checkLoading: () => Promise<boolean>;
  changePage: (page: number, isInfinite?: boolean) => void;
  changeFilterComments: (info: CommentsAllInfoTypes) => void;
  adminLoginInfo: AdminLoginTypes;
} & FetchCommentsTypes;

export type FunctionPropsTypes = {
  module: string;
  changeLoading: (bool: boolean) => void;
  info: CommentsAllInfoTypes;
  checkLoading: () => Promise<boolean>;
} & FetchCommentsTypes;

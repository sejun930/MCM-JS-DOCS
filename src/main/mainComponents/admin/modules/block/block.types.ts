import { IsBlockTypes } from "src/commons/store/store.types";

export type BlockInfoType = IsBlockTypes & {
  id: string;
  inputId: string;
  checked: boolean;
};

export type FilterType = { [key: string]: number | boolean | string } & {
  page: number; // 현재 페이지 번호
  limit: number; // 각 페이지 별로 보여질 데이터 수
  allData: number; // 전체 데이터 개수
  showOnlyBlock: boolean; // 차단된 유저만 보일 건지?
  past: boolean; // 과거순으로 보일 건지?
};

export const filterInit: FilterType = {
  page: 1,
  limit: 10,
  allData: 0,
  showOnlyBlock: false,
  past: false,
};

export interface IProps {
  filter: FilterType;
  blockList: Array<BlockInfoType>;
  showFilter: boolean;
  toggleShowFilter: (bool?: boolean) => void;
  fetchFilter: (category: string) => void;
  checkBlockInfo: (idx: number) => void;
  getFilterOn: () => boolean;
  cancelBlock: () => void;
  changePage: (page: number) => void;
  isLoading: boolean;
  render: boolean;
}

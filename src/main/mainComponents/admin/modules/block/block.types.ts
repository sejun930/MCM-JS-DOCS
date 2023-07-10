import { IsBlockTypes } from "src/commons/store/store.types";

export type BlockInfoType = IsBlockTypes & {
  id: string;
  inputId: string;
  checked: boolean;
};

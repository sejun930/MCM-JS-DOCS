import { modalTreeList } from "src/main/mainComponents/modules/modal/tree/modal.tree";

export interface TreeModuleListTypes {
  tag: string;
  class: string;
  depth: number;
}

export const treeModuleList: { [key: string]: Array<TreeModuleListTypes> } = {
  Modal: modalTreeList,
};

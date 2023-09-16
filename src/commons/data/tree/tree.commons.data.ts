import { modalTreeList } from "src/main/mainComponents/modules/modal/tree/modal.tree";
import { tooltipTreeList } from "src/main/mainComponents/modules/tooltip/tree/tooltip.tree";
import { sliderTreeList } from "src/main/mainComponents/modules/slider/tree/slider.tree";
import { alertTreeList } from "src/main/mainComponents/modules/alert/tree/alert.tree";

export interface TreeModuleListTypes {
  tag: string; // 태그 타입
  class: string; // 클래스 네임
  depth: number; // 태그의 깊이 (높을 수록 안쪽에 배치 됨)
  role: string; // 해당 태그의 역할 및 부가설명
}

export const treeModuleList: { [key: string]: Array<TreeModuleListTypes> } = {
  Modal: modalTreeList,
  Tooltip: tooltipTreeList,
  Slider: sliderTreeList,
  Alert: alertTreeList,
};

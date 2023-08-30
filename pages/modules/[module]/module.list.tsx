import MyModal from "src/main/mainComponents/modules/modal";
import MyTooltip from "src/main/mainComponents/modules/tooltip";

// 모듈 컴포넌트 모음
export const ModuleComponentsList: { [key: string]: JSX.Element } = {
  Modal: <MyModal />,
  Tooltip: <MyTooltip />,
};

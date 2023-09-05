// import { ModalType } from "mcm-js-dev/dist/components/modules/modal/component/modal.types";
// import { SliderType } from "mcm-js-dev/dist/components/modules/slider/components/slider.types";
// import { TooltipType } from "mcm-js-dev/dist/components/modules/tooltip/component/tooltip.types";

import classList from "mcm-js-dev/dist/commons/class";

// 개발 및 배포 환경의 라이브러리 호출하기
// const getLibraries = () => {
//   // 전체 모듈 가져오기
//   const getAllLibraries = require(`mcm-js${
//     (process.env.NODE_ENV === "development" && "-dev") || ""
//   }`);
//   delete getAllLibraries.__esModule;

//   type ModuleTypes = {
//     Modal: ModalType;
//     Tooltip: TooltipType;
//     Slider: SliderType;
//   };

//   return getAllLibraries as ModuleTypes;
// };

// 개발 및 배포 환경의 classList 호출하기
const getClassList = () => {
  const getClassList = require(`mcm-js${
    (process.env.NODE_ENV === "development" && "-dev") || ""
  }/dist/commons/class`);
  delete getClassList.__esModule;

  return getClassList as typeof classList;
};

export {
  // getLibraries,
  getClassList,
};

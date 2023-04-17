import { PropsModuleListType } from "src/commons/data/props/props.commons.data";

export const modalPropsList: Array<PropsModuleListType> = [
  {
    name: "show",
    default: false,
    type: "Boolean",
    notice: "모달의 오픈 여부를 결정합니다. true가 전달되면 모달이 실행됩니다.",
    isRequired: true,
  },
  {
    name: "onCloseModal",
    default: "-",
    type: "Function",
    notice: "모달을 종료할 때 실행하는 이벤트입니다.",
    isRequired: true,
  },
  {
    name: "modalSize",
    default: "{}",
    type: "Object",
    notice: "모달창의 크기(width, height)를 직접 지정할 수 있습니다.",
  },
  {
    name: "mobileModalSize",
    default: "{}",
    type: "Object",
    notice:
      "모바일 환경에서의 모달창의 크기(width, height)를 직접 지정할 수 있습니다.",
  },
  {
    name: "showBGAnimation",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 모달창 실행/종료 시, 배경 애니메이션을 적용할 수 있습니다.",
  },
  {
    name: "showModalOpenAnimation",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 모달창 실행/종료 시, 모달 애니메이션을 적용할 수 있습니다.",
  },
  {
    name: "hideCloseButton",
    default: "false",
    type: "Boolean",
    notice: "true를 전달하면 모달 닫기 버튼을 숨길 수 있습니다.",
  },
  {
    name: "closeMent",
    default: "-",
    type: "String",
    notice: "닫기에 대한 부가설명 멘트를 작성할 수 있습니다.",
  },
  {
    name: "closeButtonInfo",
    default: "{}",
    type: "Object",
    notice: "닫기 버튼에 대한 넓이, 높이, 굵기를 직접 설정합니다.",
  },
  {
    name: "offAutoClose",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 모달창 외부를 클릭해도 닫기 이벤트가 실행되지 않습니다.",
  },
];

import { PropsModuleListType } from "src/commons/data/props/props.commons.data";

export const modalPropsList: Array<PropsModuleListType> = [
  {
    name: "children",
    default: '""',
    type: "String | Node",
    notice:
      "모달에 출력되는 내용을 나타냅니다. <br />Modal.open을 사용하는 경우에는 children Props를 전달해줘야 합니다.",
    isRequired: true,
  },
  {
    name: "show",
    default: false,
    type: "Boolean",
    notice: `모달의 오픈 여부를 결정합니다. true가 전달되면 모달이 실행됩니다. <br />
      Modal.open을 사용하는 경우에는 자동으로 적용됩니다.`,
    isRequired: true,
  },
  {
    name: "onCloseModal",
    default: "() => {}",
    type: "Function",
    notice:
      "모달을 종료할 때 실행하는 이벤트입니다. <br /> Modal.open을 사용하는 경우에는 자동으로 적용됩니다.",
    isRequired: true,
  },
  {
    name: "id",
    default: '""',
    type: "String",
    notice: "모달의 id 선택자 값을 지정합니다. id는 wrapper 태그에 적용됩니다.",
  },
  {
    name: "className",
    default: '""',
    type: "String",
    notice:
      "모달의 class 선택자 값을 지정합니다. className은 wrapper 태그에 적용됩니다.",
  },
  {
    name: "name",
    default: '""',
    type: "String",
    notice:
      "모달의 name 속성 값을 지정합니다. 지정된 name값은 wrapper 태그에 data-name 속성으로 적용됩니다.",
  },
  {
    name: "modalSize",
    default: '{ width : "", height : "" }',
    type: "Object",
    notice: "모달창의 크기(width, height)를 직접 지정할 수 있습니다.",
  },
  {
    name: "mobileModalSize",
    default: '{ width : "", height : "" }',
    type: "Object",
    notice:
      "모바일 환경에서의 모달창의 크기(width, height)를 직접 지정할 수 있습니다.",
  },
  {
    name: "modalStyles",
    default: "{ wrapper : {} .. }",
    type: "Object",
    notice:
      "모달의 각각의 태그(wrapper, items, closeButton, contents)별로 스타일을 직접 적용할 수 있습니다.",
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
    default: '""',
    type: "String",
    notice: "닫기에 대한 부가설명 멘트를 작성할 수 있습니다.",
  },
  {
    name: "closeButtonInfo",
    default: '{ buttonSize : 0, buttonWeight : 0, buttonColor : "black" }',
    type: "Object",
    notice:
      "닫기 버튼에 대한 넓이, 높이(buttonSize), 굵기(buttonWeight), 색상(buttonColor)을 직접 설정합니다.",
  },
  {
    name: "offAutoClose",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 모달창 외부를 클릭해도 닫기 이벤트가 실행되지 않습니다.",
  },
  {
    name: "onAfterCloseEvent",
    default: "() => {}",
    type: "Function",
    notice: "모달이 종료되는 시점 후에 실행될 이벤트입니다.",
  },
  {
    name: "onFixWindow",
    default: "false",
    type: "Boolean",
    notice: "모달이 실행될 때 화면 스크롤 이동을 방지할 수 있습니다.",
  },
];

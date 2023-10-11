import { PropsModuleListType } from "src/main/commonsComponents/units/template/form/props/props.types";
import { modalPropsCommonsCode } from "./modal.props.commns.code";

export const modalPropsList: (vers: number) => Array<PropsModuleListType> = (
  vers: number
) => [
  {
    name: "children",
    default: '""',
    type: "String | Node",
    notice:
      "Modal에 출력되는 문자열 또는 컴포넌트를 출력합니다. <br /><b>Modal.open</b>을 사용하는 경우에는 반드시 children Props를 이용해서 전달해야 합니다.",
    isRequired: true,
    code: { type: "string" },
  },
  {
    name: "show",
    default: false,
    type: "Boolean",
    notice: `Modal의 실행 여부를 결정하며, true가 전달되면 Modal이 실행됩니다. <br />
      <b>Modal.open</b>을 사용하는 경우에는 자동으로 적용됩니다.`,
    isRequired: true,
    code: {
      type: "bool",
    },
  },
  {
    name: "onCloseModal",
    default: "() => {}",
    type: "Function",
    notice:
      "Modal을 종료할 때 실행하는 이벤트입니다. <br /> <b>Modal.open</b>을 사용하는 경우에는 자동으로 적용됩니다.",
    isRequired: true,
    code: {
      type: "function",
    },
  },
  {
    name: "name",
    default: '""',
    type: "String",
    notice:
      "Modal의 name 속성 값을 지정합니다. <br />지정된 name값은 wrapper 태그에 <b>data-name</b> 속성으로 적용됩니다.",
    code: {
      type: "string",
    },
  },
  {
    name: "modalSize",
    default: '{ width : "", height : "" }',
    type: "Object",
    notice:
      "웹, 모바일 환경의 Modal 크기<b>(width, height)</b>를 직접 지정할 수 있습니다. <br />modalStyles와 함께 사용되면 modalSize가 우선순위를 가집니다.",
    code: {
      type: "obj",
      argu: modalPropsCommonsCode.size,
    },
  },
  {
    name: "mobileModalSize",
    default: '{ width : "", height : "" }',
    type: "Object",
    notice:
      "모바일 환경<b>(767px 이하)</b>에서의 Modal의 크기<b>(width, height)</b>를 직접 지정할 수 있습니다. <br /> mobileModalStyles와 함께 사용되면 mobileModalSize 우선순위를 가집니다.",
    code: {
      type: "obj",
      argu: modalPropsCommonsCode.size,
    },
  },
  {
    name: "modalStyles",
    default: "{ wrapper : {}, itmes : {}, closeButton : {}, contents : {} }",
    type: "Object",
    notice:
      "Modal의 각각의 태그<b>(wrapper, items, closeButton, contents)</b>들의 스타일을 직접 적용할 수 있습니다. <br />설정된 스타일은 웹과 모바일 환경에 동일하게 적용됩니다.",
    code: {
      type: "obj",
      argu: modalPropsCommonsCode.styles(Boolean(vers)),
    },
  },
  {
    name: "mobileModalStyles",
    default: "{ wrapper : {}, itmes : {}, closeButton : {}, contents : {} }",
    type: "Object",
    notice:
      "모바일 환경<b>(767px 이하)</b>내에 Modal의 각각의 태그<b>(wrapper, items, closeButton, contents)</b>들의 스타일을 직접 적용할 수 있습니다.",
    code: {
      type: "obj",
      argu: modalPropsCommonsCode.styles(Boolean(vers)),
    },
  },
  {
    name: "showBGAnimation",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 Modal 실행/종료 시, <b>배경 애니메이션</b>을 적용할 수 있습니다.",
    code: {
      type: "bool",
    },
  },
  {
    name: "showModalOpenAnimation",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 Modal 실행/종료 시, <b>실행/종료 애니메이션</b>을 적용할 수 있습니다.",
    code: {
      type: "bool",
    },
  },
  {
    name: "hideCloseButton",
    default: "false",
    type: "Boolean",
    notice: "true를 전달하면 Modal 닫기 버튼을 숨길 수 있습니다.",
    code: {
      type: "bool",
    },
  },
  {
    name: "closeMent",
    default: '""',
    type: "String",
    notice:
      "문자열을 전달하면 닫기에 대한 <b>부가설명</b>을 추가할 수 있습니다.",
    code: {
      type: "string",
    },
  },
  {
    name: "closeButtonInfo",
    default: '{ buttonSize : 0, buttonWeight : 0, buttonColor : "black" }',
    type: "Object",
    notice: `닫기 버튼의 스타일을 직접 설정할 수 있습니다. <br /> <br />
      <ul class="ul-wrapper">
        <li><b class="bold">buttonSize</b> : 버튼의 크기를 설정합니다.</li>
        <li><b class="bold">buttonWeight</b> : 버튼의 굵기를 설정합니다.</li>
        <li><b class="bold">buttonColor</b> : 버튼의 색상을 설정합니다.</li>
      </ul>
    `,
    code: {
      type: "obj",
      argu: modalPropsCommonsCode.closeBtn,
    },
  },
  {
    name: "offAutoClose",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 Modal <b>외부를 클릭</b>해도 닫기 이벤트가 실행되지 않습니다.",
    code: {
      type: "bool",
    },
  },
  {
    name: "onAfterCloseEvent",
    default: "() => {}",
    type: "Function",
    notice:
      "Modal이 종료되는 시점 후<b>(onCloseModal 함수 실행 후) 실행</b>될 이벤트입니다.",
    code: {
      type: "function",
    },
  },
  {
    name: "autoCloseTimer",
    default: "0",
    type: "Number",
    notice:
      "설정한 시간(Millisecond : 1/1000)이 지나면 Modal을 <b>자동으로 종료</b>시킬 수 있습니다. <br /> 예를 들어, 1초 후에 Modal을 종료하고 싶다면 1초의 Millisecond인 1000을 전달합니다. <br />1초(=1000) 미만의 숫자를 기입하면 실행되지 않습니다.",
    code: {
      type: "number",
    },
  },
  {
    name: "onFixWindow",
    default: "false",
    type: "Boolean",
    notice:
      "Modal이 실행될 때 화면 <b>스크롤 이동을 방지</b>할 수 있습니다. <br /> 설정된 Modal이 실행만 되어 있다면 전체 Modal에도 동일하게 적용됩니다.",
    code: {
      type: "bool",
    },
  },
];

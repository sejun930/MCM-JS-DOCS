import { getCommonsHighlight } from "src/commons/highlight";
import { PropsModuleListType } from "src/main/commonsComponents/units/template/form/props/props.types";

const tooltipStylesCode = [
  { key: "backgroundColor", value: getCommonsHighlight.string("") },
  { key: "padding", value: getCommonsHighlight.string("") },
  {
    key: "font",
    value: getCommonsHighlight.curly({
      children: "",
      className: "deepPurple",
    }),
  },
  {
    key: "border",
    value: getCommonsHighlight.curly({
      children: "",
      className: "deepPurple",
    }),
  },
];

export const tooltipPropsList: Array<PropsModuleListType> = [
  {
    name: "children",
    default: '""',
    type: "String | Node",
    notice:
      "Tooltip 메세지를 적용시킬 <b>문자열 또는 컴포넌트</b>를 적용합니다. <br />적용된 대상에 마우스를 올리거나 터치하면 Tooltip 메세지를 출력할 수 있습니다.",
    isRequired: true,
    code: {
      type: "string",
    },
  },
  {
    name: "tooltipText",
    default: '""',
    type: "String | Node",
    notice: `Tooltip 메세지를 출력시킬 <b>문자열 또는 컴포넌트</b>를 전달합니다.`,
    isRequired: true,
    code: {
      type: "string",
    },
  },
  {
    name: "useShowAnimation",
    default: false,
    type: "Boolean",
    notice: `애니메이션 적용 여부를 결정합니다. <br /> true를 전달하면 Tooltip 실행 및 종료시 <b>애니메이션 효과</b>가 부여됩니다.`,
    code: {
      type: "bool",
    },
  },
  {
    name: "position",
    default: '"top"',
    type: "String",
    notice:
      'Tooltip이 실행되는 방향을 지정합니다. <br /><b>"top", "bottom", "left", "right"</b>를 전달해 원하는 방향을 지정할 수 있습니다.',
    code: {
      type: "string",
      argu: "top",
    },
  },
  {
    name: "tooltipStyles",
    default: '{ backgroundColor : "", padding : "", font : {}, border : {} }',
    type: "Object",
    notice: `Tooltip 메세지의 스타일을 직접 지정할 수 있습니다. <br /><br />
      <ul class="ul-wrapper">
        <li><b class="bold">backgroundColor</b> : Tooltip의 배경색을 설정합니다.</li>
        <li><b class="bold">padding</b> : Tooltip의 padding 스타일을 설정합니다.</li>
        <li><b class="bold">font</b> : Tooltip 메세지의 스타일을 설정합니다.</li>
        <li><b class="bold">border</b> : Tooltip 테두리의 스타일을 설정합니다.</li>
      </ul>
    `,
    code: {
      type: "obj",
      argu: tooltipStylesCode,
    },
  },
  {
    name: "tooltipMobileStyles",
    default: '{ backgroundColor : "", padding : "", font : {}, border : {} }',
    type: "Object",
    notice: `모바일 환경<b>(767px 이하)</b>부터 적용되는 Tooltip 메세지의 스타일을 직접 지정할 수 있습니다. <br /> <b>"tooltipStyles"</b> props와 동일한 데이터 타입을 가집니다.`,
    code: {
      type: "obj",
      argu: tooltipStylesCode,
    },
  },
  {
    name: "isDisable",
    default: false,
    type: "Boolean",
    notice:
      "Tooltip의 활성화/비활성화 여부를 결정합니다. <br />true를 전달하면 비활성화가 적용되며, 비활성화된 Tooltip은 <b>작동하지 않습니다.</b>",
    code: {
      type: "bool",
    },
  },
  {
    name: "open",
    default: false,
    type: "Boolean",
    notice: `Tooltip의 오픈/종료 여부를 결정합니다. <br />true를 전달하면 <b>수동</b>으로 Tooltip을 <b>실행</b>할 수 있습니다. <br /><b>"isDisable"</b>가 true를 전달할 경우 실행되지 않습니다`,
    code: {
      type: "bool",
    },
  },
  {
    name: "onOpenAfterEvent",
    default: "( ) => { }",
    type: "Function",
    notice:
      "Tooltip이 <b>실행된 이후</b>에 <b>실행할 함수</b>를 전달할 수 있습니다.",
    code: {
      type: "function",
    },
  },
  {
    name: "onCloseAfterEvent",
    default: "( ) => { }",
    type: "Function",
    notice:
      'Tooltip이 <b>종료된 이후</b>에 <b>실행할 함수</b>를 전달할 수 있습니다. <br /><b>"open"</b> props를 사용할 때 함께 사용하는 것을 권장합니다.',
    code: {
      type: "function",
    },
  },
  {
    name: "offHoverEvent",
    default: false,
    type: "Boolean",
    notice:
      'true를 전달하면 Tooltip을 실행하거나 종료하는 <b>Hover 이벤트를 비활성화</b>합니다. <br /><b>"open"</b> props를 함께 사용하여 Tooltip을 실행하거나 종료할 수 있습니다.',
    code: {
      type: "bool",
    },
  },
  {
    name: "isFix",
    default: false,
    type: "Boolean",
    notice:
      'true를 전달하면 <b>종료되지 않는 Tooltip</b>을 나타낼 수 있습니다. <br /><b>"open"</b> props를 함께 사용하면 고정된 Tooltip을 표현할 수 있습니다.',
    code: {
      type: "bool",
    },
  },
  {
    name: "hideMobile",
    default: false,
    type: "Boolean",
    notice:
      "true를 전달하면 모바일 환경<b>(767px 이하)</b>에서는 Tooltip을 숨길 수 있습니다.",
    code: {
      type: "bool",
    },
  },
];

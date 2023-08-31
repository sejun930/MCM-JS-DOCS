import { propsCommonsCodeList } from "src/commons/data/props/props.commons.code";
import { PropsModuleListType } from "src/commons/data/props/props.commons.data";
import { getCommonsHighlight } from "src/commons/highlight";

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
    notice: "툴팁 메세지가 출력되는 Hover 이벤트가 적용될 대상입니다.",
    isRequired: true,
    code: propsCommonsCodeList("children").string(""),
  },
  {
    name: "tooltipText",
    default: '""',
    type: "String | Node",
    notice: `툴팁이 실행될 때 노출될 메세지 입니다.`,
    isRequired: true,
    code: propsCommonsCodeList("tooltipText").string(""),
  },
  {
    name: "useShowAnimation",
    default: false,
    type: "Boolean",
    notice: `애니메이션 적용 여부를 결정합니다. <br /> true를 전달하면 툴팁 실행 및 종료시 애니메이션 효과가 부여됩니다.`,
    code: propsCommonsCodeList("useShowAnimation").bool,
  },
  {
    name: "position",
    default: '"top"',
    type: "String",
    notice:
      '툴팁이 실행되는 방향을 지정합니다. <br /><b>"top", "bottom", "left", "right"</b>를 전달해 원하는 방향을 지정할 수 있습니다.',
    code: propsCommonsCodeList("position").string("top"),
  },
  {
    name: "tooltipStyles",
    default: '{ backgroundColor : "", padding : "", font : {}, border : {} }',
    type: "Object",
    notice:
      '툴팁 메세지의 스타일을 직접 지정할 수 있습니다. <br /> <b>"backgroundColor"</b>로 툴팁의 배경색을, <b>"padding"</b>로 툴팁의 크기를 조정할 수 있고 <br /><b>"border"</b>로 툴팁의 테두리 스타일을, <b>"font"</b>로 툴팁 메세지의 스타일을 지정할 수 있습니다.',
    code: propsCommonsCodeList("tooltipStyles").obj(tooltipStylesCode),
  },
  {
    name: "tooltipMobileStyles",
    default: '{ backgroundColor : "", padding : "", font : {}, border : {} }',
    type: "Object",
    notice:
      '모바일 환경(767px 이하)부터 적용되는 툴팁 메세지의 스타일을 직접 지정할 수 있습니다. <br /> "tooltipStyles" props와 동일한 데이터를 전달합니다.',
    code: propsCommonsCodeList("tooltipMobileStyles").obj(tooltipStylesCode),
  },
  {
    name: "isDisable",
    default: false,
    type: "Boolean",
    notice:
      "툴팁의 활성화/비활성화 여부를 결정합니다. <br />true를 전달하면 비활성화가 적용되며, 비활성화된 툴팁은 작동하지 않습니다.",
    code: propsCommonsCodeList("isDisable").bool,
  },
  {
    name: "open",
    default: false,
    type: "Boolean",
    notice:
      '툴팁의 오픈/종료 여부를 결정합니다. <br />true를 전달하면 수동으로 툴팁을 실행할 수 있습니다. <br /><b>"isDisable"</b> props가 true를 전달할 경우 실행되지 않습니다.',
    code: propsCommonsCodeList("open").bool,
  },
  {
    name: "onOpenAfterEvent",
    default: "() => {}",
    type: "Function",
    notice: "툴팁이 <b>실행</b>된 이후에 실행할 함수를 전달할 수 있습니다.",
    code: propsCommonsCodeList("onOpenAfterEvent").function,
  },
  {
    name: "onCloseAfterEvent",
    default: "() => {}",
    type: "Function",
    notice:
      '툴팁이 <b>종료</b>된 이후에 실행할 함수를 전달할 수 있습니다. <br /><b>"open"</b> props를 사용할 때 함께 사용하는 것을 권장합니다.',
    code: propsCommonsCodeList("onCloseAfterEvent").function,
  },
  {
    name: "offHoverEvent",
    default: false,
    type: "Boolean",
    notice:
      'true를 전달하면 툴팁을 실행하거나 종료하는 Hover 이벤트를 비활성화합니다. <br /><b>"open"</b> props를 함께 사용하여 툴팁을 실행하거나 종료할 수 있습니다.',
    code: propsCommonsCodeList("offHoverEvent").bool,
  },
  {
    name: "isFix",
    default: false,
    type: "Boolean",
    notice:
      'true를 전달하면 종료되지 않는 툴팁을 나타낼 수 있습니다. <br /><b>"open"</b> props를 함께 사용하면 고정된 툴팁을 표현할 수 있습니다.',
    code: propsCommonsCodeList("isFix").bool,
  },
  {
    name: "hideMobile",
    default: false,
    type: "Boolean",
    notice: "true를 전달하면 모바일(767px 이하)에서는 툴팁을 숨길 수 있습니다.",
    code: propsCommonsCodeList("hideMobile").bool,
  },
];

import { getCommonsHighlight } from "src/commons/highlight";
import { PropsModuleListType } from "src/main/commonsComponents/units/template/form/props/props.types";

export const sliderPropsList: Array<PropsModuleListType> = [
  {
    name: "children",
    default: "[]",
    type: "[Node]",
    notice:
      "슬라이더에 적용할 나열되는 컴포넌트들을 나타냅니다. <br />children props에 직접 전달할 경우에는 반드시 배열에 담아야 합니다.",
    isRequired: true,
    code: {
      type: "array",
    },
  },
  {
    name: "useAnimation",
    default: "false",
    type: "Boolean",
    notice: "true를 전달하면 페이지 전환시 애니메이션 효과를 적용합니다.",
    code: {
      type: "bool",
    },
  },
  {
    name: "pagination",
    default: "{ showPageList : false }",
    type: "Object",
    notice:
      "나열되어 있는 컴포넌트의 개수만큼 페이지의 개수를 리스트 형태로 출력합니다. <br />출력된 리스트내의 페이지를 클릭해서 페이지를 전환할 수 있습니다.",
    code: {
      type: "obj",
      argu: [
        {
          key: "showPageList",
          value: getCommonsHighlight.colors("false").bool,
        },
      ],
    },
  },
  {
    name: "hideArrow",
    default: "false",
    type: "Boolean",
    notice: "true를 전달하면 페이지 다음/이전 버튼을 숨길 수 있습니다.",
    code: {
      type: "bool",
    },
  },
  {
    name: "useAutoPlay",
    default: "{ delay: 3000, showTimer: false }",
    type: "Object",
    notice:
      "슬라이더의 페이지를 일정시간<b>(1/1000ms)</b> 마다 자동으로 다음 페이지로 전환합니다. <br />delay로 자동으로 전환되는 시간을 조정할 수 있으며, 최소 3000ms(3초)부터 적용됩니다. <br />showTimer를 적용하면 현재 타이머의 진행도를 출력할 수 있습니다.",
    code: {
      type: "obj",
      argu: [
        { key: "delay", value: getCommonsHighlight.colors("3000").number },
        { key: "showTimer", value: getCommonsHighlight.colors("false").bool },
      ],
    },
  },
  {
    name: "useSwipeMode",
    default: "{ sideMovePercent : 10~90 }",
    type: "Object",
    notice:
      "스와이프 기능을 사용할 수 있습니다. <br />sideMovePercent에 정해진 퍼센트에 따라 해당 퍼센트 영역에 도달하면 이전 및 다음 페이지로 전환됩니다. (sideMovePercent에는 <b>최소 10, 최대 90</b>까지 지정할 수 있습니다.)",
    code: {
      type: "obj",
      argu: [
        {
          key: "sideMovePercent",
          value: getCommonsHighlight.colors("50").number,
        },
      ],
    },
  },
  {
    name: "firstPage",
    default: "1",
    type: "Number",
    notice:
      "제일 먼저 노출시킬 페이지의 번호를 입력하면 해당 페이지를 먼저 노출할 수 있습니다. <br />페이지의 번호는 앞에서부터 1번부터 컴포넌트의 개수까지 입력이 가능합니다.",
    code: {
      type: "number",
      argu: "1",
    },
  },
  {
    name: "listMinHeight",
    default: `{ web : "0px", mobile : "0px" }`,
    type: "Object",
    notice:
      "슬라이더의 web<b>(768px 이상)</b>, mobile<b>(767px 이하)</b> 환경의 최소 높이를 지정할 수 있습니다.",
    code: {
      type: "obj",
      argu: [
        { key: "web", value: getCommonsHighlight.string("0px") },
        { key: "mobile", value: getCommonsHighlight.string("0px") },
      ],
    },
  },
];

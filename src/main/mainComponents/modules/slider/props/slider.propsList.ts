import { getCommonsHighlight } from "src/commons/highlight";
import { PropsModuleListType } from "src/main/commonsComponents/units/template/form/props/props.types";

export const sliderPropsList: Array<PropsModuleListType> = [
  {
    name: "children",
    default: "[ ]",
    type: "[Node]",
    notice:
      "Slider에 적용할 나열되는 컴포넌트들을 나타냅니다. <br />children props에 직접 데이터를 전달한다면 반드시 <b>배열</b>에 담아야 합니다.",
    isRequired: true,
    code: {
      type: "array",
    },
  },
  {
    name: "useAnimation",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 페이지 전환시 <b>애니메이션 효과</b>를 적용합니다.",
    code: {
      type: "bool",
    },
  },
  {
    name: "pagination",
    default: "{ showPageList : false, hideMobile : false }",
    type: "Object",
    notice: `나열되어 있는 컴포넌트의 개수만큼 <b>페이지의 개수</b>를 리스트 형태로 출력합니다. <br />출력된 리스트내의 페이지를 클릭해서 페이지를 전환할 수 있습니다.
      <br /><br />
      <ul class="ul-wrapper">
        <li><b class="bold">showPageList</b> : 페이지의 개수 노출 여부를 결정합니다. true를 전달하면 페이지 리스트가 노출됩니다.</li>
        <li><b class="bold">hideMobile</b> : true를 전달하면 모바일 환경<b>(767px 이하)</b>에서는 페이지를 숨깁니다.</li>
      </ul>
      `,
    code: {
      type: "obj",
      argu: [
        {
          key: "showPageList",
          value: getCommonsHighlight.colors("false").bool,
        },
        {
          key: "hideMobile",
          value: getCommonsHighlight.colors("false").bool,
        },
      ],
    },
  },
  {
    name: "setArrow",
    default: `{ hide : false, showHover : false, hideMobile : false, contents : "◀" }`,
    type: "Object",
    notice: `좌, 우로 이동할 수 있는 버튼에 대한 여러 기능을 제어할 수 있습니다 <br /><br />
        <ul class="ul-wrapper">
          <li><b class="bold">hide</b> : true를 전달하면 좌, 우 버튼을 사용하지 않고 숨깁니다.</li>
          <li><b class="bold">showHover</b> : true를 전달하면 Slider에 <b>마우스를 올릴 때</b>만 버튼을 노출합니다.</li>
          <li><b class="bold">hideMobile</b> : true를 전달하면 모바일 환경<b>(767px 이하)</b>에서는 버튼을 숨깁니다.</li>
          <li><b class="bold">contents</b> : 문자열 또는 컴포넌트를 전달하면 버튼의 모양을 변경할 수 있습니다. <br />오른쪽 버튼(다음으로 이동)은 자동으로 <b>좌우 전환</b>된 형태로 노출됩니다.</li>
        </ul>
      `,
    code: {
      type: "obj",
      argu: [
        { key: "hide", value: getCommonsHighlight.colors("false").bool },
        { key: "showHover", value: getCommonsHighlight.colors("false").bool },
        { key: "hideMobile", value: getCommonsHighlight.colors("false").bool },
        { key: "contents", value: getCommonsHighlight.string("") },
      ],
    },
  },
  {
    name: "useAutoPlay",
    default: "{ delay: 3000, showTimer: false }",
    type: "Object",
    notice: `Slider의 <b>자동전환</b> 기능을 제어합니다. <br /><br />
      <ul class="ul-wrapper">
        <li><b class="bold">delay</b> : 자동전환 되는 시간을 설정합니다. <b>최소 3초(3000ms)</b>부터 적용이 가능합니다.</li>
        <li><b class="bold">showTimer</b> : true 전달시, 자동전환 되는 시간초를 시각적으로 노출할 수 있습니다. </li>
      </ul>
    `,
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
    notice: `스와이프 기능을 사용할 수 있습니다. <br /><br />
      <ul class="ul-wrapper">
      <li><b class="bold">sideMovePercent</b> : 스와이프 시, 이전 및 다음으로 전환되는 페이지의 비율을 결정합니다. <br />(50을 기입할 경우 스와이프된 페이지의 이동 범위가 50% 이상을 넘어갈 때 페이지가 전환됩니다.) <br /><b>최소 10부터 최대 90까지</b>만 설정이 가능합니다. </li>
    </ul>
      `,
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
      "제일 먼저 노출시킬 페이지의 번호를 입력하면 해당 페이지를 <b>먼저 노출</b>할 수 있습니다. <br />페이지의 번호는 앞에서부터 <b>1번부터 컴포넌트의 개수까지</b> 입력이 가능합니다.",
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
      "Slider의 web<b>(768px 이상)</b>, mobile<b>(767px 이하)</b> 환경의 최소 높이를 지정할 수 있습니다.",
    code: {
      type: "obj",
      argu: [
        { key: "web", value: getCommonsHighlight.string("0px") },
        { key: "mobile", value: getCommonsHighlight.string("0px") },
      ],
    },
  },
  {
    name: "changePageEvent",
    default: `(idx) => {}`,
    type: "Function",
    notice:
      "Slider의 페이지가 변경이 되면 실행될 이벤트를 설정합니다. <br />설정된 이벤트에는 선택되어 있는 <b>리스트의 인덱스 값을 반환</b>하는 props가 제공됩니다.",
    code: {
      type: "function",
      argu: ["idx"],
    },
  },
];

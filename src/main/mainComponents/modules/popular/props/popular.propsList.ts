import { getCommonsHighlight } from "src/commons/highlight";
import { PropsModuleListType } from "src/main/commonsComponents/units/template/form/props/props.types";

export const popularPropsList: Array<PropsModuleListType> = [
  {
    name: "list",
    default: "[ ]",
    type: "[Node]",
    notice:
      "Popular에 적용할 나열되는 컴포넌트들을 나타냅니다. <br />list props에 직접 전달할 경우에는 반드시 <b>배열</b>에 담아야 합니다. <br /><br />list로 전달된 배열은 컴포넌트가 재렌더 되더라도 데이터가 변경되지 않도록 <br /> <b>useState</b> 또는 <b>전역 변수</b>로 관리하는 것을 권장합니다.",
    isRequired: true,
    code: {
      type: "array",
    },
  },
  {
    name: "minHeight",
    default: "{ web : 0, mobile : 0 }",
    type: "Object",
    notice:
      "Popular의 높이값을 지정합니다. <br /> 웹<b>(768px 이상)</b>과 모바일<b>(767px 이하)</b> 환경에 따라 다른 높이값을 지정할 수 있습니다. <br /><br />웹 환경의 높이값은 <b>반드시 설정</b>해야 하며, 모바일 환경의 높이값은 옵션으로 설정이 가능합니다.",
    isRequired: true,
    code: {
      type: "obj",
      argu: [
        { key: "web", value: getCommonsHighlight.colors("0").number },
        {
          key: "mobile",
          value: getCommonsHighlight.colors("0").number,
        },
      ],
    },
  },
  {
    name: "delay",
    default: "2000",
    type: "Number",
    notice:
      "Popular 리스트의 전환 속도를 조절합니다. <br />Millisecond(1/1000)로 적용되며, <b>최소 2초(2000)</b>부터 적용됩니다.",
    code: {
      type: "number",
      argu: 2000,
    },
  },
  {
    name: "popularStyles",
    default: "{}",
    type: "Object",
    notice:
      "Popular 외부에 대한 스타일을 지정합니다. <br />전달된 스타일은 웹과 모바일 환경에 동일하게 적용됩니다.",
    code: {
      type: "obj",
      argu: {},
    },
  },
  {
    name: "popularResponsiveStyles",
    default: "{ web : {}, mobile : {} }",
    type: "Object",
    notice:
      "Popular의 외부 스타일을 웹과 모바일 환경으로 분리하여 적용합니다. <br /><b>web</b>의 값으로 전달된 스타일은 웹<b>(768px 이상)</b>에만 적용이 되며 <br /><b>mobile</b>의 값으로 전달된 스타일은 모바일<b>(767px 이하)</b>부터 적용이 됩니다. <br /><br /> <b>popularStyles</b> props와 중복으로 적용될 경우 더 우선순위로 스타일이 적용됩니다.",
    code: {
      type: "obj",
      argu: [
        {
          key: "web",
          value: getCommonsHighlight.curly({
            children: "",
            className: "deepPurple",
          }),
        },
        {
          key: "mobile",
          value: getCommonsHighlight.curly({
            children: "",
            className: "deepPurple",
          }),
        },
      ],
    },
  },
  {
    name: "setList",
    default:
      "{ hide : false, showRating : false, hoverStyles: {}, styles : {}, responsiveStyles: { web : {}, mobile : {} } }",
    type: "Object",
    notice: `Popular의 전체 리스트에 관한 기능들을 관리하는 객체입니다. <br /><b>전체 리스트 보이기/가리기, 순위도 표시, 스타일 적용</b>등의 기능을 사용할 수 있습니다. <br /><br />
      <ul class="ul-wrapper">
        <li><b class="bold">hide</b> : 전체 리스트를 숨길 여부를 결정합니다. true를 전달하면 전체 리스트를 감출 수 있습니다.</li>
        <li><b class="bold">showRating</b> : 전체 리스트의 순위를 표기합니다.</li>
        <li><b class="bold">hoverStyles</b> : 현재 선택되어 있는 리스트를 표현할 수 있는 스타일을 지정합니다.</li>
        <li><b class="bold">styles</b> : 전체 리스트의 스타일을 지정할 수 있습니다. 해당 스타일은 웹과 모바일에 동시 적용됩니다.</li>
        <li><b class="bold">responsiveStyles</b> : 전체 리스트의 스타일을 웹과 모바일로 분리하여 적용할 수 있습니다. 적용된 스타일은 <b>styles</b>보다 더 우선순위로 적용됩니다.</li>
      </ul>
      `,
    code: {
      type: "obj",
      argu: [
        {
          key: "hide",
          value: getCommonsHighlight.colors("false").bool,
        },
        {
          key: "showRating",
          value: getCommonsHighlight.colors("false").bool,
        },
        {
          key: "hoverStyles",
          value: getCommonsHighlight.curly({
            children: "",
            className: "deepPurple",
          }),
        },
        {
          key: "styles",
          value: getCommonsHighlight.curly({
            children: "",
            className: "deepPurple",
          }),
        },
        {
          key: "responsiveStyles",
          value: getCommonsHighlight.curly({
            children: `
    ${getCommonsHighlight.obj(
      "web",
      getCommonsHighlight.curly({ children: "" })
    )}${getCommonsHighlight.comma()}
    ${getCommonsHighlight.obj(
      "mobile",
      getCommonsHighlight.curly({ children: "" })
    )}
  `,
            className: "deepPurple",
          }),
        },
      ],
    },
  },
  {
    name: "useSwipeMode",
    default: "false",
    type: "Boolean",
    notice:
      "Popular 스와이프 모드 사용 여부를 결정합니다. <br />true를 전달하면 현재 리스트 창을 상, 하로 이동해 리스트를 선택할 수 있습니다.",
    isRequired: false,
    code: {
      type: "bool",
    },
  },
  {
    name: "changeListEvent",
    default: "(idx) => {}",
    type: "Function",
    notice:
      "Popular의 <b>리스트가 변경될 때마다 실행</b>되는 이벤트를 설정합니다. <br />설정된 이벤트에는 선택되어 있는 <b>리스트의 인덱스 값을 반환</b>하는 props가 제공됩니다.",
    isRequired: false,
    code: {
      type: "function",
      argu: ["idx"],
    },
  },
];

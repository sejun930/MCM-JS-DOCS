import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";
import classList from "mcm-js/dist/commons/class";

export const tooltipTreeList: Array<TreeModuleListTypes> = [
  {
    tag: "div",
    class: classList?.tooltip.wrapper || "mcm-tooltip-wrapper",
    depth: 0,
    role: "툴팁 전체를 감싸는 최상위 태그이며, <br /> <b>id</b> 또는 <b>className</b>을 전달받으면 선택자가 지정됩니다. <br /><br />마우스 커서가 해당 태그를 벗어날 때 툴팁이 최종 종료됩니다.",
  },
  {
    tag: "div",
    class: classList?.tooltip.items || "mcm-tooltip-items",
    depth: 1,
    role: "툴팁의 내부 영역을 감싸주는 태그입니다. <br /><br /><b>position</b> props를 전달 받으면 <br /> 툴팁의 위치를 정렬하는 역할을 합니다.",
  },
  {
    tag: "div",
    class: classList?.tooltip.children || "mcm-tooltip-children",
    depth: 2,
    role: "툴팁을 실행시킬 데이터를 감싸는 태그입니다. <br /><b>children</b>으로 전달받은 데이터가 이 태그에 노출이 됩니다. <br /><br />마우스 커서가 해당 태그에 올라올 때 <br /> 툴팁 메세지를 실행시키는 역할을 합니다.",
  },
  {
    tag: "div",
    class: classList?.tooltip.textWrapper || "mcm-tooltip-text-wrapper",
    depth: 2,
    role: "툴팁 메세지 전체를 감싸는 태그이며, <br /> 툴팁 메세지의 전체 크기 및 테두리 스타일과 툴팁 메세지의 실행 위치를 담당합니다.<br /><br /><b>useShowAnimation</b>이 전달되면<br />애니메이션을 적용시키는 태그이며, <br /><br /><b>tooltipStyles</b> 또는 <b>tooltipMobileStyles</b>가 전달되면 <br />툴팁의 전체 크기 및 테두리에 대한 스타일을 설정할 수 있습니다. <br /><br />전달된 <b>position</b> 값에 따라 툴팁 메세지의 위치가 변경됩니다.",
  },
  {
    tag: "div",
    class: classList?.tooltip.textContents || "mcm-tooltip-text-contents",
    depth: 3,
    role: "<b>children</b>으로 전달된 메세지의 내용을 감싸는 태그이며, <br />툴팁 메세지의 말풍선 스타일을 담당하는 태그입니다. <br /><br /><b>tooltipStyles</b> 또는 <b>tooltipMobileStyles</b>가 전달되면 padding 값을 통해 부가적으로 툴팁 메세지의 전체 크기를 조정할 수 있습니다. <br /><br /><b>::after</b>, <b>::before</b>를 통해 말풍선 스타일을 변경할 수 있으나 <br />추천하지 않습니다.",
  },
  {
    tag: "span",
    class: classList?.tooltip.text || "mcm-tooltip-text",
    depth: 4,
    role: "<b>children</b>으로 전달받은 메세지의 내용이 <br />문자열 타입일 경우에만 출력되는 태그입니다. <br /><br />전달된 <b>tooltipText</b> 문자열의 내용을 감싸는 역할을 담당하며 <br /><b>tooltipStyles</b> 또는 <b>tooltipMobileStyles</b>를 전달하면 <br />문자열의 색상, 크기, 굵기를 설정할 수 있습니다.",
  },
];

import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";
import { getClassList } from "src/main/commonsComponents/functional/modules";
const classList = getClassList().alertClassList;

export const alertTreeList: Array<TreeModuleListTypes> = [
  {
    tag: "div",
    class: classList?.wrapper || "mcm-alert-wrapper",
    depth: 0,
    role: "알럿 전체를 감싸는 태그입니다. <br />알럿의 크기 및 테두리 스타일을 담당합니다. <br /><br />전달받은 <b>className</b> 또는 <b>id</b>가 선택자로 지정됩니다. <br /><br /><b>alertConcept.custom.color</b>로 색상을 전달받으면 <br />테두리의 색상이 변경됩니다.",
  },
  {
    tag: "div",
    class: classList?.items || "mcm-alert-items",
    depth: 1,
    role: "알럿의 메세지 및 적용된 컨셉 태그들을 감싸는 태그입니다.",
  },
  {
    tag: "span",
    class: classList?.concept || "mcm-alert-concept-wrapper",
    depth: 2,
    role: "알럿의 컨셉 이모지를 나타내는 태그입니다. <br /><br /><b>alertConcept.type</b>이 지정되어야 노출되는 태그이며, <br /><b>alertConcept.custom.color</b>로 전달받은 색상으로 테두리 및 이모지 색상을 변경할 수 있고 <br /><b>alertConcept.custom.icon</b> 객체를 통해 이모지 경로, 색상, 크기를 직접 변경할 수 있습니다. <br /><br /><b>alertConcept.custom.icon.color</b>로 전달된 색상은 <br /><b>alertConcept.custom.color</b> 색상보다 우선순위로 지정됩니다.",
  },
  {
    tag: "span",
    class: classList?.text || "mcm-alert-text",
    depth: 2,
    role: "<b>children</b> props로 전달받은 문자열로 <br />알럿 메세지를 출력하는 태그입니다. <br /><br /><b>alertConcept.custom.text</b>로 알럿 메세지의 색상, 크기, 굵기를 지정할 수 있습니다.",
  },
  {
    tag: "button",
    class: classList?.close || "mcm-alert-close-wrapper",
    depth: 1,
    role: "<b>useCloseMode</b>를 전달받으면 노출되는 태그이며, <br />알럿을 종료시키는 역할을 담당합니다.",
  },
];

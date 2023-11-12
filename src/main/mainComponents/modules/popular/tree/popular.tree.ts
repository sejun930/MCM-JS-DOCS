import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";
import { getClassList } from "src/main/commonsComponents/functional/modules";
const classList = getClassList().popularClassList;

export const popularTreeList: Array<TreeModuleListTypes> = [
  {
    tag: "div",
    class: classList?.wrapper || "mcm-popular-wrapper",
    depth: 0,
    role: "Popular 전체를 감싸는 최상위 태그이며, <br /> <b>id</b> 또는 <b>className</b>을 전달받으면 선택자가 지정됩니다. <br /><br /><b>minHeight</b>로 전달되는 높이값으로 <br />모듈 전체의 높이값이 고정됩니다.",
  },
  {
    tag: "div",
    class: classList?.mainWrapper || "mcm-popular-main-wrapper",
    depth: 1,
    role: "현재 선택되어 있는 <b>리스트</b> 및 <b>전체 보기 버튼</b>을 감싸는 태그입니다. <br /><br /><b>minHeight</b>로 전달되는 높이값으로 <br />해당 태그와 하위 태그의 높이값을 고정시킵니다. <br /><br /><b>popularStyles</b> 또는 <b>popularResponsiveStyles</b>로 전달되는 스타일을 적용시킬 수 있습니다.",
  },
  {
    tag: "ul",
    class: classList?.mainItems || "mcm-popular-main-list-wrapper",
    depth: 2,
    role: "현재 선택되어 있는 리스트를 나타내는 태그입니다. <br /><br />일정 시간 또는 <b>delay</b>로 설정된 시간마다 자동으로 리스트를 전환하며<br /><b>ableUseSwipe</b>로 스와이프 모드가 적용됩니다.",
  },
  {
    tag: "li",
    class: classList?.mainList || "mcm-popular-main-list",
    depth: 3,
    role: "현재 리스트들을 담는 태그입니다. <br /><br />리스트 중 자동으로 전환되거나 수동으로 선택이 되면 <br />현재 리스트로 노출됩니다.",
  },
  {
    tag: "p",
    class: classList?.mainContents || "mcm-popular-main-contents",
    depth: 4,
    role: "list props로 전달된 <b>데이터의 타입이 문자열</b>일 경우 <br />자동으로 적용되는 태그입니다. <br /><br />이 태그 안의 문자열은 크기가 일정 범위를 넘을 경우 <br /><b>자동 자름 기능</b>을 제공합니다.",
  },
  {
    tag: "button",
    class: classList?.opener || "mcm-popular-opener-btn",
    depth: 2,
    role: "전체 리스트를 <b>보이거나 닫는 기능</b>을 제공하는 버튼입니다. <br /><br /><b>popularStyles</b> 또는 <b>popularResponsiveStyles</b>로 전달된 <br />스타일 중 <b>color</b> 스타일이 있다면 색상이 변경됩니다. <br /><br /><b>setList.hide</b>가 true로 전달되면 노출되지 않습니다.",
  },
  {
    tag: "div",
    class: classList?.listWrapper || "mcm-popular-list-wrapper",
    depth: 1,
    role: "리스트 전체 리스트들을 나타내는 태그입니다. <br /><br />전체 리스트 보기 및 닫기 버튼을 통해 <br />전체 리스트를 열거나 닫을 수 있습니다. <br /><br /><b>setList.hide</b>가 true로 전달되면 노출되지 않습니다.",
  },
  {
    tag: "ul",
    class: classList?.listItems || "mcm-popular-list-items",
    depth: 2,
    role: "전체 리스트들을 감싸는 태그입니다. <br /><br /><b>setList.styles</b> 또는 <b>setList.responsiveStyles</b>의 스타일이 <br />해당 태그에 직접 적용됩니다.",
  },
  {
    tag: "li",
    class: classList?.list || "mcm-popular-list",
    depth: 3,
    role: "<b>list</b>로 전달된 각각의 리스트들을 나타냅니다. <br /><br /><b>setList.hoverStyles</b>을 통해 <br />현재 선택된 리스트 스타일을 지정할 수 있습니다.",
  },
  {
    tag: "span",
    class: classList?.rating || "mcm-popular-list-rating",
    depth: 4,
    role: "리스트들의 순위를 나타내는 태그입니다. <br /><b>setList.showRating</b>가 true로 전달되면 노출됩니다.",
  },
];

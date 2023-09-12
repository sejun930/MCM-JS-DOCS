import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";
import { getClassList } from "src/main/commonsComponents/functional/modules";
const classList = getClassList().sliderClassList;

// import { sliderClassList } from "mcm-js-dev/dist/commons/class";

export const sliderTreeList: Array<TreeModuleListTypes> = [
  {
    tag: "div",
    class: classList?.wrapper || "mcm-slider-wrapper",
    depth: 0,
    role: "슬라이더 전체를 감싸는 최상위 태그입니다. <br />슬라이더의 전체 크기를 조절할 때 <b>width</b> 또는 <b>height</b> 스타일을 변경해 전체 크기를 조절할 수 있습니다.",
  },
  {
    tag: "div",
    class: classList?.items || "mcm-slider-items",
    depth: 1,
    role: "슬라이더의 좌우 버튼, 리스트, 페이지네이션 등의 부가 기능들을 감싸는 태그입니다.",
  },
  {
    tag: "button",
    class: classList?.prevArrow || "mcm-slider-prev-button",
    depth: 2,
    role: "슬라이더의 페이지를 <b>이전 페이지로 전환</b>하는 버튼입니다. <br /><br /><b>hideArrow</b>가 전달되면 보여지지 않습니다.",
  },
  {
    tag: "ul",
    class: classList?.list || "mcm-slider-list",
    depth: 2,
    role: "슬라이더에 렌더될 컴포넌트들을 감싸는 리스트 태그입니다. <br />여러개의 컴포넌트 중 현재 페이지의 컴포넌트만 보여줍니다. <br /><br /><b>firstPage</b>로 전달받은 페이지를 우선적으로 노출시킵니다.<br /><br /><b>useAnimation</b>이 전달되면 애니메이션 효과가 적용되는 태그이며, <br /><b>useSwipeMode</b>로 스와이프 기능이 적용됩니다.<br /><br /><b>listMinHeight</b>로 전달된 min-height style이 직접 적용됩니다.",
  },
  {
    tag: "li",
    class: classList?.contents || "mcm-slider-contents",
    depth: 3,
    role: "<b>children</b>의 각각의 실제 내용이 담긴 컴포넌트를 감싸는 태그입니다.",
  },
  {
    tag: "div",
    class: classList?.pagination || "mcm-slider-pagination",
    depth: 2,
    role: "슬라이더의 하위 페이지 태그들을 감싸는 상위 태그입니다. <br /><br /><b>pagination</b>를 사용해야만 노출되는 태그입니다.",
  },
  {
    tag: "button",
    class: classList?.page || "mcm-slider-page",
    depth: 3,
    role: "슬라이더 페이지네이션의 페이지들을 나타내는 버튼입니다. <br /><br /><b>children</b>의 개수만큼 페이지를 노출하며 <br />해당 페이지 버튼을 클릭하면 페이지를 전환할 수 있습니다.",
  },
  {
    tag: "button",
    class: classList?.nextArrow || "mcm-slider-next-button",
    depth: 2,
    role: "슬라이더의 페이지를 <b>다음 페이지로 전환</b>하는 버튼입니다. <br /><br /><b>hideArrow</b>가 전달되면 보여지지 않습니다.",
  },
  {
    tag: "div",
    class: classList?.timer || "mcm-slider-timer",
    depth: 2,
    role: "<b>useAutoPlay.showTimer</b>가 적용될 때만 출력되는 태그입니다. <br /><br />슬라이더의 자동전환이 얼마나 진행되고 있는지를 나타내며, <br /><b>useAutoPlay.delay</b>의 시간에 영향을 받습니다. <br /><br /><b>::after</b>를 이용해 타이머의 스타일을 변경할 수 있습니다.",
  },
];

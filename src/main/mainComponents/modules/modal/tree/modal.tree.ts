import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";

export const modalTreeList: Array<TreeModuleListTypes> = [
  {
    tag: "div",
    class: "mcm-modal-wrapper",
    depth: 0,
    role: "모달 전체를 감싸는 최상위 태그입니다. <br /> 위치 고정 및 배경을 담당하며 <b>모달의 배경색을 직접 제어</b>할 수 있습니다.",
  },
  {
    tag: "div",
    class: "mcm-modal-items",
    depth: 1,
    role: "모달 창을 나타내는 태그입니다. <br /> width, height 값으로 <b>모달의 내부 크기를 조절</b>할 수 있습니다.",
  },
  {
    tag: "div",
    class: "mcm-modal-close-button-wrapper",
    depth: 2,
    role: "닫는 기능에 관련된 태그들을 감싸는 태그입니다. <br />닫기 버튼등의 <b>위치 값을 직접 수정</b>할 수 있습니다.",
  },
  {
    tag: "button",
    class: "mcm-modal-close-ment-button",
    depth: 3,
    role: "닫기에 관한 설명을 감싸는 버튼 태그입니다. <br /><b>closeMent</b>가 전달될 때만 화면에 노출되며 <br />클릭하면 <b>onCloseModal</b> 이벤트가 작동됩니다.",
  },
  {
    tag: "span",
    class: "mcm-modal-close-ment",
    depth: 4,
    role: "닫기에 관한 설명을 나타내는 태그입니다. <br /><b>closeMent</b>로 전달받은 문자열이 노출됩니다.",
  },
  {
    tag: "button",
    class: "mcm-modal-close-button",
    depth: 3,
    role: "모달을 닫는 버튼을 나타내는 태그입니다. <br />클릭하면 <b>onCloseModal</b> 이벤트가 작동되고 <br /><b>hideCloseButton</b>가 전달되면 화면에 노출되지 않습니다. <br /><br /><b>:before, :after</b>에 직접 접근해 버튼 스타일을 변경할 수 있습니다.",
  },
  {
    tag: "div",
    class: "mcm-modal-layout",
    depth: 2,
    role: "모달의 전체 내용의 레이아웃을 담당하는 태그입니다.",
  },
  {
    tag: "div",
    class: "mcm-modal-content",
    depth: 3,
    role: "실제로 출력될 전체 데이터를 감싸는 태그입니다. <br /><b>children</b>으로 전달되는 데이터들이 여기에 출력됩니다. <br /><br />모달 내부의 스타일을 제어할 수 있지만 <b>모달의 위치를 수정</b>하는 등의 스타일은 추천하지 않습니다.",
  },
];

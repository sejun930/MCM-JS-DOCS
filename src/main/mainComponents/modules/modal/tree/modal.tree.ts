import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";
// import { getClassList } from "src/main/commonsComponents/functional/modules";
// const classList = getClassList().modalClassList;

import { modalClassList } from "mcm-js-dev/dist/commons/class";

export const modalTreeList: Array<TreeModuleListTypes> = [
  {
    tag: "div",
    class: modalClassList?.wrapper || "mcm-modal-wrapper",
    depth: 0,
    role: "모달 전체를 감싸는 최상위 태그이며, 배경을 담당합니다. <br /> <br /><b>id</b> 또는 <b>className</b>을 전달받으면 선택자가 지정되는 태그이며, <br /> <b>modalStyles.wrapper</b> 또는 <b>mobileModalStyles.wrapper</b> 객체로 스타일을 설정할 수 있습니다. <br /><br /> <b>background-color</b> 스타일을 통해 배경을 제어할 수 있습니다.",
  },
  {
    tag: "div",
    class: modalClassList?.items || "mcm-modal-items",
    depth: 1,
    role: "모달 창의 위치 및 크기를 담당하는 태그입니다. <br /><br /><b>modalSize</b>와 <b>mobileModalSize</b>의 width, height 값으로 모달의 가로 및 세로 크기를 설정할 수 있으며, <br /><br /> <b>modalStyles.items</b> 또는 <b>mobileModalStyles.items</b> 객체로 스타일을 설정할 수 있습니다. <br /><br /> modalSize와 modalStyles가 동시에 할당될 경우, width와 height 속성은 <b>modalSize가 우선순위</b>를 가지게 됩니다.",
  },
  {
    tag: "div",
    class:
      modalClassList?.closeButtonWrapper || "mcm-modal-close-button-wrapper",
    depth: 2,
    role: "닫는 기능에 관련된 태그들을 감싸는 태그입니다. <br /><br /> <b>modalStyles.closeButton</b> 또는 <b>mobileModalStyles.closeButton</b> 객체로 스타일을 설정할 수 있습니다.",
  },
  {
    tag: "button",
    class:
      modalClassList?.closeButtonMentButton || "mcm-modal-close-ment-button",
    depth: 3,
    role: "닫기에 관한 설명을 감싸는 버튼 태그입니다. <br /><br /> <b>closeMent</b>가 전달될 때만 화면에 노출되며 <br />클릭하면 <b>onCloseModal</b> 이벤트가 작동됩니다.",
  },
  {
    tag: "span",
    class: modalClassList?.closeButtonMent || "mcm-modal-close-ment",
    depth: 4,
    role: "닫기에 관한 설명을 나타내는 태그입니다. <br /><br /> <b>closeMent</b>로 전달받은 문자열이 노출됩니다.",
  },
  {
    tag: "button",
    class: modalClassList?.closeButton || "mcm-modal-close-button",
    depth: 3,
    role: "모달을 닫는 버튼을 나타내는 태그입니다. <br /><br /> 클릭하면 <b>onCloseModal</b> 이벤트가 작동되며 <br /><b>hideCloseButton</b>를 전달해 화면에 보이지 않게 할 수 있습니다. <br /><br /><b>closeButtonInfo</b>을 이용해 버튼의 크기(size), 버튼의 굵기(width), 버튼의 색상(color)을 변경할 수 있으며, <br /><br /><b>::before, ::after</b>에 접근해 스타일을 직접 변경할 수 있습니다.",
  },
  {
    tag: "div",
    class: modalClassList?.contents || "mcm-modal-contents",
    depth: 2,
    role: "실제로 출력될 전체 데이터를 감싸는 태그입니다. <br /><b>children</b>으로 전달되는 데이터들이 여기에 출력됩니다. <br /><br /> <b>modalStyles.contents</b> 또는 <b>mobileModalStyles.contents</b> 객체로 스타일을 설정할 수 있지만 <br /> <b>모달의 위치를 수정</b>(margin-top..)하는 스타일은 추천하지 않습니다.",
  },
];

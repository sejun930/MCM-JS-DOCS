import { PropsModuleListType } from "src/commons/data/props/props.commons.data";
import { getCommonsHighlight } from "src/commons/highlight";
import {
  getPropsCodeTemplate,
  getObjectTemplate,
} from "src/main/commonsComponents/functional";
import { modalPropsCommonsCode } from "./modal.props.commns.code";
import { propsCommonsCodeList } from "src/commons/data/props/props.commons.code";

export const modalPropsList: Array<PropsModuleListType> = [
  {
    name: "children",
    default: '""',
    type: "String | Node",
    notice:
      "모달에 출력되는 내용을 나타냅니다. <br />Modal.open을 사용하는 경우에는 children Props를 전달해줘야 합니다.",
    isRequired: true,
    code: [
      propsCommonsCodeList("children").string(),
      getObjectTemplate(propsCommonsCodeList("children").string()),
    ],
  },
  {
    name: "show",
    default: false,
    type: "Boolean",
    notice: `모달의 오픈 여부를 결정합니다. true가 전달되면 모달이 실행됩니다. <br />
      Modal.open을 사용하는 경우에는 자동으로 적용됩니다.`,
    isRequired: true,
    code: [
      propsCommonsCodeList("show").bool,
      getObjectTemplate(propsCommonsCodeList("show", true).bool),
    ],
  },
  {
    name: "onCloseModal",
    default: "() => {}",
    type: "Function",
    notice:
      "모달을 종료할 때 실행하는 이벤트입니다. <br /> Modal.open을 사용하는 경우에는 자동으로 적용됩니다.",
    isRequired: true,
    code: [
      propsCommonsCodeList("onCloseModal").function,
      getObjectTemplate(propsCommonsCodeList("onCloseModal", true).function),
    ],
  },
  {
    name: "name",
    default: '""',
    type: "String",
    notice:
      "모달의 name 속성 값을 지정합니다. 지정된 name값은 wrapper 태그에 data-name 속성으로 적용됩니다.",
    code: [
      propsCommonsCodeList("name").string(),
      getObjectTemplate(propsCommonsCodeList("name").string()),
    ],
  },
  {
    name: "modalSize",
    default: '{ width : "", height : "" }',
    type: "Object",
    notice:
      "모달창의 크기(width, height)를 직접 지정할 수 있습니다. <br />modalStyles와 함께 설정되면 modalSize가 우선순위를 가집니다.",
    code: [
      propsCommonsCodeList("modalSize").obj(modalPropsCommonsCode.size),
      getObjectTemplate(
        propsCommonsCodeList("modalSize", true).obj(modalPropsCommonsCode.size)
      ),
    ],
  },
  {
    name: "mobileModalSize",
    default: '{ width : "", height : "" }',
    type: "Object",
    notice:
      "모바일 환경에서의 모달창의 크기(width, height)를 직접 지정할 수 있습니다. <br /> mobileModalStyles와 함께 설정되면 mobileModalSize 우선순위를 가집니다.",
    code: [
      propsCommonsCodeList("mobileModalSize").obj(modalPropsCommonsCode.size),
      getObjectTemplate(
        propsCommonsCodeList("mobileModalSize", true).obj(
          modalPropsCommonsCode.size
        )
      ),
    ],
  },
  {
    name: "modalStyles",
    default: "{ wrapper : {}, itmes : {}, closeButton : {}, contents : {} }",
    type: "Object",
    notice:
      "모달의 각각의 태그(wrapper, items, closeButton, contents)별로 스타일을 직접 적용할 수 있습니다.",
    code: [
      propsCommonsCodeList("modalStyles").obj(modalPropsCommonsCode.styles()),
      getObjectTemplate(
        propsCommonsCodeList("modalStyles", true).obj(
          modalPropsCommonsCode.styles(true)
        )
      ),
    ],
  },
  {
    name: "mobileModalStyles",
    default: "{ wrapper : {}, itmes : {}, closeButton : {}, contents : {} }",
    type: "Object",
    notice:
      "모바일 환경의 모달의 각각의 태그(wrapper, items, closeButton, contents)별로 스타일을 직접 적용할 수 있습니다.",
    code: [
      propsCommonsCodeList("mobileModalStyles").obj(
        modalPropsCommonsCode.styles()
      ),
      getObjectTemplate(
        propsCommonsCodeList("mobileModalStyles", true).obj(
          modalPropsCommonsCode.styles(true)
        )
      ),
    ],
  },
  {
    name: "showBGAnimation",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 모달창 실행/종료 시, 배경 애니메이션을 적용할 수 있습니다.",
    code: [
      propsCommonsCodeList("showBGAnimation").bool,
      getObjectTemplate(propsCommonsCodeList("showBGAnimation", true).bool),
    ],
  },
  {
    name: "showModalOpenAnimation",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 모달창 실행/종료 시, 모달 애니메이션을 적용할 수 있습니다.",
    code: [
      propsCommonsCodeList("showModalOpenAnimation").bool,
      getObjectTemplate(
        propsCommonsCodeList("showModalOpenAnimation", true).bool
      ),
    ],
  },
  {
    name: "hideCloseButton",
    default: "false",
    type: "Boolean",
    notice: "true를 전달하면 모달 닫기 버튼을 숨길 수 있습니다.",
    code: [
      propsCommonsCodeList("hideCloseButton").bool,
      getObjectTemplate(propsCommonsCodeList("hideCloseButton", true).bool),
    ],
  },
  {
    name: "closeMent",
    default: '""',
    type: "String",
    notice: "닫기에 대한 부가설명 멘트를 작성할 수 있습니다.",
    code: [
      propsCommonsCodeList("closeMent").string(),
      getObjectTemplate(propsCommonsCodeList("closeMent").string()),
    ],
  },
  {
    name: "closeButtonInfo",
    default: '{ buttonSize : 0, buttonWeight : 0, buttonColor : "black" }',
    type: "Object",
    notice:
      "닫기 버튼에 대한 넓이, 높이(buttonSize), 굵기(buttonWeight), 색상(buttonColor)을 직접 설정합니다.",
    code: [
      propsCommonsCodeList("closeButtonInfo").obj(
        modalPropsCommonsCode.closeBtn
      ),
      getObjectTemplate(
        propsCommonsCodeList("closeButtonInfo", true).obj(
          modalPropsCommonsCode.closeBtn
        )
      ),
    ],
  },
  {
    name: "offAutoClose",
    default: "false",
    type: "Boolean",
    notice:
      "true를 전달하면 모달창 외부를 클릭해도 닫기 이벤트가 실행되지 않습니다.",
    code: [
      propsCommonsCodeList("offAutoClose").bool,
      getObjectTemplate(propsCommonsCodeList("offAutoClose", true).bool),
    ],
  },
  {
    name: "onAfterCloseEvent",
    default: "() => {}",
    type: "Function",
    notice:
      "모달이 종료되는 시점 후(onCloseModal 함수 실행 후)에 실행될 이벤트입니다. <br /> 모달이 닫힌 후에 input 태그등을 foucs 하는 등의 용도로 사용할 수 있습니다.",
    code: [
      propsCommonsCodeList("onAfterCloseEvent").function,
      getObjectTemplate(
        propsCommonsCodeList("onAfterCloseEvent", true).function
      ),
    ],
  },
  {
    name: "timer",
    default: "0",
    type: "Number",
    notice:
      "설정한 시간(Millisecond : 1/1000)이 경과 후 모달을 자동으로 종료시킬 수 있습니다. <br /> 예를 들어, 1초 후에 모달을 종료하고 싶다면 1초의 Millisecond인 1000을 전달합니다. <br />1초(=1000) 미만의 숫자를 기입하면 실행되지 않습니다.",
    code: [
      propsCommonsCodeList("timer").number(),
      getObjectTemplate(propsCommonsCodeList("timer", true).number()),
    ],
  },
  {
    name: "onFixWindow",
    default: "false",
    type: "Boolean",
    notice:
      "모달이 실행될 때 화면 스크롤 이동을 방지할 수 있습니다. <br /> 상위 모달, 하위 모달 상관없이 모달 전체에 적용됩니다.",
    code: [
      propsCommonsCodeList("onFixWindow").bool,
      getObjectTemplate(propsCommonsCodeList("onFixWindow", true).bool),
    ],
  },
];

import { getCommonsHighlight } from "src/commons/highlight";
import { PropsModuleListType } from "src/main/commonsComponents/units/template/form/props/props.types";

export const alertPropsList: Array<PropsModuleListType> = [
  {
    name: "children",
    default: '""',
    type: "String",
    notice: "지정된 문자열로 Alert 메세지를 출력합니다.",
    isRequired: true,
    code: {
      type: "string",
    },
  },
  {
    name: "closeDelayTime",
    default: "3000",
    // @ts-ignore
    type: "Number | String",
    notice:
      'Alert이 <b>종료되는 시간</b>을 설정합니다. <br /><br /><b>숫자 타입</b>을 전달하면 기입된 숫자로 종료 시간이 설정할 수 있습니다. <b>(1초 = 1/1000ms)</b><br />문자열 타입인 "infinite"를 전달하면 <b>종료되지 않는 Alert</b>이 설정됩니다.',
    isRequired: false,
    code: {
      type: "custom",
      argu: `${getCommonsHighlight.colors("3000").number} ${
        getCommonsHighlight.colors("||").text
      } ${getCommonsHighlight.string("infinite")}`,
    },
  },
  {
    name: "alertStyles",
    default: "{}",
    type: "Object",
    notice: "<b>웹, 모바일</b>에 동일하게 적용되는 Alert 스타일을 설정합니다.",
    isRequired: false,
    code: {
      type: "obj",
      argu: [],
    },
  },
  {
    name: "alertResponsiveStyles",
    default: "{ web : {}, mobile : {} }",
    type: "Object",
    notice:
      "<b>웹(768px 이상)</b>과 <b>모바일(767px 이하)</b>에 스타일을 각각 설정할 수 있습니다. <br /><b>alertStyles</b> props 보다 더 우선적으로 스타일이 적용됩니다.",
    isRequired: false,
    code: {
      type: "obj",
      argu: [
        {
          key: "web",
          value: getCommonsHighlight.curly({
            children: "",
            className: "yellow",
          }),
        },
        {
          key: "mobile",
          value: getCommonsHighlight.curly({
            children: "",
            className: "yellow",
          }),
        },
      ],
    },
  },
  {
    name: "alertConcept",
    default: `{ 
        type : "", 
        custom : { 
            color : "",
            icons : {
                src : "",
                size : 10,
                color : "",
            },
            text : {
                color : "",
                size : 16,
                weight : 300
            },
        }
    }`,
    type: "Object",
    notice: `Alert의 사용 용도에 맞게 컨셉을 지정할 수 있습니다. <br /><br />
        <ul class="ul-wrapper">
          <li><b class="bold">type</b> : Alert의 컨셉 타입을 지정합니다. </b> <b class="option"> <br /> ("success", "info", "warning", "error", "custom")</b></li>
          <li><b class="bold">custom</b> {</li>
          <li style="margin-left : 16px"><b class="bold">color</b> : Alert의 <b>이모지 및 테두리</b>의 전체의 색상을 설정합니다. </li>
          <li style="margin-left : 16px"><b class="bold">icon</b> { </li>
          <li style="margin-left : 32px"><b class="bold">src</b> : 설정된 컨셉의 이모지로 변경합니다.</li>
          <li style="margin-left : 32px"><b class="bold">size</b> : <b>이모지의 크기</b>를 조절합니다.</li>
          <li style="margin-left : 32px"><b class="bold">color</b> : <b>이모지의 색상</b>을 변경합니다.</li>
          <li style="margin-left : 16px"><b class="bold">text</b> { </li>
          <li style="margin-left : 32px"><b class="bold">color</b> : <b>메세지 색상</b>을 설정합니다.</li>
          <li style="margin-left : 32px"><b class="bold">size</b> : <b>메세지 크기</b>를 설정합니다.</li>
          <li style="margin-left : 32px"><b class="bold">weight</b> : <b>메세지 굵기</b>를 설정합니다.</li>
        </ul>
      `,
    isRequired: false,
    code: {
      type: "obj",
      argu: [
        {
          key: "type",
          value: getCommonsHighlight.string("custom"),
        },
        {
          key: "custom",
          value: getCommonsHighlight.curly({
            className: "yellow",
            children: `
    ${getCommonsHighlight.obj(
      "color",
      getCommonsHighlight.string("")
    )}${getCommonsHighlight.comma()}
    ${getCommonsHighlight.obj(
      "icon",
      getCommonsHighlight.curly({
        className: "deepPurple",
        children: `
      ${getCommonsHighlight.getComma([
        getCommonsHighlight.obj("src", getCommonsHighlight.string("")),
        `     ` +
          getCommonsHighlight.obj(
            "size",
            getCommonsHighlight.colors("10").number
          ),
        `     ` +
          getCommonsHighlight.obj("color", getCommonsHighlight.string("")),
      ])}
    `,
      })
    )}${getCommonsHighlight.comma()}
    ${getCommonsHighlight.obj(
      "text",
      getCommonsHighlight.curly({
        className: "deepPurple",
        children: `
      ${getCommonsHighlight.getComma([
        getCommonsHighlight.obj("color", getCommonsHighlight.string("")),
        `     ` +
          getCommonsHighlight.obj(
            "size",
            getCommonsHighlight.colors("16").number
          ),
        `     ` +
          getCommonsHighlight.obj(
            "weight",
            getCommonsHighlight.colors("300").number
          ),
      ])}
    `,
      })
    )}
  `,
          }),
        },
      ],
    },
  },
  {
    name: "useCloseMode",
    default: "false",
    // @ts-ignore
    type: "Boolean | {Boolean}",
    notice:
      'Alert을 수동으로 종료할 수 있는 모드를 설정합니다. <br />Boolean 타입인 <b>true를 전달</b>하면 Alert를 클릭해서 종료할 수 있게 됩니다. <br />객체 타입으로 <b>"useSwipeMode"</b> key 값을 true로 전달하면 스와이프 모드를 추가로 사용할 수 있습니다.',
    isRequired: false,
    code: {
      type: "custom",
      argu: `${getCommonsHighlight.colors("false").bool} ${
        getCommonsHighlight.colors("??").text
      } ${getCommonsHighlight.curly({
        children: ` ${getCommonsHighlight.obj(
          "useSwipeMode",
          getCommonsHighlight.colors("false").bool
        )} `,
      })}`,
    },
  },
  {
    name: "onAfterAlertOpen",
    default: "() => {}",
    type: "Function",
    notice: "Alert이 <b>실행</b>될 때 함께 실행될 함수입니다.",
    isRequired: false,
    code: {
      type: "function",
      // argu: `,
    },
  },
  {
    name: "onAfterAlertClose",
    default: "() => {}",
    type: "Function",
    notice: "Alert이 <b>종료</b>될 때 함께 실행될 함수입니다.",
    isRequired: false,
    code: {
      type: "function",
      // argu: `,
    },
  },
];

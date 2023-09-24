import { FunctionalListType } from "src/main/commonsComponents/units/template/form/functional";
import { getCommonsHighlight } from "src/commons/highlight";
import { getBoldCode } from "src/main/commonsComponents/functional/code";

import MyAlertExample from "../example/alert.example.template";
import AlertFunctionalExampleComponents from "./alert.functional.example.components";
import { getPropsForm } from "src/commons/data/props/props.commons.code";

// 출력용 코드
const funcForm = ({
  children,
  method,
  props,
}: {
  children: string;
  method: string;
  props?: string;
}) =>
  getCommonsHighlight.tag.button({
    children: ` ${getCommonsHighlight.colors(children).text}`,
    clickEvent: {
      hasStartSpace: true,
      eventName: `
        ${getBoldCode({
          code: `${getCommonsHighlight
            .colors("Alert")
            .method({ funcName: `${method}Alert` })}`,
          propsName: `${method}AlertFn`,
          id: `alert-${method}-functional-wrapper`,
        })}`,
      useArrow: true,
      props: props
        ? getCommonsHighlight.curly({
            className: "deepPurple",
            children: props,
          })
        : ` `,
    },
  });

// 예시용 코드
const funcExampleForm = ({
  name,
  notice,
  type,
  _default,
  children,
}: {
  name: string;
  notice: string;
  type: "Object" | "Number";
  _default: string;
  children: string;
}) =>
  getPropsForm(
    {
      name,
      notice,
      default: _default,
      type,
      code: { type: "string" },
      changeCode: `${getCommonsHighlight
        .colors("Alert")
        .method()}${getCommonsHighlight.function({
        funcName: "closeAlert",
        setFunc: {
          color: "blue",
          children,
        },
        removeSemiColon: true,
      })}`,
    },
    true
  );

const alertFunctionalList: Array<FunctionalListType> = [
  {
    name: "openAlert",
    id: "alert-open-functional-wrapper",
    remakrs: "알럿을 실행하는 함수입니다.",
    props: { isSameContents: true, list: [] },
    exampleCode: funcForm({
      children: "Open Alert",
      method: "open",
      props: `
          ${getCommonsHighlight.obj(
            "children",
            getCommonsHighlight.string("Hello")
          )}
        `,
    }),
    // @ts-ignore
    setExampleCode: <MyAlertExample children="Hello" btnText="Open Alert" />,
  },
  {
    name: "closeAlert",
    id: "alert-close-functional-wrapper",
    remakrs:
      "현재 실행되고 있던 알럿의 순서 또는 아이디 및 클래스를 입력하면 해당 알럿을 종료시킬 수 있습니다.",
    props: {
      list: [
        funcExampleForm({
          name: "sequence",
          notice:
            "기입한 순서에 실행된 알럿을 종료시킵니다. <br /> <b>(ex : 1 -> 1번째로 실행된 알럿 종료)</b>",
          type: "Number",
          _default: "0",
          children: getCommonsHighlight.colors("0").number,
        }),
        funcExampleForm({
          name: "className",
          notice: "해당 클래스 선택자 값으로 실행된 알럿을 모두 종료합니다.",
          type: "Object",
          _default: '{ className : "" }',
          children: getCommonsHighlight.curly({
            className: "yellow",
            children: ` ${getCommonsHighlight.obj(
              "className",
              getCommonsHighlight.string("")
            )} `,
          }),
        }),
        funcExampleForm({
          name: "id",
          notice: "해당 아이디 선택자 값으로 실행된 알럿 한개를 종료합니다.",
          type: "Object",
          _default: '{ id : "" }',
          children: getCommonsHighlight.curly({
            className: "yellow",
            children: ` ${getCommonsHighlight.obj(
              "id",
              getCommonsHighlight.string("")
            )} `,
          }),
        }),
      ],
    },
    exampleCode: funcForm({
      children: 'Close with "Test" className Alert',
      method: "close",
      props: `
          ${getCommonsHighlight.obj(
            "className",
            getCommonsHighlight.string("Test")
          )}${getCommonsHighlight.comma()} ${
        getCommonsHighlight.colors(
          '화면 전체의 "Test" ClassName을 가지는 모든 알럿을 종료합니다.'
        ).comment
      }
        `,
    }),
    setExampleCode: <AlertFunctionalExampleComponents />,
    info: [
      `순서를 지정해 종료할 때는 <b>숫자 타입</b>의 데이터를, 선택자를 이용해 종료할 때는 <b>객체 타입</b>의 데이터로 전달해야 합니다.`,
      `지정된 순서의 Alert이 이미 종료되었다면 <b>초기화 이전</b>까지는 작동하지 않습니다.`,
      `선택자 (아이디, 클래스)는 둘 중 하나만 전달해야 하며, 두개의 선택자가 전달되면 <b>아이디 선택자</b>가 우선순위를 가집니다.`,
    ],
  },
  {
    name: "clearAlert",
    id: "alert-clear-functional-wrapper",
    remakrs: "실행되어 있는 모든 알럿을 조건에 상관없이 모두 종료합니다.",
    props: { list: [] },
    exampleCode: funcForm({
      children: "Clear Alert",
      method: "clear",
      props: "",
    }),
    setExampleCode: <AlertFunctionalExampleComponents isClear />,
  },
];

export { alertFunctionalList };

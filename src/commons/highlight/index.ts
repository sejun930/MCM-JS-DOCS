import { changeObjectTemplate } from "src/main/commonsComponents/functional/code";

// highlight가 적용된 코드 및 그외 기능 렌더시 사용
export const getCommonsHighlight = {
  // 세미콜론
  semiColon: () => `<span class='lightGray'>;</span>`,
  // 콤마
  comma: () => `<span class='lightGray'>,</span>`,
  // 콤마 연속 처리
  getComma: (
    arr: string[],
    setting?: { removeTap?: boolean; removeLastComma?: boolean }
  ) => {
    // removeTap : 줄바꿈 처리 off
    // removeLastComma : 마지막 컴마 off

    const renderComma = (i: number) => {
      let result = getCommonsHighlight.comma();
      if (setting?.removeLastComma) {
        if (!arr[i + 1]) result = "";
      }
      return result;
    };

    const result = arr
      .map(
        (str, i) =>
          `${str}${renderComma(i)}${
            (arr[i + 1] && !setting?.removeTap && "\n") || ""
          }`
      )
      .join(" ");

    return result;
  },
  // 태그 렌더하기
  tag: {
    // 태그 만들기
    tag: ({
      tagName,
      children,
      endSpace,
      closeTag,
    }: {
      tagName: string;
      children?: string;
      endSpace?: string;
      closeTag?: {
        // 단독적으로 사용되는 태그
        props: string;
      };
    }) =>
      `<span><</span><span class='darkBlue'>${tagName}</span><span>${
        (closeTag && ` ${closeTag.props} <span>/</span>`) || ""
      }></span>${
        (!closeTag &&
          ` ${children || ""}${
            endSpace || ""
          }<span><</span><span>/</span><span class='darkBlue'>${tagName}</span><span>></span>`) ||
        ""
      }`,
    // 컴포넌트
    component: ({
      componentName,
      props,
      children,
      isClose,
      endSpace,
      childrenSpace,
    }: {
      componentName: string | null;
      props?: string;
      children?: string;
      isClose?: boolean;
      endSpace?: string; // 닫힘 컴포넌트의 공백 문자열
      childrenSpace?: string; // children 사이의 공백 문자열
    }) =>
      `<span><</span><span class='green'>${componentName || ""}</span>${
        props || ""
      }${(isClose && `<span>/</span>`) || ""}<span>></span>${
        !isClose ? childrenSpace || "" : ""
      }${(!isClose && `${children || ""}`) || ""}${
        !isClose ? endSpace || "" : ""
      }${
        (!isClose &&
          `<span><</span><span>/</span><span class='green'>${
            componentName || ""
          }</span><span>></span>`) ||
        ""
      }`,
    // span 태그
    span: (children: string) =>
      getCommonsHighlight.tag.tag({
        tagName: "span",
        children: getCommonsHighlight.colors(children).text,
        endSpace: " ",
      }),
    // p 태그
    p: (children: string) =>
      getCommonsHighlight.tag.tag({
        tagName: "p",
        children: getCommonsHighlight.colors(children).text,
        endSpace: " ",
      }),
    // div 태그
    div: (children: string, endSpace?: string) =>
      getCommonsHighlight.tag.tag({
        tagName: "div",
        children,
        endSpace,
      }),
    // img 태그
    img: (children: string) =>
      getCommonsHighlight.tag.tag({
        tagName: "img",
        closeTag: {
          props: children,
        },
      }),
    // `<span><</span><span class='darkBlue'>img</span>  <span>/></span>`,
    // button 태그
    button: ({
      children,
      clickEvent,
      endSpace,
    }: {
      children: string;
      clickEvent?: {
        eventName?: string; // 함수명
        code?: string; // 직접 입력
        useArrow?: boolean; // 화살표 함수 사용 여부
        hasStartSpace?: boolean; // 태그와 onClick 사이의 공백 여부
        props?: string; // 실행 이벤트의 props
      };
      endSpace?: string;
    }) =>
      `<span><</span><span class='darkBlue'>button</span>${
        (clickEvent &&
          clickEvent.hasStartSpace &&
          `
     `) ||
        ""
      }${
        (clickEvent &&
          ` <span class='skyblue'>onClick</span><span class='lightGray'>=</span><span class='blue'>{</span>${
            (clickEvent.useArrow &&
              `<span class='yellow'>()</span> <span class='blue2'>=></span> `) ||
            ""
          }${
            clickEvent.code
              ? clickEvent.code
              : `<span class='lightYellow'>${clickEvent.eventName}</span>${
                  (clickEvent.useArrow &&
                    `<span class='yellow'>(</span>${
                      clickEvent?.props || ""
                    }<span class='yellow'>)</span>`) ||
                  ""
                }`
          }<span class='blue'>${
            clickEvent?.props
              ? `
      `
              : ``
          }}</span>`) ||
        ""
      }${
        (clickEvent &&
          clickEvent.hasStartSpace &&
          `
    `) ||
        ""
      }<span>></span>${
        (clickEvent &&
          clickEvent.hasStartSpace &&
          `
    `) ||
        ""
      } ${children || ""}${
        (clickEvent &&
          clickEvent.hasStartSpace &&
          `
    `) ||
        ""
      }<span><</span><span>/</span><span class='darkBlue'>button</span><span>></span>`,
  },
  // 쌍따옴표로 감싸진 문자열 출력
  string: (text: string, semicolon?: boolean) =>
    // semicolon : 세미클론으로 종료 여부
    `<span class='lightOrange'>"${text}"</span>${
      (semicolon && getCommonsHighlight.semiColon()) || ""
    }`,
  // return 폼
  return: (code: string) =>
    `  <span class='purple'>return</span> <span class='deepPurple'>(</span>
    ${code}
  <span class='deepPurple'>)</span><span class='lightGray'>;</span>`,
  // 컴포넌트 props 폼
  props: (key: string, value: string) =>
    `${getCommonsHighlight.colors(key).key}${
      getCommonsHighlight.colors("=").text
    }${value}`,
  // 중괄호 폼
  curly: ({
    children,
    className,
    curlyHide,
    left,
  }: {
    children: string;
    className?: string;
    curlyHide?: boolean; // 중괄호 숨기기
    left?: string; // 마지막 객체의 위치값 조정
  }) =>
    `${(!curlyHide && `<span class=${className || "blue"}>{</span>`) || ""}${
      children || ""
    }${
      (!curlyHide &&
        `<span class=${className || "blue"}${
          (left && ` style="position : absolute; left:${left || "0px"}"`) || ""
        }>}</span>`) ||
      ""
    }`,
  // 객체 key-value 폼
  obj: (key: string, value: string) =>
    `${getCommonsHighlight.colors(key + ":").key} ${value}`,
  // 배열 폼
  array: ({
    arr,
    isState,
    className,
  }: {
    arr: Array<string>;
    isState?: boolean;
    className?: string;
  }) => {
    let _className = (isState && "deepPurple") || "yellow";
    if (className) _className = className;

    return `<span class=${_className}>[</span>${
      (arr &&
        arr.reduce(
          (acc, cur, i) =>
            `${acc + cur}${
              (i + 1 !== arr.length && `${getCommonsHighlight.comma()} `) || ""
            }`,
          ""
        )) ||
      ""
    }<span class=${_className}>]</span>`;
  },
  // state 폼
  state: ({
    stateName,
    stateValue,
    hideSetEvent,
  }: {
    stateName: string;
    stateValue: string;
    hideSetEvent?: boolean; // set 이벤트 가리기
  }) => {
    const arr = [
      getCommonsHighlight.colors(stateName).varName,
      getCommonsHighlight.function({
        funcName: `set${stateName[0].toUpperCase() + stateName.substring(1)}`,
      }),
    ];
    if (hideSetEvent) arr.pop();

    return `${getCommonsHighlight.colors().const} ${getCommonsHighlight.array({
      arr,
      isState: true,
    })} ${getCommonsHighlight.colors("=").text} ${getCommonsHighlight.function({
      funcName: "useState",
      setFunc: {
        children: stateValue,
      },
    })}`;
  },
  // function 폼
  function: ({
    funcName,
    setFunc,
    removeSemiColon,
  }: {
    funcName?: string;
    setFunc?: {
      funcColor?: string;
      color?: string;
      children: string;
    };
    removeSemiColon?: boolean;
  }) =>
    `<span class=${setFunc?.funcColor || "function"}>${funcName || ""}</span>${
      (setFunc &&
        `<span class=${setFunc.color || "deepPurple"}>(</span>${
          setFunc.children
        }<span class=${setFunc.color || "deepPurple"}>)</span>${
          (!removeSemiColon && getCommonsHighlight.semiColon()) || ""
        }`) ||
      ""
    }`,
  // 화살표 함수 선언 form
  makeFunction: ({
    funcName,
    children,
    curlyClass,
    props,
  }: {
    funcName: string | null;
    children: string | null;
    curlyClass?: string;
    props?: string;
  }) =>
    `${
      (funcName &&
        `${getCommonsHighlight.colors().const} ${getCommonsHighlight.function({
          funcName,
        })} ${getCommonsHighlight.colors("=").text} `) ||
      ""
    }${getCommonsHighlight.arrowFunction({
      returnValue: "",
      className: curlyClass || "deepPurple",
      props,
    })} ${getCommonsHighlight.curly({
      className: curlyClass || "deepPurple",
      children:
        (children &&
          `
    ${children}
  `) ||
        "",
    })}${(children && getCommonsHighlight.semiColon()) || ""}`,
  // 화살표 함수 폼
  arrowFunction: ({
    props,
    className,
    returnValue,
  }: {
    props?: string;
    className?: string;
    returnValue: string;
  }) =>
    `<span class=${className || "deepPurple"}>(</span>${
      props || ""
    }<span class=${
      className || "deepPurple"
    }>)</span> <span class='darkBlue'>=></span>${returnValue || ""}`,
  // import 폼
  import: (importName: Array<string>, from: string) =>
    `<span class="purple">import</span> ${getCommonsHighlight.curly({
      className: "yellow",
      children: ` ${importName.reduce(
        (acc, cur, i) =>
          `${acc + getCommonsHighlight.colors(cur).varName2}${
            (i + 1 !== importName.length &&
              getCommonsHighlight.comma() + " ") ||
            ""
          }`,
        ""
      )} `,
    })} <span class="purple">from</span> ${getCommonsHighlight.string(
      from
    )}${getCommonsHighlight.semiColon()}`,
  //
  // 각각의 상황에 맞는 컬러 반환
  colors: (children?: string) => {
    children = children || "";
    return {
      bool: `<span class="darkBlue">${children}</span>`, // boolean 타입
      comment: `<span class='lightGreen'>// ${children}</span>`, // 주석 처리
      text: `<span class='lightGray'>${children}</span>`, // 일반 텍스트 입력
      key: `<span class='skyblue'>${children}</span>`, // 객체의 key 및 props의 key 이름
      const: `<span class='darkBlue'>const</span>`, // const 선언
      varName: `<span class='blue1'>${children}</span>`, // 변수의 이름명 (진한색)
      varName2: `<span class='skyblue'>${children}</span>`, // 변수의 이름명 (약한색)
      number: `<span class="number">${children}</span>`, // 숫자
      method: (props?: {
        // 메서드 정보
        funcName?: string;
        funcColor?: string;
        children?: string;
      }) =>
        `<span class="blue3">${children}</span><span class=${
          props?.funcColor || "lightYellow"
        }>.${props?.funcName || ""}</span>${
          (props?.children &&
            `<span class="yellow">(</span>${props?.children}<span class="yellow">)</span>`) ||
          ""
        }`,
    };
  },
};

export type CommonsCodeFormType =
  | "bool"
  | "string"
  | "node"
  | "var"
  | "function"
  | "number";

// 공통으로 자주 사용되는 코드 폼
export const commonsCodeForm = ({
  form,
  key,
  value,
  type,
  changeCode,
}: {
  form?: "props" | "object";
  key: string;
  value?: string;
  type?: CommonsCodeFormType;
  changeCode?: string;
}) => {
  let code = "";
  const isObject = form === "object";

  // 기본 폼 구성 (props, object 형태 중 선택)
  const makeForm = (propsValue?: string) => {
    code = changeCode || getCommonsHighlight.props(key, propsValue || "");
    if (isObject) code = changeObjectTemplate(code, true);

    return code;
  };

  const func: { [key: string]: string } = {
    // boolean
    bool: getCommonsHighlight.curly({
      curlyHide: isObject,
      children: getCommonsHighlight.colors(value).bool,
    }),
    // string
    string: getCommonsHighlight.string(value || ""),
    // node
    node: getCommonsHighlight.curly({
      curlyHide: isObject,
      children: value || "",
    }),
    // var
    var: getCommonsHighlight.curly({
      curlyHide: isObject,
      children: getCommonsHighlight.colors(value).varName,
    }),
    // function
    function: getCommonsHighlight.curly({
      curlyHide: isObject,
      children: getCommonsHighlight.function({ funcName: value }),
    }),
    // number
    number: getCommonsHighlight.curly({
      curlyHide: isObject,
      children: getCommonsHighlight.colors(String(value)).number,
    }),
  };

  return makeForm((type && func[type]) || value);
};

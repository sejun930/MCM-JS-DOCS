// highlight가 적용된 코드 및 그외 기능 렌더시 사용
export const getCommonsHighlight = {
  // 세미콜론
  semiColon: () => `<span class='lightGray'>;</span>`,
  // 콤마
  comma: () => `<span class='lightGray'>,</span>`,
  // 콤마 연속 처리
  getComma: (arr: string[]) => {
    const result = arr
      .map(
        (str, i) =>
          `${str}${getCommonsHighlight.comma()}${(arr[i + 1] && "\n") || ""}`
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
            clickEvent.eventName
              ? `<span class='lightYellow'>${clickEvent.eventName}</span>${
                  (clickEvent.useArrow && `<span class='yellow'>()</span>`) ||
                  ""
                }`
              : clickEvent.code
          }<span class='blue'>}</span>`) ||
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
      } <span><</span><span>/</span><span class='darkBlue'>button</span><span>></span>`,
  },
  // 쌍따옴표로 감싸진 문자열 출력
  string: (text: string, semicolon?: boolean) =>
    // semicolon : 세미클론으로 종료 여부
    `<span class='lightOrange'>"${text}"</span>${
      (semicolon && getCommonsHighlight.semiColon()) || ""
    }`,
  // 숫자 타입 출력
  number: (num: number | string) => `<span class="number">${num}</span>`,
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
  }: {
    children: string;
    className?: string;
    curlyHide?: boolean; // 중괄호 숨기기
  }) =>
    `${(!curlyHide && `<span class=${className || "blue"}>{</span>`) || ""}${
      children || ""
    }${(!curlyHide && `<span class=${className || "blue"}>}</span>`) || ""}`,
  // 객체 key-value 폼
  obj: (key: string, value: string) =>
    `${getCommonsHighlight.colors(key + ":").key} ${value}`,
  // 배열 폼
  arr: (arr: Array<string>, isState?: boolean) =>
    `<span class=${(isState && "deepPurple") || "yellow"}>[</span>${
      (arr &&
        arr.reduce(
          (acc, cur, i) =>
            `${acc + cur}${
              (i + 1 !== arr.length && `${getCommonsHighlight.comma()} `) || ""
            }`,
          ""
        )) ||
      ""
    }<span class=${(isState && "deepPurple") || "yellow"}>]</span>`,
  // state 폼
  state: (stateName: string, stateValue: string) =>
    `${getCommonsHighlight.colors().const} ${getCommonsHighlight.arr(
      [
        getCommonsHighlight.colors(stateName).varName,
        getCommonsHighlight.function({
          funcName: `set${stateName[0].toUpperCase() + stateName.substring(1)}`,
        }),
        // getCommonsHighlight.colors("setIsAble").function,
      ],
      true
    )} ${getCommonsHighlight.colors("=").text} ${getCommonsHighlight.function({
      funcName: "useState",
      setFunc: {
        children: stateValue,
      },
    })}`,
  // function 폼
  function: ({
    funcName,
    setFunc,
  }: {
    funcName?: string;
    setFunc?: {
      color?: string;
      children: string;
    };
  }) =>
    `<span class='function'>${funcName || ""}</span>${
      (setFunc &&
        `<span class=${setFunc.color || "deepPurple"}>(</span>${
          setFunc.children
        }<span class=${
          setFunc.color || "deepPurple"
        }>)</span>${getCommonsHighlight.semiColon()}`) ||
      ""
    }`,
  // 화살표 함수 선언 form
  makeFunction: ({
    funcName,
    children,
    curlyClass,
  }: {
    funcName: string | null;
    children: string | null;
    curlyClass?: string;
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
    };
  },
};

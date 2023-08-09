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
      componentName: string;
      props?: string;
      children?: string;
      isClose?: boolean;
      endSpace?: string; // 닫힘 컴포넌트의 공백 문자열
      childrenSpace?: string; // children 사이의 공백 문자열
    }) =>
      `<span><</span><span class='green'>${componentName}</span>${props || ""}${
        (isClose && `<span>/</span>`) || ""
      }<span>></span>${!isClose ? childrenSpace || "" : ""}${
        (!isClose && `${children || ""}`) || ""
      }${!isClose ? endSpace || "" : ""}${
        (!isClose &&
          `<span><</span><span>/</span><span class='green'>${componentName}</span><span>></span>`) ||
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
  // return 폼
  return: (code: string) =>
    `  <span class='purple'>return</span> <span class='deepPurple'>(</span>
    ${code}
  <span class='deepPurple'>)</span><span class='lightGray'>;</span>`,
  // 컴포넌트 props 폼
  props: (key: string, value: string) =>
    `<span class='skyblue'>${key}</span>${
      getCommonsHighlight.colors("=").text
    }${value}`,
  // 중괄호 폼
  curly: (children: string) =>
    `<span class="blue">{</span>${children}<span class="blue">}</span>`,
  // 각각의 상황에 맞는 컬러 반환
  colors: (children: string) => {
    return {
      bool: `<span class="blue3">${children}</span>`, // boolean 타입
      comment: `<span class='lightGreen'>// ${children}</span>`, // 주석 처리
      text: `<span class='lightGray'>${children}</span>`, // 일반 텍스트 입력
    };
  },
};

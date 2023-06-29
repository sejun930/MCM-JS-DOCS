// highlight가 적용된 코드 및 그외 기능 렌더시 사용
export const getCommonsHighlight = {
  // 주석 처리
  comment: (text: string) => `<span class='lightGreen'>// ${text}</span>`,
  // 텍스트 입력
  text: (text: string) => `<span class='lightGray'>${text}</span>`,
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
    }: {
      tagName: string;
      children?: string;
      endSpace?: string;
    }) =>
      `<span><</span><span class='darkBlue'>${tagName}</span><span>></span> ${
        children || ""
      }${
        endSpace || ""
      }<span><</span><span>/</span><span class='darkBlue'>${tagName}</span><span>></span>`,
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
        children: getCommonsHighlight.text(children),
        endSpace: " ",
      }),
    // div 태그
    div: (children: string, endSpace?: string) =>
      getCommonsHighlight.tag.tag({
        tagName: "div",
        children,
        endSpace,
      }),
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
      }<span><</span><span>/</span><span class='darkBlue'>button</span><span>></span>`,
  },

  // 태그
  // tag: ({ tagName, children }: { tagName: string; children?: string }) =>
  //   `<span><</span><span class='darkBlue'>${tagName}</span><span>></span> ${
  //     children || ""
  //   } <span><</span><span>/</span><span class='darkBlue'>${tagName}</span><span>></span>`,
  // // span 태그
};

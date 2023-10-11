import { commonsCodeForm, getCommonsHighlight } from "src/commons/highlight";

export const popularCommonsExampleCode = {
  list: () =>
    commonsCodeForm({
      key: "list",
      value: getCommonsHighlight.colors("list").varName,
      type: "node",
    }),
  minHeight: (web?: number, mobile?: number) =>
    commonsCodeForm({
      key: "minHeight",
      value: getCommonsHighlight.curly({
        children: ` ${getCommonsHighlight.obj(
          "web",
          getCommonsHighlight.colors(web ? String(web) : "40").number
        )}${
          (mobile &&
            `${getCommonsHighlight.comma()} ${getCommonsHighlight.obj(
              "mobile",
              getCommonsHighlight.colors(String(mobile)).number
            )} `) ||
          " "
        }`,
        className: "yellow",
      }),
      type: "node",
    }),
  delay: (delay: string) =>
    commonsCodeForm({
      key: "delay",
      value: getCommonsHighlight.colors(delay).number,
      type: "node",
    }),
  styles: () =>
    commonsCodeForm({
      key: "popularStyles",
      value: getCommonsHighlight.curly({
        children: `
    ${getCommonsHighlight.obj(
      "backgroundColor",
      getCommonsHighlight.string("black")
    )}${getCommonsHighlight.comma()}
    ${getCommonsHighlight.obj(
      "color",
      getCommonsHighlight.string("white")
    )}${getCommonsHighlight.comma()}
`,
        className: "yellow",
      }),
      type: "node",
    }),
  responsiveStyles: () =>
    commonsCodeForm({
      key: "popularResponsiveStyles",
      value: getCommonsHighlight.curly({
        children: `
      ${getCommonsHighlight.obj(
        "web",
        getCommonsHighlight.curly({
          children: ` ${
            getCommonsHighlight.colors("웹 (768px 이상) 스타일").comment
          }
            ${getCommonsHighlight.obj(
              "backgroundColor",
              getCommonsHighlight.string("#C8FFE0")
            )}
      `,
          className: "deepPurple",
        })
      )}${getCommonsHighlight.comma()}
      ${getCommonsHighlight.obj(
        "mobile",
        getCommonsHighlight.curly({
          children: ` ${
            getCommonsHighlight.colors("모바일 (767px 이하) 스타일").comment
          }
              ${getCommonsHighlight.obj(
                "backgroundColor",
                getCommonsHighlight.string("#F9F3CC")
              )}${getCommonsHighlight.comma()}
              ${getCommonsHighlight.obj(
                "color",
                getCommonsHighlight.string("white")
              )}${getCommonsHighlight.comma()}
        `,
          className: "deepPurple",
        })
      )}${getCommonsHighlight.comma()}
`,
        className: "yellow",
      }),
      type: "node",
    }),
  setList: (props: string) =>
    commonsCodeForm({
      key: "setList",
      value: getCommonsHighlight.curly({
        children: `
      ${props || ""}
`,
        className: "yellow",
      }),
      type: "node",
    }),
  useSwipeMode: () =>
    commonsCodeForm({
      key: "useSwipeMode",
      value: getCommonsHighlight.colors("true").bool,
      type: "node",
    }),
  changeListEvent: () =>
    commonsCodeForm({
      key: "changeListEvent",
      value: getCommonsHighlight.function({
        funcName: "changeSelect",
      }),
      type: "node",
    }),
};

// 추가 옵션 코드
export const popularCommonsExampleCodeForm = {
  hideList: getCommonsHighlight.obj(
    "hide",
    getCommonsHighlight.colors("true").bool
  ),
  showRating: getCommonsHighlight.obj(
    "showRating",
    getCommonsHighlight.colors("true").bool
  ),
  hoverStyles: getCommonsHighlight.obj(
    "hoverStyles",
    getCommonsHighlight.curly({
      children: `
        ${getCommonsHighlight.getComma([
          getCommonsHighlight.obj(
            ` backgroundColor`,
            getCommonsHighlight.string("black")
          ),
          getCommonsHighlight.obj(
            `    color`,
            getCommonsHighlight.string("white")
          ),
          getCommonsHighlight.obj(
            `    padding`,
            getCommonsHighlight.string("8px")
          ),
        ])}
      `,
      className: "deepPurple",
    })
  ),
  listStyles: `${
    getCommonsHighlight.colors(
      "리스트의 스타일이 웹, 모바일에 동시 적용됩니다."
    ).comment
  }
    ${getCommonsHighlight.obj(
      "styles",
      getCommonsHighlight.curly({
        children: ` ${getCommonsHighlight.obj(
          "borderRadius",
          getCommonsHighlight.string("0px 0px 10px 10px")
        )} `,
        className: "deepPurple",
      })
    )}${getCommonsHighlight.comma()}
    ${getCommonsHighlight.obj(
      "responsiveStyles",
      getCommonsHighlight.curly({
        children: `
        ${
          getCommonsHighlight.colors(
            "리스트의 웹 (768px 이상) 환경의 스타일이 적용됩니다."
          ).comment
        }
        ${getCommonsHighlight.obj(
          "web",
          getCommonsHighlight.curly({
            children: ` ${getCommonsHighlight.obj(
              "backgroundColor",
              getCommonsHighlight.string("#bbbbbb")
            )} `,
          })
        )}${getCommonsHighlight.comma()}
        ${
          getCommonsHighlight.colors(
            "리스트의 모바일 (767px 이하) 환경의 스타일이 적용됩니다."
          ).comment
        }
        ${getCommonsHighlight.obj(
          "mobile",
          getCommonsHighlight.curly({
            children: ` ${getCommonsHighlight.obj(
              "backgroundColor",
              getCommonsHighlight.string("black")
            )} `,
          })
        )}
    `,
        className: "deepPurple",
      })
    )}`,
};

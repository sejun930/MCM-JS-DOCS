import { commonsCodeForm, getCommonsHighlight } from "src/commons/highlight";

export const popularCommonsExampleCode = {
  list: () =>
    commonsCodeForm({
      key: "list",
      value: getCommonsHighlight.colors("list").varName,
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
              )}
        `,
          className: "deepPurple",
        })
      )}${getCommonsHighlight.comma()}
`,
        className: "yellow",
      }),
      type: "node",
    }),
};

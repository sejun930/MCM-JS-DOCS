import { commonsCodeForm, getCommonsHighlight } from "src/commons/highlight";
import { moveLeft } from "src/main/commonsComponents/functional/code";

export const alertCommonsExampleCode = {
  children: (text: string) =>
    commonsCodeForm({
      key: "children",
      value: text,
      type: "string",
      form: "object",
    }),
  delay: (timer: number | "infinite") =>
    commonsCodeForm({
      key: "closeDelayTime",
      value: String(timer),
      type: typeof timer === "string" ? "string" : "number",
      form: "object",
    }),
  closeMode: (isSwipe?: boolean) =>
    commonsCodeForm({
      key: "useCloseMode",
      value: isSwipe
        ? getCommonsHighlight.curly({
            children: ` ${getCommonsHighlight.obj(
              "useSwipeMode",
              getCommonsHighlight.colors("true").bool
            )} `,
          })
        : "true",
      type: isSwipe ? "node" : "bool",
      form: "object",
    }),
  concept: (concept: string) =>
    commonsCodeForm({
      key: "alertConcept",
      value: getCommonsHighlight.curly({
        children: ` ${getCommonsHighlight.obj(
          "type",
          getCommonsHighlight.string(concept)
        )} `,
      }),
      type: "node",
      form: "object",
    }),
  styles: () =>
    commonsCodeForm({
      key: "alertStyles",
      value: getCommonsHighlight.curly({
        children: ` 
            ${moveLeft(
              30,
              getCommonsHighlight.obj(
                "backgroundColor",
                `${getCommonsHighlight.string(
                  "black"
                )}${getCommonsHighlight.comma()}`
              )
            )}
            ${moveLeft(
              30,
              getCommonsHighlight.obj(
                "color",
                `${getCommonsHighlight.string(
                  "white"
                )}${getCommonsHighlight.comma()}`
              )
            )}
            ${moveLeft(
              30,
              getCommonsHighlight.obj(
                "borderColor",
                `${getCommonsHighlight.string(
                  "white"
                )}${getCommonsHighlight.comma()}`
              )
            )}
          `,
        left: "10px",
      }),
      type: "node",
      form: "object",
    }),
  responsiveStyles: (isMobile?: boolean) =>
    commonsCodeForm({
      key: "alertResponsiveStyles",
      value: getCommonsHighlight.curly({
        children: `
            ${moveLeft(
              30,
              getCommonsHighlight.obj(
                isMobile ? "mobile" : "web",
                getCommonsHighlight.curly({
                  className: "yellow",
                  children: ` ${getCommonsHighlight.obj(
                    "backgroundColor",
                    getCommonsHighlight.string(isMobile ? "pink" : "blue")
                  )}${getCommonsHighlight.comma()} ${getCommonsHighlight.obj(
                    "color",
                    getCommonsHighlight.string(isMobile ? "blue" : "white")
                  )} `,
                })
              )
            )}
          `,
        left: "10px",
      }),
      type: "node",
      form: "object",
    }),
  custom: () =>
    commonsCodeForm({
      key: "alertConcept",
      value: getCommonsHighlight.curly({
        children: ` 
    ${getCommonsHighlight.obj(
      "type",
      getCommonsHighlight.string("custom")
    )}${getCommonsHighlight.comma()}
    ${getCommonsHighlight.obj(
      "custom",
      getCommonsHighlight.curly({
        className: "yellow",
        children: `
        ${getCommonsHighlight.obj(
          "color",
          getCommonsHighlight.string("#6527BE")
        )}${getCommonsHighlight.comma()} ${
          getCommonsHighlight.colors("알럿의 테두리 색을 지정합니다.").comment
        }
        ${getCommonsHighlight.obj(
          "icon",
          getCommonsHighlight.curly({
            className: "deepPurple",
            children: ` ${
              getCommonsHighlight.colors("알럿 아이콘 설정에 대한 객체입니다.")
                .comment
            }
            ${getCommonsHighlight.obj(
              "src",
              getCommonsHighlight.string("⭐")
            )}${getCommonsHighlight.comma()} ${
              getCommonsHighlight.colors("알럿의 아이콘(이모지)를 설정합니다.")
                .comment
            }
            ${getCommonsHighlight.obj(
              "color",
              getCommonsHighlight.string("#6527BE")
            )}${getCommonsHighlight.comma()} ${
              getCommonsHighlight.colors(
                "알럿의 아이콘(이모지)의 색상을 설정합니다. (null 입력시 기존 색상 유지)"
              ).comment
            }
            ${getCommonsHighlight.obj(
              "size",
              getCommonsHighlight.colors("12").number
            )}${getCommonsHighlight.comma()} ${
              getCommonsHighlight.colors(
                "알럿의 아이콘(이모지)의 크기를 설정합니다. (ex : 12 = 12px)"
              ).comment
            }
        `,
          })
        )}
    `,
      })
    )}
`,
      }),
      type: "node",
      form: "object",
    }),
  id: () =>
    commonsCodeForm({
      key: "id",
      value: "only",
      type: "string",
      form: "object",
    }),
};

import { getCommonsHighlight, commonsCodeForm } from "src/commons/highlight";

export const tooltipCommonsExampleCode = {
  tooltipString: (text: string, keyName?: string) =>
    commonsCodeForm({
      key: keyName || "tooltipText",
      value: text,
      type: "string",
    }),
  tooltipObject: (children: string) =>
    commonsCodeForm({
      key: "tooltipText",
      value: children,
      type: "node",
    }),
  useAnimation: commonsCodeForm({
    key: "useShowAnimation",
    value: "true",
    type: "bool",
  }),
  position: (position?: "top" | "bottom" | "left" | "right") =>
    commonsCodeForm({
      key: "position",
      value: position,
      type: "string",
    }),
  styles: (mobileVers?: boolean) =>
    ` ${getCommonsHighlight.props(
      mobileVers ? "tooltipMobileStyles" : "tooltipStyles",
      getCommonsHighlight.curly({
        children: `${getCommonsHighlight.curly({
          className: "yellow",
          children: `
        ${getCommonsHighlight.getComma([
          `${getCommonsHighlight.obj(
            `backgroundColor`,
            getCommonsHighlight.string(mobileVers ? "white" : "black")
          )}`,
          `       ${getCommonsHighlight.obj(
            `padding`,
            getCommonsHighlight.string(mobileVers ? "20px" : "16px")
          )}`,
          `       ${getCommonsHighlight.obj(
            "font",
            getCommonsHighlight.curly({
              className: "deepPurple",
              children: `
            ${getCommonsHighlight.getComma([
              `${getCommonsHighlight.obj(
                `color`,
                getCommonsHighlight.string(mobileVers ? "#F86F03" : "#9BE8D8")
              )}`,
              `           ${getCommonsHighlight.obj(
                `size`,
                getCommonsHighlight.string("20px")
              )}`,
              `           ${getCommonsHighlight.obj(
                `weight`,
                getCommonsHighlight.colors(String(mobileVers ? 500 : 700))
                  .number
              )}`,
            ])}
        `,
            })
          )}`,
          `       ${getCommonsHighlight.obj(
            "border",
            getCommonsHighlight.curly({
              className: "deepPurple",
              children: `
          ${getCommonsHighlight.getComma([
            `${getCommonsHighlight.obj(
              ` color`,
              getCommonsHighlight.string(mobileVers ? "#F86F03" : "#9BE8D8")
            )}`,
            `           ${getCommonsHighlight.obj(
              `width`,
              getCommonsHighlight.string("3px")
            )}`,
            `           ${getCommonsHighlight.obj(
              `radius`,
              getCommonsHighlight.string("0px")
            )}`,
          ])}
        `,
            })
          )}`,
        ])}
`,
        })}`,
      })
    )}`,
  disable: () =>
    commonsCodeForm({
      key: "isDisable",
      value: "true",
      type: "bool",
    }),
  onoff: () =>
    commonsCodeForm({
      key: "open",
      value: "true",
      type: "bool",
    }),
  offHover: () =>
    commonsCodeForm({
      key: "offHoverEvent",
      value: "true",
      type: "bool",
    }),
  hideMobile: () =>
    commonsCodeForm({
      key: "hideMobile",
      value: "true",
      type: "bool",
    }),
  isFix: () =>
    commonsCodeForm({
      key: "isFix",
      value: "true",
      type: "bool",
    }),
};

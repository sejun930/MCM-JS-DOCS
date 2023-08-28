import { getCommonsHighlight } from "src/commons/highlight";

export const tooltipCommonsExampleCode = {
  tooltipString: (text: string, keyName?: string) =>
    `${getCommonsHighlight.props(
      keyName || "tooltipText",
      getCommonsHighlight.string(text)
    )}`,
  tooltipObject: (children: string) =>
    `${getCommonsHighlight.props(
      "tooltipText",
      getCommonsHighlight.curly(children)
    )}`,
  useAnimation: getCommonsHighlight.props(
    "useShowAnimation",
    getCommonsHighlight.curly(getCommonsHighlight.colors("true").bool)
  ),
  position: (position?: "top" | "bottom" | "left" | "right") =>
    ` ${getCommonsHighlight.props(
      "position",
      getCommonsHighlight.string(position || "top")
    )}`,
  styles: (mobileVers?: boolean) =>
    ` ${getCommonsHighlight.props(
      mobileVers ? "tooltipMobileStyles" : "tooltipStyles",
      getCommonsHighlight.curly(
        `${getCommonsHighlight.curly(
          `
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
            getCommonsHighlight.curly(
              `
          ${getCommonsHighlight.getComma([
            `${getCommonsHighlight.obj(
              `color`,
              getCommonsHighlight.string(mobileVers ? "#F86F03" : "#9BE8D8")
            )}`,
            `         ${getCommonsHighlight.obj(
              `size`,
              getCommonsHighlight.string("20px")
            )}`,
            `         ${getCommonsHighlight.obj(
              `weight`,
              getCommonsHighlight.number(mobileVers ? 500 : 700)
            )}`,
          ])}
        `,
              "deepPurple"
            )
          )}`,
          `       ${getCommonsHighlight.obj(
            "border",
            getCommonsHighlight.curly(
              `
          ${getCommonsHighlight.getComma([
            `${getCommonsHighlight.obj(
              `color`,
              getCommonsHighlight.string(mobileVers ? "#F86F03" : "#9BE8D8")
            )}`,
            `         ${getCommonsHighlight.obj(
              `width`,
              getCommonsHighlight.string("3px")
            )}`,
            `         ${getCommonsHighlight.obj(
              `radius`,
              getCommonsHighlight.string("0px")
            )}`,
          ])}
        `,
              "deepPurple"
            )
          )}`,
        ])}
      `,
          "yellow"
        )}`
      )
    )}`,
  disable: () =>
    `${getCommonsHighlight.props(
      "isDisable",
      getCommonsHighlight.curly(getCommonsHighlight.colors("true").bool)
    )}`,
  onoff: () =>
    `${getCommonsHighlight.props(
      "open",
      getCommonsHighlight.curly(getCommonsHighlight.colors("true").bool)
    )}`,
  offHover: () =>
    `${getCommonsHighlight.props(
      "offHoverEvent",
      getCommonsHighlight.curly(getCommonsHighlight.colors("true").bool)
    )}`,
  hideMobile: () =>
    `${getCommonsHighlight.props(
      "hideMobile",
      getCommonsHighlight.curly(getCommonsHighlight.colors("true").bool)
    )}`,
  isFix: () =>
    `${getCommonsHighlight.props(
      "isFix",
      getCommonsHighlight.curly(getCommonsHighlight.colors("true").bool)
    )}`,
};

// interface Type {
//   [key: string]: () => string | number;
// }

// const testObj: Type = {
//   test1: () => `1111`,
//   test2: () => 222,
// };

// testObj.test1()

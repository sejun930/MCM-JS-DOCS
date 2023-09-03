import { getCommonsHighlight } from "src/commons/highlight";

export const modalExampleCommonsCodeForm = {
  size: (key: string, width: string, height: string, className?: string) => {
    return {
      key,
      value: getCommonsHighlight.curly({
        className: className || "yellow",
        children: getCommonsHighlight.getComma(
          [
            ` ${getCommonsHighlight.obj(
              "width",
              getCommonsHighlight.string(width)
            )}`,
            `${getCommonsHighlight.obj(
              "height",
              getCommonsHighlight.string(height)
            )} `,
          ],
          {
            removeTap: true,
            removeLastComma: true,
          }
        ),
      }),
    };
  },
  styles: (space?: string, isObejct?: boolean, isMobile?: boolean) => {
    const className = isObejct ? "yellow" : "deepPurple";
    space = space || "";

    return `${getCommonsHighlight.getComma(
      [
        ` 
          ${space}${getCommonsHighlight.obj(
          "wrapper",
          getCommonsHighlight.curly({
            className,
            children: `
            ${space}${getCommonsHighlight.obj(
              "backgroundColor",
              getCommonsHighlight.string(
                isMobile ? "rgba(100, 0, 50, 0.7)" : "rgba(30, 0, 50, 0.7)"
              )
            )}${getCommonsHighlight.comma()}
          ${space}`,
          })
        )}`,
        `         ${space}${getCommonsHighlight.obj(
          "items",
          getCommonsHighlight.curly({
            className,
            children: `
            ${getCommonsHighlight.getComma([
              `${space}` +
                getCommonsHighlight.obj(
                  "backgroundColor",
                  getCommonsHighlight.string("black")
                ),
              `           ${space}` +
                getCommonsHighlight.obj(
                  "border",
                  getCommonsHighlight.string("double 6px white")
                ),
              `           ${space}` +
                getCommonsHighlight.obj(
                  "borderRadius",
                  getCommonsHighlight.string("0px")
                ),
              `           ${space}` +
                getCommonsHighlight.obj(
                  "width",
                  getCommonsHighlight.string(isMobile ? "50%" : "250px")
                ),
              `           ${space}` +
                getCommonsHighlight.obj(
                  "height",
                  getCommonsHighlight.string(isMobile ? "40%" : "250px")
                ),
            ])}
          ${space}`,
          })
        )}`,
        `         ${space}${getCommonsHighlight.obj(
          "closeButton",
          getCommonsHighlight.curly({
            className,
            children: `
            ${getCommonsHighlight.getComma([
              `${space}${getCommonsHighlight.obj(
                "backgroundColor",
                getCommonsHighlight.string("black")
              )}`,
              `           ${space}${getCommonsHighlight.obj(
                "borderRadius",
                getCommonsHighlight.string(isMobile ? "0" : "100%")
              )}`,
              `           ${space}${getCommonsHighlight.obj(
                "border",
                getCommonsHighlight.string("solid 1px white")
              )}`,
              `           ${space}${getCommonsHighlight.obj(
                "marginTop",
                getCommonsHighlight.string("-10px")
              )}`,
            ])}
          ${space}`,
          })
        )}`,
        `         ${space}${getCommonsHighlight.obj(
          "contents",
          getCommonsHighlight.curly({
            className,
            children: `
          ${getCommonsHighlight.getComma([
            `  ${space}${getCommonsHighlight.obj(
              "backgroundColor",
              getCommonsHighlight.string("white")
            )}`,
            `           ${space}${getCommonsHighlight.obj(
              "width",
              getCommonsHighlight.string(isMobile ? "50%" : "90%")
            )}`,
          ])}
          ${space}`,
          })
        )}
`,
      ],
      {
        removeLastComma: true,
      }
    )}`;
  },
  buttonInfo: (isObject?: boolean) => {
    const space = (isObject && "  ") || "";

    return getCommonsHighlight.curly({
      className: (isObject && "blue") || "yellow",
      children: getCommonsHighlight.getComma(
        [
          `
          ${space}${getCommonsHighlight.obj(
            "buttonSize",
            getCommonsHighlight.string("25px")
          )}`,
          `
          ${space}${getCommonsHighlight.obj(
            "buttonWeight",
            getCommonsHighlight.colors("4").number
          )}`,
          `
          ${space}${getCommonsHighlight.obj(
            "buttonColor",
            getCommonsHighlight.string("#FFBB5C")
          )}
`,
        ],
        {
          removeTap: true,
          removeLastComma: true,
        }
      ),
    });
  },
};

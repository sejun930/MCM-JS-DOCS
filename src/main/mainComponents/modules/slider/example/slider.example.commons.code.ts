import { getCommonsHighlight, commonsCodeForm } from "src/commons/highlight";

export const sliderCommonsExampleCode = {
  useAnimation: commonsCodeForm({
    key: "useAnimation",
    value: "true",
    type: "bool",
  }),
  pagination: commonsCodeForm({
    key: "pagination",
    type: "node",
    value: getCommonsHighlight.curly({
      className: "yellow",
      children: ` ${getCommonsHighlight.obj(
        "showPageList",
        getCommonsHighlight.colors("true").bool
      )} `,
    }),
  }),
  autoPlay: commonsCodeForm({
    key: "useAutoPlay",
    type: "node",
    value: getCommonsHighlight.curly({
      className: "yellow",
      children: ` ${getCommonsHighlight.obj(
        "delay",
        getCommonsHighlight.colors("3000").number
      )} `,
    }),
  }),
  setArrow: (value: "hide" | "showHover" | "contents") => {
    const code: { [key: string]: string } = {
      hide: getCommonsHighlight.obj(
        "hide",
        getCommonsHighlight.colors("true").bool
      ),
      showHover: getCommonsHighlight.obj(
        "showHover",
        getCommonsHighlight.colors("true").bool
      ),
      contents: getCommonsHighlight.obj(
        "contents",
        getCommonsHighlight.string("⬅")
      ),
    };

    return commonsCodeForm({
      key: "setArrow",
      type: "node",
      value: `${getCommonsHighlight.curly({
        className: "yellow",
        children: ` ${code[value]} `,
      })}`,
    });
  },
  timer: commonsCodeForm({
    key: "useAutoPlay",
    type: "node",
    value: getCommonsHighlight.curly({
      className: "yellow",
      children: getCommonsHighlight.getComma(
        [
          ` ` +
            getCommonsHighlight.obj(
              "delay",
              getCommonsHighlight.colors("3000").number
            ),
          getCommonsHighlight.obj(
            "showTimer",
            getCommonsHighlight.colors("true").bool
          ) + ` `,
        ],
        { removeTap: true, removeLastComma: true }
      ),
    }),
  }),
  useSwipeMode: (num?: string) =>
    commonsCodeForm({
      key: "useSwipeMode",
      type: "node",
      value: getCommonsHighlight.curly({
        className: "yellow",
        children: ` ${getCommonsHighlight.obj(
          "sideMovePercent",
          getCommonsHighlight.colors(num || "30").number
        )} `,
      }),
    }),
  firstPage: commonsCodeForm({
    key: "firstPage",
    value: "3",
    type: "number",
  }),
  listMinHeight: commonsCodeForm({
    key: "listMinHeight",
    value: getCommonsHighlight.curly({
      className: "yellow",
      children: ` ${getCommonsHighlight.getComma(
        [
          getCommonsHighlight.obj("web", getCommonsHighlight.string("200px")),
          getCommonsHighlight.obj(
            "mobile",
            getCommonsHighlight.string("160px")
          ),
        ],
        { removeTap: true, removeLastComma: true }
      )} `,
    }),
    type: "node",
  }),
  changePageEvent: commonsCodeForm({
    key: "changePageEvent",
    value: getCommonsHighlight.function({
      funcName: "changeEvent",
    }),
    type: "node",
  }),
};

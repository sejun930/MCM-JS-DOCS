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
  hideArrow: commonsCodeForm({
    key: "hideArrow",
    value: "true",
    type: "bool",
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
  useSwipeMode: commonsCodeForm({
    key: "useSwipeMode",
    type: "node",
    value: getCommonsHighlight.curly({
      className: "yellow",
      children: ` ${getCommonsHighlight.obj(
        "sideMovePercent",
        getCommonsHighlight.colors("30").number
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
          getCommonsHighlight.obj("web", getCommonsHighlight.string("240px")),
          getCommonsHighlight.obj(
            "mobile",
            getCommonsHighlight.string("200px")
          ),
        ],
        { removeTap: true, removeLastComma: true }
      )} `,
    }),
    type: "node",
  }),
};

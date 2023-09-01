import { getCommonsHighlight } from "src/commons/highlight";

export const modalPropsCommonsCode = {
  size: [
    {
      key: "wrapper",
      value: getCommonsHighlight.string(""),
    },
    {
      key: "height",
      value: getCommonsHighlight.string(""),
    },
  ],
  styles: (isObject?: boolean) => {
    const keyName = ["wrapper", "items", "closeButton", "contents"];
    const commonsStyles = getCommonsHighlight.curly({
      children: "",
      className: isObject ? "yellow" : "deepPurple",
    });

    return keyName.map((el) => {
      return { key: el, value: commonsStyles };
    });
  },
  closeBtn: [
    {
      key: "buttonSize",
      value: getCommonsHighlight.colors(String(0)).number,
    },
    {
      key: "buttonWeight",
      value: getCommonsHighlight.colors(String(0)).number,
    },
    {
      key: "buttonColor",
      value: getCommonsHighlight.string("black"),
    },
  ],
};

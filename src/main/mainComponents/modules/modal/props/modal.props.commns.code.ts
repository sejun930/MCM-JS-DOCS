import {
  getPropsCodeTemplate,
  getObjectTemplate,
} from "src/main/commonsComponents/functional";
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
      value: getCommonsHighlight.number(0),
    },
    {
      key: "buttonWeight",
      value: getCommonsHighlight.number(0),
    },
    {
      key: "buttonColor",
      value: getCommonsHighlight.string("black"),
    },
  ],
};

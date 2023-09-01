import {
  CommonsCodeFormType,
  commonsCodeForm,
  getCommonsHighlight,
} from "src/commons/highlight";
import { modalExampleCommonsCodeForm } from "./modal.example.commons.code.form";

export const modalCommonsExampleCode = (form: "object" | "props") => {
  const commonsForm = (info: {
    key: string;
    value: string;
    type: CommonsCodeFormType;
  }) =>
    commonsCodeForm({
      ...info,
      form,
    });

  const isObject = form === "object";

  return {
    children: (text: string) =>
      commonsForm({
        key: "children",
        value: getCommonsHighlight.tag.span(text),
        type: "node",
      }),
    show: commonsForm({
      key: "show",
      value: "isOpen",
      type: "var",
    }),
    onCloseModal: commonsForm({
      key: "onCloseModal",
      value: "closeModal",
      type: "function",
    }),
    showBGAnimation: commonsForm({
      key: "showBGAnimation",
      value: "true",
      type: "bool",
    }),
    showModalOpenAnimation: commonsForm({
      key: "showModalOpenAnimation",
      value: "true",
      type: "bool",
    }),
    modalSize: (width: string, height: string) =>
      commonsForm({
        ...modalExampleCommonsCodeForm.size(
          "modalSize",
          width,
          height,
          (isObject && "blue") || ""
        ),
        type: "node",
      }),
    mobileModalSize: (width: string, height: string) =>
      commonsForm({
        ...modalExampleCommonsCodeForm.size(
          "mobileModalSize",
          width,
          height,
          (isObject && "blue") || ""
        ),
        type: "node",
      }),
    modalStyles: commonsForm({
      key: "modalStyles",
      value: getCommonsHighlight.curly({
        className: isObject ? "blue" : "yellow",
        children: modalExampleCommonsCodeForm.styles(
          isObject ? "  " : "",
          isObject
        ),
      }),
      type: "node",
    }),
    mobileModalStyles: commonsForm({
      key: "mobileModalStyles",
      value: getCommonsHighlight.curly({
        className: isObject ? "blue" : "yellow",
        children: modalExampleCommonsCodeForm.styles(
          isObject ? "  " : "",
          isObject,
          true
        ),
      }),
      type: "node",
    }),
    hideCloseButton: commonsForm({
      key: "hideCloseButton",
      value: "true",
      type: "bool",
    }),
    closeMent: (text: string) =>
      commonsForm({
        key: "closeMent",
        value: text,
        type: "string",
      }),
    closeButtonInfo: commonsForm({
      key: "closeButtonInfo",
      value: modalExampleCommonsCodeForm.buttonInfo(isObject),
      type: "node",
    }),
    offAutoClose: commonsForm({
      key: "offAutoClose",
      value: "true",
      type: "bool",
    }),
    onFixWindow: commonsForm({
      key: "onFixWindow",
      value: "true",
      type: "bool",
    }),
    autoCloseTimer: (timer: number) =>
      commonsForm({
        key: "autoCloseTimer",
        value: String(timer),
        type: "number",
      }),
  };
};

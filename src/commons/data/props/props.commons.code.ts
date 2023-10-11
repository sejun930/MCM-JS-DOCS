import { changeObjectTemplate } from "src/main/commonsComponents/functional/code";
import { getCommonsHighlight, commonsCodeForm } from "src/commons/highlight";
import {
  PropsModuleListType,
  PropsModuleListResultType,
  PropsCodeTypes,
} from "src/main/commonsComponents/units/template/form/props/props.types";

export const getPropsForm = (
  info: PropsModuleListType,
  isObject?: boolean
): PropsModuleListResultType => {
  const { name, type, notice, isRequired, code, changeCode } = info;
  const _default = info.default;

  let _code: PropsCodeTypes | string = { ...code };
  if (changeCode) _code = changeCode as string;

  return {
    name,
    type,
    default: _default,
    notice,
    isRequired,
    code: propsCommonsCodeList({
      key: name,
      isObject,
      code: _code,
    }),
  };
};

// props 예시용 코드 폼
export const propsCommonsCodeList = ({
  key,
  isObject,
  code,
}: {
  key: string;
  isObject?: boolean;
  code: PropsCodeTypes | string;
}): string => {
  let [type, argu] = ["", ""];
  if (typeof code === "object") {
    type = code.type;
    argu = code.argu;
  }

  // const { type, argu } = code;
  const getKey = (value: string) =>
    commonsCodeForm({
      key,
      value,
    });

  const func: { [key: string]: string | ((props: any) => string) } = {
    // 함수
    function: getKey(
      getCommonsHighlight.curly({
        curlyHide: isObject,
        children: getCommonsHighlight.makeFunction({
          funcName: null,
          children: null,
          curlyClass: isObject ? "blue" : "deepPurple",
          props: argu ? getCommonsHighlight.colors(argu).varName2 : "",
        }),
      })
    ),
    // boolean
    bool: getKey(
      !isObject
        ? getCommonsHighlight.curly({
            children: getCommonsHighlight.colors(argu || "false").bool,
          })
        : getCommonsHighlight.colors(argu || "false").bool
    ),
    // 문자열
    string: (text?: string) => getKey(getCommonsHighlight.string(text || "")),
    // 객체
    obj: (list: Array<{ key: string; value: string }>) =>
      getKey(
        getCommonsHighlight.curly({
          children: getCommonsHighlight.curly({
            curlyHide: isObject,
            className: "yellow",
            children:
              (list.length &&
                `
 ${getCommonsHighlight.getComma(
   list.map((el) => ` ${getCommonsHighlight.obj(el.key, el.value)}`)
 )}
`) ||
              "",
          }),
        })
      ),
    // 숫자
    number: (num?: number): string =>
      getKey(
        getCommonsHighlight.curly({
          children: getCommonsHighlight.colors(String(num || 0)).number,
          curlyHide: isObject,
        })
      ),
    // 배열
    array: () =>
      getKey(
        getCommonsHighlight.curly({
          children: getCommonsHighlight.array({ arr: [], className: "blue" }),
          curlyHide: isObject,
          className: "deepPurple",
        })
      ),
    // 개별 설정
    custom: () => getKey(argu || ""),
  };

  let result: string = "";

  if (typeof code === "string") result = code;
  else if (type)
    // @ts-ignore
    result = typeof func[type] === "function" ? func[type](argu) : func[type];

  if (isObject) result = changeObjectTemplate(result, typeof code === "string");

  return result;
};

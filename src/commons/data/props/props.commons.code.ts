import { changeObjectTemplate } from "src/main/commonsComponents/functional/code";
import { getCommonsHighlight, commonsCodeForm } from "src/commons/highlight";
import {
  PropsModuleListType,
  PropsModuleListResultType,
  PropsCodeTypes,
} from "./props.commons.data";

export const getPropsForm = (
  info: PropsModuleListType,
  isObject?: boolean
): PropsModuleListResultType => {
  const { name, type, notice, isRequired, code } = info;
  const _default = info.default;

  return {
    name,
    type,
    default: _default,
    notice,
    isRequired,
    code: propsCommonsCodeList({ key: name, isObject, code: { ...code } }),
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
  code: PropsCodeTypes;
}): string => {
  const { type, argu } = code;
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
        }),
      })
    ),
    // boolean
    bool: getKey(
      !isObject
        ? getCommonsHighlight.curly({
            children: getCommonsHighlight.colors("false").bool,
          })
        : getCommonsHighlight.colors("false").bool
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
            children: `
 ${getCommonsHighlight.getComma(
   list.map((el) => ` ${getCommonsHighlight.obj(el.key, el.value)}`)
 )}
`,
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
  };

  // @ts-ignore
  let result = typeof func[type] === "function" ? func[type](argu) : func[type];
  if (isObject) result = changeObjectTemplate(result);

  return result;
};

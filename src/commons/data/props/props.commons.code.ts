import { getPropsCodeTemplate } from "src/main/commonsComponents/functional";
import { getCommonsHighlight } from "src/commons/highlight";
import { PropsModuleListType } from "./props.commons.data";

// export const getPropsForm = <T>(
//   props: Omit<PropsModuleListType, "code">
// ): PropsModuleListType => {
//   const { name, type, notice, isRequired } = props;
//   const _default = props.default;

//   return {
//     name,
//     type,
//     default: _default,
//     notice,
//     isRequired,
//   };
// };

// name: "children",
// default: '""',
// type: "String | Node",
// notice: "툴팁 메세지가 출력되는 Hover 이벤트가 적용될 대상입니다.",
// isRequired: true,
// code: propsCommonsCodeList("children").string(""),

// props 예시용 코드 폼
export const propsCommonsCodeList = (key: string, isObject?: boolean) => {
  const getKey = (value: string) => getPropsCodeTemplate({ key, value });

  return {
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
   list.map((el) => `${getCommonsHighlight.obj(el.key, el.value)}`)
 )}
`,
          }),
        })
      ),
    // 숫자
    number: (num?: number): string =>
      getKey(
        getCommonsHighlight.curly({
          children: getCommonsHighlight.number(num || 0),
          curlyHide: isObject,
        })
      ),
  };
};

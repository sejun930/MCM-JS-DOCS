import { getCommonsHighlight } from "src/commons/highlight";
import { moveDocument } from "..";

// 카카오에 대한 window 객체 타입 정의
declare const window: typeof globalThis & {
  _propsList: { [key: string]: () => void };
  _propsVarList: { [key: string]: string };
};

// 코드 관련 함수

// 태그 제거하기
const removeTag = (str: string): string =>
  (str &&
    str
      .split("<span")
      .map((el) =>
        el
          .substring(el.indexOf(">") + 1)
          .split("</span>")
          .join("")
      )
      .join("")) ||
  "";

// 탭 (공백) 적용하기
const getTap = (str: string) => {
  // 2줄 처리하기
  return str
    .split("/&tap&/")
    .join(
      `
`
    )
    .split("/&tap2&/").join(`
    
`);
};

// 코드 복사하기
const copyCode = (text: string) => {
  navigator.clipboard.writeText(removeTag(text));
};

// 컴포넌트 props code 형태를 객체 code 형태로 변경
const changeObjectTemplate = (code: string, hideComma?: boolean) => {
  return `${(code && code.replace(">=<", ">: <")) || ""}${
    (!hideComma && getCommonsHighlight.comma()) || ""
  }`;
};

// 코드 강조하기
const getBoldCode = ({
  code,
  hide,
  propsName,
  id,
  width,
}: {
  code: string;
  hide?: boolean;
  propsName?: string;
  id?: string;
  width?: string;
}) => {
  if (typeof window === "undefined") return "";
  if (propsName) {
    // 함수를 저장할 객체 초기 생성
    if (!window._propsList) window._propsList = {};
    // 변수명을 저장할 객체 초기 생성
    if (!window._propsVarList) window._propsVarList = {};

    // 해당 PropsName의 이름으로 함수 및 변수명 저장
    if (!window._propsList[propsName])
      setTimeout(() => {
        window._propsList[propsName] = () =>
          moveDocument({
            id: id || `module-props-list-${propsName}`,
            bonus: -60,
            focus: true,
          }); // 함수 저장
      }, 0);
    // @ts-ignore
    window._propsVarList[`props_${propsName}`] = propsName; // 변수 저장
  }

  if (hide) return code;
  return `<button class="bold-code" style='width:${
    width || "auto"
  }' onclick="window._propsList[window._propsVarList['props_${propsName}']]()" name="bold-code">${code}</button name="bold-code-end">`;
};

// 강조 태그 삭제하기
const removeBoldTag = (code: string) => {
  while (code.includes('</button name="bold-code-end">')) {
    const splitResult = code.substring(
      code.indexOf('<button class="bold-code"'),
      code.indexOf('name="bold-code">') + 17
    );
    code = code.replace(splitResult, "");
    code = code.replace('</button name="bold-code-end">', "");
  }
  return code;
};

// 위치 조정하기
const moveLeft = (left: number, children: string) => {
  return `<span style="position : absolute; left : ${left}px">${children}</span>`;
};

export {
  removeTag,
  getTap,
  copyCode,
  changeObjectTemplate,
  getBoldCode,
  removeBoldTag,
  moveLeft,
};

import { getCommonsHighlight } from "src/commons/highlight";
import { moveDocument } from "..";

// 카카오에 대한 window 객체 타입 정의
declare const window: typeof globalThis & {
  _onMoveProps: (propsName: string) => void;
  _moveList: { [key: string]: () => void };
};

// 코드 관련 함수

// 태그 제거하기
const removeTag = (str: string): string =>
  str
    .split("<span")
    .map((el) =>
      el
        .substring(el.indexOf(">") + 1)
        .split("</span>")
        .join("")
    )
    .join("");

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
  return `${code.replace(">=<", ">: <")}${
    (!hideComma && getCommonsHighlight.comma()) || ""
  }`;
};

// 코드 강조하기
const getBoldCode = ({ code, hide }: { code: string; hide?: boolean }) => {
  // 클릭 이벤트 실행
  // const onMoveProps = (propsName: string) => () => {
  //   moveProps(propsName);
  // };

  // // props 이동 이벤트 실행
  // const moveProps = (propsName: string) => {
  //   console.log(propsName);
  //   moveDocument(`module-props-list-${propsName}`);
  // };

  // setTimeout(() => {
  //   if (!window._moveList) window._moveList = {};
  //   else if (!window._moveList[propsName])
  //     window._moveList[propsName] = onMoveProps(propsName);
  //   window._onMoveProps = onMoveProps;
  // }, 0);

  // const moveFn = window._moveList[propsName];

  if (hide) return code;
  return `<button class="bold-code" name="bold-code">${code}</button name="bold-code-end">`;
};

// 강조 태그 삭제하기
const removeBoldTag = (code: string) => {
  return code
    .split('<button class="bold-code" name="bold-code">')
    .join("")
    .split('</button name="bold-code-end">')
    .join("");
};

export {
  removeTag,
  getTap,
  copyCode,
  changeObjectTemplate,
  getBoldCode,
  removeBoldTag,
};

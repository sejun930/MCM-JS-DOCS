import { getCommonsHighlight } from "src/commons/highlight";
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

export { removeTag, getTap, copyCode, changeObjectTemplate };

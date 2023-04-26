// highlight가 적용된 코드 및 그외 기능 렌더시 사용
export const getCommonsHighlight = {
  // 주석 처리
  comment: (text: string) => `<span class='lightGreen'>// ${text}</span>`,
  // 텍스트 입력
  text: (text: string) => `<span class='lightGray'>${text}</span>`,
  // 세미콜론
  semiColon: () => `<span class='lightGray'>;</span>`,
  // 콤마
  comma: () => `<span class='lightGray'>,</span>`,
  // 콤마 연속 처리
  getComma: (arr: string[]) => {
    const result = arr
      .map(
        (str, i) =>
          `${str}${getCommonsHighlight.comma()}${(arr[i + 1] && "\n") || ""}`
      )
      .join(" ");
    return result;
  },
};

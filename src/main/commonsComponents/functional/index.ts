// 태그 제거하기
const removeTag = (str: string) => {
  return str
    .split("</span>")
    .map((el) =>
      el.replace(el.substring(el.indexOf("<span"), el.indexOf(">") + 1), "")
    )
    .join("");
};

export { removeTag };

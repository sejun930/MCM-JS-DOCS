// 공백 2칸을 주고 싶다면 /&tap2&/ 를 추가
import { CodeInfoTypes } from "src/main/mainComponents/modules/modal/example/modal.example.code.data";

export default function HowUseScriptComponnet() {
  // 해당 모듈의 이름으로 호출하는 코드 출력
  const getHowUseExampleCode = (
    module: string,
    codeInfo: CodeInfoTypes
  ): string => {
    let str = "";
    str += `<span class='purple'>import</span>`;
    str += `<span class='yellow'> { </span>`;
    str += `<span class='skyblue'>_${module}</span>`;
    str += `<span class='yellow'> } </span>`;
    str += `<span class='purple'>from</span>`;
    str += `<span class='lightOrange'> "mcm-js"</span>`;
    str += `<span class='lightGray'>;</span>`;

    // 추가 import 렌더하기
    if (codeInfo?.import) {
      str += getImportCode(codeInfo.import);
    }

    str += "/&tap2&/<span class='purple'>export default</span>";
    str += "<span class='darkBlue'> function</span>";
    str += "<span class='lightYellow'> ExamplePage</span>";
    str += "<span class='yellow'>() {</span>";
    str += `/&tap&/${codeInfo.code}`;

    return str;
  };

  // 추가로 import 할 모듈 구성
  const getImportCode = (info: { [key: string]: string[] | string }) => {
    let str = ``;
    for (const key in info) {
      str += `/&tap&/<span class='purple'>import</span>${
        Array.isArray(info[key])
          ? `<span class='yellow'> { </span>` +
            Array.from(info[key])
              .map((el: string) => `<span class='skyblue'>${el}</span>`)
              .join("<span class='lightGray'>,</span> ") +
            `<span class='yellow'> } </span>`
          : `<span class='skyblue'> ${info[key]} </span>`
      }<span class='purple'>from</span> <span class='lightOrange'>"${key}"</span><span class='lightGray'>;</span>`;
    }

    return str;
  };

  return {
    getHowUseExampleCode,
  };
}

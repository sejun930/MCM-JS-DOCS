import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import {
  exampleCommonsList,
  exampleCommonsReturnList,
} from "src/commons/data/example/example.commons.data";

// 공백 2칸을 주고 싶다면 /&tap2&/ 를 추가

export default function getExampleCodeComponnet() {
  const [module] = useRecoilState(moduleState);
  const commonsInfo = exampleCommonsList[module];

  // 해당 모듈의 이름으로 호출하는 코드 출력
  const getExampleCode = (code: string): string => {
    let str = "";
    str += `<span class='purple'>import</span>`;
    str += `<span class='yellow'> { </span>`;
    str += `<span class='skyblue'>_${module}</span>`;
    str += `<span class='yellow'> } </span>`;
    str += `<span class='purple'>from</span>`;
    str += `<span class='lightOrange'> "mcm-js"</span>`;
    str += `<span class='lightGray'>;</span>`;

    // 추가 import 렌더하기
    if (commonsInfo?.import) {
      str += getImportCode(commonsInfo.import);
    }

    str += "/&tap2&/<span class='purple'>export default</span>";
    str += "<span class='darkBlue'> function</span>";
    str += `<span class='lightYellow'> ${module}ExamplePage</span>`;
    str += "<span class='yellow'>() {</span>";

    // 공통으로 사용되는 코드 렌더
    if (commonsInfo?.code) {
      str += `${commonsInfo.code}`;
    }

    str += `/&tap&/${getReturn(getCommonsReturn(code))}`;
    str += "/&tap&/<span class='yellow'>}</span>";

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

  // return 붙여서 렌더하기
  const getReturn = (code: string) => {
    const str = `  <span class='purple'>return (</span>
    ${code}
  <span class='purple'>)</span><span class='lightGray'>;</span>`;

    return str;
  };

  // return 안에서 모듈 각각의 공통 태그들 추가하기
  const getCommonsReturn = (code: string) => {
    const returnInfo = exampleCommonsReturnList[module];

    if (returnInfo) return returnInfo(code);
    return code;
  };

  return {
    getExampleCode,
    getReturn,
    getCommonsReturn,
  };
}

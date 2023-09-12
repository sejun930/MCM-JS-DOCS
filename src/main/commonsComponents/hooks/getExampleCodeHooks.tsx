import {
  ExampleCommonsTypes,
  exampleCommonsList,
  exampleCommonsReturnList,
} from "src/commons/data/example/example.commons.data";
import React from "react";
import { getCommonsHighlight } from "src/commons/highlight";

// 공백 2칸을 주고 싶다면 /&tap2&/ 를 추가

export default function getExampleCodeComponnet() {
  // 해당 모듈의 이름으로 호출하는 코드 출력
  const getExampleCode = ({
    code,
    children,
    idx,
    changeContent,
    funcName,
    module,
    vers,
    returnStr,
    addImport,
  }: {
    code: string;
    children: React.ReactNode | string;
    idx?: number;
    changeContent?: string;
    funcName?: string;
    module: string;
    vers?: number;
    returnStr?: string;
    addImport?: { [key: string]: string[] | string };
  }): string => {
    const getCommonsInfo:
      | Array<ExampleCommonsTypes>
      | ExampleCommonsTypes
      | null =
      (exampleCommonsList && exampleCommonsList[module || "Modal"]) || null;

    const commonsInfo: ExampleCommonsTypes | null =
      getCommonsInfo && Array.isArray(getCommonsInfo)
        ? getCommonsInfo[vers || 0]
        : getCommonsInfo;

    let str = getCommonsHighlight.import(
      [module],
      // 개발환경 및 배포환경 분기
      process.env.NODE_ENV === "development" ? `mcm-js-dev` : `mcm-js`
    );

    // 추가 import 렌더하기
    if (commonsInfo && commonsInfo?.import) {
      str += getImportCode(commonsInfo.import);
    }
    if (addImport) {
      str += getImportCode(addImport);
      // addImport.forEach((el) => (str += getImportCode(el)));
    }

    str += "/&tap2&/<span class='purple'>export default</span>";
    str += "<span class='darkBlue'> function</span>";
    str += `<span class='lightYellow'> ${module}ExamplePage</span>`;
    str += "<span class='yellow'>() {</span>";

    // 공통으로 사용되는 코드 렌더
    if (commonsInfo && commonsInfo?.code) {
      str += `${commonsInfo.code}`;
    }

    if (!returnStr) {
      const getReturnStr = getCommonsHighlight.return(
        getCommonsReturn({
          code,
          children,
          idx: idx || 0,
          changeContent,
          funcName,
          module,
        }) || code
      );
      if (getReturnStr) str += `/&tap&/${getReturnStr}`;
    } else
      str += `
  ${returnStr}`;
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

  // return 안에서 모듈 각각의 공통 태그들 추가하기
  const getCommonsReturn = ({
    code,
    children,
    idx,
    changeContent,
    funcName,
    module,
  }: {
    code: string;
    children: React.ReactNode | string;
    idx: number;
    changeContent?: string;
    funcName?: string;
    module: string;
  }): string => {
    const returnInfo = exampleCommonsReturnList({
      changeContent: changeContent || "",
      funcName,
    })[module];
    // let _children = children;
    // if (typeof children === "string") {
    //   _children = `<span class='lightGray'>${children}</span>`;
    // }

    // 적용된 최종 결과 코드
    if (returnInfo) {
      const resultCode = returnInfo(code, children);
      // 배열, 문자열 분기화
      return typeof resultCode === "string" ? resultCode : resultCode[idx || 0];
    }
    return code;
  };

  return {
    getExampleCode,
    getCommonsReturn,
  };
}

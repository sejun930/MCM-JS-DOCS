import { ExampleCommonsTypes } from "src/commons/data/example/example.commons.data";
import { getCommonsHighlight } from "src/commons/highlight";
import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";

// 해당 모듈을 실행하기 위한 공통적인 준비물
export const tooltipCommonsData: ExampleCommonsTypes = {
  // prettier-ignore
  code: `
  333
  `,
  import: { react: ["useState"] },
};

export const tooltipCodeInfo = {
  title: [],
  basic: [
    `
  333
  `,
  ],
};

// Modal 각각의 예시 코드를 저장하는 객체
export const tooltipCodeList: ExampleCodeListTypes = {
  title: ["With State", "Use in Function"],
  basic: [`22`, `33`],
};

export const tooltipReturnCommonsData = () => {
  return 1111;
};

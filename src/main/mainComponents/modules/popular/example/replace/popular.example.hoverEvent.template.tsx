import { useState } from "react";
import { getLibraries } from "src/main/commonsComponents/functional/modules";
import { popularCommonsExampleCode } from "../popular.example.commons.code";
import { getBoldCode } from "src/main/commonsComponents/functional/code";

import { getCommonsHighlight } from "src/commons/highlight";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
const { getExampleCode } = getExampleCodeComponnet();

const { Popular } = getLibraries();
export default function PopularExampleHoverEventTemplate() {
  const [list] = useState([
    "서해안 골뱅이 500g",
    "허니레몬 캔디 450p 1.26kg, 1개",
    "프로틴 더블 리치 초콜릿 맛, 2.268kg",
    "국내산 논 우렁살 (냉장), 180g, 1개",
    "[원두커피1kg] 갓 볶은 신선한 원두커피 1kg",
  ]);
  const [select, setSelect] = useState(0);

  const changeEvent = (idx: number) => {
    setSelect(idx);
  };

  return (
    <div>
      <p style={{ margin: "0px", marginBottom: "10px" }}>
        현재 선택되어 있는 리스트의 인덱스 번호는? {select}
      </p>
      <Popular
        list={list}
        minHeight={{ web: 40 }}
        useSwipeMode
        changeListEvent={changeEvent}
      />
    </div>
  );
}

const hoverEventCodeForm = {
  // select state 코드
  selectState: `${
    getCommonsHighlight.colors(
      "현재 선택되어 있는 리스트의 인덱스 값을 저장합니다."
    ).comment
  }
  ${getCommonsHighlight.state({
    stateName: "select",
    stateValue: getCommonsHighlight.colors("0").number,
  })}`,
  // change 함수
  changeSelect: `${
    getCommonsHighlight.colors(
      "현재 선택되어 있는 리스트의 인덱스 값을 가져와 select state 값을 변경하는 함수입니다."
    ).comment
  }
  ${getCommonsHighlight.makeFunction({
    funcName: "changeSelect",
    children: `${
      getCommonsHighlight.colors(
        "함수의 props로 해당 리스트의 인덱스 값이 기본값으로 전달됩니다."
      ).comment
    }
    ${getCommonsHighlight.function({
      funcName: "setSelect",
      setFunc: {
        children: getCommonsHighlight.colors("idx").varName2,
      },
    })}`,
    props: getCommonsHighlight.colors("idx").varName2,
  })}
  `,
  // return 코드
  returnStr: `${getCommonsHighlight.return(
    getCommonsHighlight.tag.div(`
      ${getCommonsHighlight.tag.p(
        `현재 선택되어 있는 리스트의 인덱스 번호는? ${getCommonsHighlight.curly(
          {
            children: getCommonsHighlight.colors("select").varName,
          }
        )}`
      )}
      ${getCommonsHighlight.tag.component({
        componentName: "Popular",
        isClose: true,
        props: `
        ${popularCommonsExampleCode.list()}
        ${popularCommonsExampleCode.minHeight()}
        ${getBoldCode({
          code: popularCommonsExampleCode.changeListEvent(),
          propsName: "changeListEvent",
        })}
      `,
      })}
    `)
  )}`,
};

const codeResult = `${hoverEventCodeForm.selectState}
    
  ${hoverEventCodeForm.changeSelect}
${hoverEventCodeForm.returnStr}`;

// 대체용 코드
export const PopularExampleHoverEventCode = {
  code: getExampleCode({
    module: "Popular",
    code: "",
    children: "",
    returnStr: codeResult,
  }),
  showCode: `  ${codeResult}`,
};

import { getLibraries } from "src/main/commonsComponents/functional/modules";
import { sliderCommonsProps } from "../..";
import { useState } from "react";

import { getCommonsHighlight } from "src/commons/highlight";
import { sliderCodeList } from "../slider.example.code.data";

import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
const { getExampleCode } = getExampleCodeComponnet();

const { Slider } = getLibraries();
export default function SliderExampleChangeEventPage() {
  const [idx, setIdx] = useState(0);

  const changePage = (idx: number) => {
    setIdx(idx);
  };

  return (
    <div>
      <p>현재 페이지의 인덱스 번호는? {idx}</p>
      <Slider
        children={sliderCommonsProps.children}
        changePageEvent={changePage}
        useAnimation
        usePagination
        useAutoPlay={{
          delay: 3000,
        }}
      />
    </div>
  );
}

const replaceCode = `${
  getCommonsHighlight.colors("현재 페이지의 인덱스 값을 저장합니다.").comment
}
  ${getCommonsHighlight.state({
    stateName: "idx",
    stateValue: getCommonsHighlight.colors("0").number,
  })}
  
  ${
    getCommonsHighlight.colors(
      "페이지 전환 이벤트로 받아온 인덱스 값을 변경합니다."
    ).comment
  }
  ${getCommonsHighlight.makeFunction({
    funcName: "changeEvent",
    props: getCommonsHighlight.colors("idx").varName2,
    children: getCommonsHighlight.function({
      funcName: "setIdx",
      setFunc: {
        children: getCommonsHighlight.colors("idx").varName2,
      },
    }),
  })}
  
${getCommonsHighlight.return(
  getCommonsHighlight.tag.div(`
      ${getCommonsHighlight.tag.p(
        `현재 페이지의 인덱스 번호는? ${getCommonsHighlight.curly({
          children: getCommonsHighlight.colors("idx").varName,
        })}`
      )}
      ${getCommonsHighlight.tag.component({
        componentName: "Slider",
        children: `
        ${getCommonsHighlight.tag.p(getCommonsHighlight.colors("Hello").text)}
        ${getCommonsHighlight.tag.p(getCommonsHighlight.colors("😃🧑😀").text)}
        ${getCommonsHighlight.tag.img(
          getCommonsHighlight.props(
            "src",
            getCommonsHighlight.string("이미지 주소")
          )
        )}
      `,
        props: String(sliderCodeList.changePageEvent()),
      })}
    `)
)}`;

// 대체용 코드
export const SliderExampleChangeEventCode = {
  code: getExampleCode({
    module: "Slider",
    code: "",
    children: "",
    returnStr: `${replaceCode}`,
    addImport: {
      react: ["useState"],
    },
  }),
  showCode: `  ${replaceCode}`,
};

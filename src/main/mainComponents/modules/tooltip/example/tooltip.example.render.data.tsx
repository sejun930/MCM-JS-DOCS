import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { tooltipCodeList } from "./tooltip.example.code.data";
import { TooltipPropsType } from "mcm-js/dist/commons/types";

// Modal default Props값
export const tooltipExampleInitProps: TooltipPropsType = {
  tooltipText: "",
  children: "",
};

// 모듈별 사용 예시 데이터
export const tooltipExampleList = (): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs:
          "제일 기본적으로 실행되는 툴팁입니다. \n 'Hello' 문자열 위로 마우스롤 올려보세요.",
        info: {},
        content: `기본 툴팁 페이지입니다.`,
        code: tooltipCodeList.basic,
      },
      {
        remakrs:
          "문자열 뿐만 아니라 태그 또는 컴포넌트를 출력할 수도 있습니다.",
        info: {},
        content: `기본 툴팁 페이지입니다.`,
        code: tooltipCodeList.basic,
        addProps: {
          ...tooltipExampleInitProps,
          children: <span>Apple</span>,
          tooltipText: <b>2222</b>,
          useShowAnimation: true,
        },
      },
    ],
  },
];

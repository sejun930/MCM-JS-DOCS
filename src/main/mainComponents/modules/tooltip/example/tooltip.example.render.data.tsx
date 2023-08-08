import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { tooltipCodeList } from "./tooltip.example.code.data";

// 모듈별 사용 예시 데이터
export const modalExampleList = (idx: number): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs: "제일 기본적으로 실행되는 툴팁입니다.",
        info: {
          buttonName: "Open Basic Tooltip",
        },
        content: `기본 툴팁 페이지입니다.`,
        code: tooltipCodeList.basic,
      },
    ],
  },
];

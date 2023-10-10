import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { popularCodeList } from "./popular.example.code.data";
import { popularInitProps } from "..";

export const popularExampleList = (): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs:
          "제일 기본적으로 실행되는 Popular입니다. <br /><b>list</b> props와 <b>minHeight</b> props로 리스트 및 높이 설정이 필요합니다.",
        content: ``,
        code: ``,
        children: "Open Basic Alert",
      },
    ],
  },
  {
    title: "전환 시간 (Delay) 조절",
    contents: [
      {
        remakrs:
          "리스트가 다음 리스트로 전환되는 시간<b>(1/1000ms)</b>을 조절할 수 있습니다. <br /> 위의 Popular는 <b>5초(5000ms)</b> 마다 리스트를 전환합니다.",
        content: ``,
        code: popularCodeList.delay(5000),
        children: "Open Basic Alert",
        addProps: {
          ...popularInitProps,
          delay: 5000,
        },
      },
    ],
  },
  {
    title: "스타일 설정",
    blockRemarks: "Popular 모듈의 스타일을 변경할 수 있습니다.",
    isFull: { isHalf: true },
    contents: [
      {
        remakrs:
          "웹<b>(768px 이상)</b>과 모바일<b>(767px 이하)</b>에 동시 적용되는 스타일을 설정할 수 있습니다. <br />(웹, 모바일 모두 검은 배경과 하얀 폰트색상이 적용됩니다.)",
        content: ``,
        code: popularCodeList.styles(),
        children: "Open Basic Alert",
        addProps: {
          ...popularInitProps,
          popularStyles: {
            backgroundColor: "black",
            color: "white",
          },
        },
      },
      {
        remakrs:
          "웹<b>(768px 이상)</b>과 모바일<b>(767px 이하)</b>각각의 환경에 적용되는 스타일을 설정할 수 있습니다. <br />(웹에서는 초록색 배경, 모바일에서는 노란 배경이 적용됩니다.)",
        content: ``,
        code: popularCodeList.responsiveStyles(),
        children: "Open Basic Alert",
        addProps: {
          ...popularInitProps,
          popularResponsiveStyles: {
            web: {
              backgroundColor: "#C8FFE0",
            },
            mobile: {
              backgroundColor: "#F9F3CC",
            },
          },
        },
      },
    ],
  },
];

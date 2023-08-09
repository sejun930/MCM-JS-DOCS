import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { tooltipCodeList } from "./tooltip.example.code.data";
import { TooltipPropsType } from "mcm-js/dist/commons/types";

import { _PText } from "mcm-js-commons";
import { getCommonsHighlight } from "src/commons/highlight";

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
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.basic,
      },
      {
        remakrs:
          "문자열 뿐만 아니라 태그 또는 컴포넌트를 출력할 수도 있습니다.",
        addProps: {
          ...tooltipExampleInitProps,
          children: <_PText>Dancing</_PText>,
          tooltipText: (
            <img src="https://mcm-js-image.s3.ap-northeast-2.amazonaws.com/dancing.gif" />
          ),
        },
        content: getCommonsHighlight.tag.p("Dancing"),
        code: tooltipCodeList.basicImg,
      },
    ],
  },
  {
    title: "애니메이션 (Animation) 적용",
    contents: [
      {
        remakrs: "애니메이션을 적용하면 좀더 역동적인 툴팁이 실행됩니다.",
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.animation,
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
        },
      },
      {
        remakrs: "툴팁의 내용과 상관없이 애니메이션을 적용할 수 있습니다.",
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.animationImg,
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
          children: <_PText>Dancing</_PText>,
          tooltipText: (
            <img src="https://mcm-js-image.s3.ap-northeast-2.amazonaws.com/dancing.gif" />
          ),
        },
      },
    ],
  },
  // {
  //   title: "방향 (Position) 설정",
  //   blockRemarks: "툴팁의 실행되는 방향을 직접 변경할 수 있습니다.",
  //   contents: [
  //     {
  //       remakrs: "ㅁㅁㅁㅁ",
  //       content: "222",
  //     },
  //     {
  //       remakrs: "ㅁㅁㅁㅁ",
  //       content: "222",
  //     },
  //     {
  //       remakrs: "ㅁㅁㅁㅁ",
  //       content: "222",
  //     },
  //     {
  //       remakrs: "ㅁㅁㅁㅁ",
  //       content: "222",
  //     },
  //   ],
  //   isFull: true,
  // },
];

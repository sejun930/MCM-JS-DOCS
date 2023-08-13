import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { tooltipCodeList } from "./tooltip.example.code.data";
import { TooltipPropsType } from "mcm-js/dist/commons/types";

import { _PText } from "mcm-js-commons";
import { getCommonsHighlight } from "src/commons/highlight";

import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
const { getExampleCode } = getExampleCodeComponnet();

import TooltipExampleDisableReplaceTemplate from "./replace/tooltip.example.disable.template";
import TooltipExampleOnOffReplaceTemplate from "./replace/tooltip.example.onoff.template";

import {
  disableReplaceCode,
  onoffReplaceCode,
} from "./replace/tooltip.example.replace.code";

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
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
        },
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.animation,
      },
      {
        remakrs: "툴팁의 내용과 상관없이 애니메이션을 적용할 수 있습니다.",
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
          children: <_PText>Dancing</_PText>,
          tooltipText: (
            <img src="https://mcm-js-image.s3.ap-northeast-2.amazonaws.com/dancing.gif" />
          ),
        },
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.animationImg,
      },
    ],
  },
  {
    title: "방향 (Position) 설정",
    blockRemarks: "툴팁이 실행되는 방향을 직접 설정할 수 있습니다.",
    contents: [
      {
        remakrs: "툴팁이 '위'로 실행됩니다. (Default)",
        content: getCommonsHighlight.tag.p("🕛 (Top)"),
        code: tooltipCodeList.position("top position", "top"),
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
          children: <_PText>🕛 (Top)</_PText>,
          tooltipText: "top position",
        },
      },
      {
        remakrs: "툴팁이 '오른쪽'으로 실행됩니다.",
        content: getCommonsHighlight.tag.p("🕒 (Right)"),
        code: tooltipCodeList.position("right position", "right"),
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
          children: <_PText>🕒 (Right)</_PText>,
          tooltipText: "right position",
          position: "right",
        },
      },
      {
        remakrs: "툴팁이 '아래'로 실행됩니다.",
        content: getCommonsHighlight.tag.p("🕕 (Bottom)"),
        code: tooltipCodeList.position("bottom position", "bottom"),
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
          children: <_PText>🕕 (Bottom)</_PText>,
          tooltipText: "bottom position",
          position: "bottom",
        },
      },
      {
        remakrs: "툴팁이 '왼쪽'으로 실행됩니다.",
        content: getCommonsHighlight.tag.p("🕘 (Left)"),
        code: tooltipCodeList.position("left position", "left"),
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
          children: <_PText>🕘 (Left)</_PText>,
          tooltipText: "left position",
          position: "left",
        },
      },
    ],
    isFull: true,
  },
  {
    title: "스타일 지정 (웹, 모바일)",
    isFull: true,
    contents: [
      {
        remakrs:
          "툴팁을 원하는 스타일로 커스텀 할 수 있습니다. (Web, Mobile 동시 적용)",
        addProps: {
          ...tooltipExampleInitProps,
          children: <_PText>Open New Style Tooltip</_PText>,
          tooltipText: "New Style Tooltip",
          tooltipStyles: {
            backgroundColor: "black",
            padding: "16px",
            font: {
              color: "#9BE8D8",
              size: "20px",
              weight: 700,
            },
            border: {
              color: "#9BE8D8",
              width: "3px",
              radius: "0px",
            },
          },
        },
        content: getCommonsHighlight.tag.p("Open New Style Tooltip"),
        code: tooltipCodeList.styles(),
      },
      {
        remakrs: "모바일(767px 이하)만 적용되는 스타일입니다. (Mobile 적용)",
        addProps: {
          ...tooltipExampleInitProps,
          children: <_PText>Open New Mobile Style Tooltip</_PText>,
          tooltipText: "New Mobile Style Tooltip",
          tooltipMobileStyles: {
            backgroundColor: "white",
            padding: "20px",
            font: {
              color: "#F86F03",
              size: "20px",
              weight: 500,
            },
            border: {
              color: "#F86F03",
              width: "3px",
              radius: "0px",
            },
          },
        },
        content: getCommonsHighlight.tag.p("Open New Mobile Style Tooltip"),
        code: tooltipCodeList.mobileStyles(),
      },
    ],
  },
  {
    title: "비활성화 (Disable) 적용",
    contents: [
      {
        remakrs:
          "원하는 시점에 툴팁의 기능을 활성화/비활성화 할 수 있습니다. <br /><b>'isDisable'</b> props 값에 true를 전달하면 비활성화가 적용됩니다.",
        addProps: {
          ...tooltipExampleInitProps,
        },
        replaceChildren: <TooltipExampleDisableReplaceTemplate />,
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.disable,
        replaceAllCode: {
          code: tooltipReplaceCode.disable.code,
          showCode: tooltipReplaceCode.disable.showCode,
        },
      },
    ],
  },
  {
    title: "수동 ON/OFF",
    contents: [
      {
        remakrs:
          "원하는 시점에 툴팁을 수동으로 오픈하거나 종료할 수 있습니다. <br />state를 사용한다면 <b>'open'</b>과 <b>'onCloseAfterEvent'</b> props를 함께 사용해주세요.",
        addProps: {
          ...tooltipExampleInitProps,
        },
        replaceChildren: <TooltipExampleOnOffReplaceTemplate />,
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.onoff,
        replaceAllCode: {
          code: tooltipReplaceCode.onoff.code,
          showCode: tooltipReplaceCode.onoff.showCode,
        },
      },
    ],
  },
];

/* //////////////////////////////////////////////////////////////// */

// 통째로 변경될 코드 리스트
const tooltipReplaceCode = {
  disable: {
    code: getExampleCode({
      module: "Tooltip",
      returnStr: disableReplaceCode,
      code: "",
      children: "",
      addImport: { react: ["useState"] },
    }),
    showCode: `  ` + disableReplaceCode,
  },
  onoff: {
    code: getExampleCode({
      module: "Tooltip",
      returnStr: onoffReplaceCode,
      code: "",
      children: "",
      addImport: { react: ["useState"] },
    }),
    showCode: `  ` + onoffReplaceCode,
  },
};

import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { tooltipCodeList } from "./tooltip.example.code.data";
import { TooltipPropsType } from "mcm-js/dist/commons/types";

import { _PText, _SpanText } from "mcm-js-commons";
import { getCommonsHighlight } from "src/commons/highlight";

import TooltipExampleDisableReplaceTemplate from "./replace/tooltip.example.disable.template";
import TooltipExampleOnOffReplaceTemplate from "./replace/tooltip.example.onoff.template";

import {
  disableReplaceCode,
  onoffReplaceCode,
} from "./replace/tooltip.example.replace.code";

import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
const { getExampleCode } = getExampleCodeComponnet();

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
          "제일 기본적으로 실행되는 Tooltip 입니다. \n 'Hello' 문자열 위로 마우스롤 올려보세요.",
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
            <img src="/images/modules/example/tooltip/dancing.gif" />
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
        remakrs: "애니메이션을 적용하면 좀더 역동적인 Tooltip이 실행됩니다.",
        addProps: {
          ...tooltipExampleInitProps,
          useShowAnimation: true,
        },
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.animation,
      },
      {
        remakrs: "Tooltip의 내용과 상관없이 애니메이션을 적용할 수 있습니다.",
        addProps: {
          ...tooltipExampleInitProps,
          children: <_PText>Dancing</_PText>,
          tooltipText: (
            <img src="/images/modules/example/tooltip/dancing.gif" />
          ),
          useShowAnimation: true,
        },
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.animationImg,
      },
    ],
  },
  {
    title: "방향 (Position) 설정",
    blockRemarks: "Tooltip이 실행되는 방향을 직접 설정할 수 있습니다.",
    contents: [
      {
        remakrs: "Tooltip이 '위'로 실행됩니다. (Default)",
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
        remakrs: "Tooltip이 '오른쪽'으로 실행됩니다.",
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
        remakrs: "Tooltip이 '아래'로 실행됩니다.",
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
        remakrs: "Tooltip이 '왼쪽'으로 실행됩니다.",
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
    isFull: { isHalf: false },
  },
  {
    title: "스타일 지정 (웹, 모바일)",
    blockRemarks:
      "Tooltip의 스타일을 웹/모바일 환경에 맞춰서 설정할 수 있습니다.",
    isFull: { isHalf: false },
    contents: [
      {
        remakrs:
          "Tooltip을 원하는 스타일로 커스텀 할 수 있습니다. <b>(Web, Mobile 동시 적용)</b>",
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
        remakrs:
          "모바일(767px 이하)만 적용되는 스타일입니다. <b>(Mobile 적용)</b>",
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
    title: "수동 ON/OFF & Hover 이벤트 비활성화",
    blockRemarks:
      "Tooltip을 수동으로 실행/종료 하거나, 실행/종료 이벤트를 비활성화 할 수 있습니다.",
    isFull: { isHalf: false },
    contents: [
      {
        remakrs:
          '원하는 시점에 Tooltip을 수동으로 오픈하거나 종료할 수 있습니다. <br />state를 사용한다면 <b>"open"</b>과 <b>"onCloseAfterEvent"</b> props를 함께 사용해주세요.',
        addProps: {
          ...tooltipExampleInitProps,
        },
        replaceChildren: (
          <TooltipExampleOnOffReplaceTemplate
            children={<></>}
            tooltipText="버튼을 클릭하면 Tooltip을 수동으로 실행하거나 종료할 수 있습니다."
          />
        ),
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.onoff,
        replaceAllCode: {
          code: tooltipReplaceCode({
            tooltipText:
              "버튼을 클릭하면 Tooltip을 수동으로 실행하거나 종료할 수 있습니다.",
            children: <></>,
          }).onoff.code,
          showCode: tooltipReplaceCode({
            tooltipText:
              "버튼을 클릭하면 Tooltip을 수동으로 실행하거나 종료할 수 있습니다.",
            children: <></>,
          }).onoff.showCode,
        },
      },
      {
        remakrs:
          "마우스로 Tooltip을 실행하거나 종료시키는 Hover 이벤트를 비활성화 합니다.",
        addProps: {
          ...tooltipExampleInitProps,
          offHoverEvent: true,
        },
        replaceChildren: (
          <TooltipExampleOnOffReplaceTemplate
            children={<></>}
            tooltipText="마우스 Hover 이벤트가 비활성화 되었습니다."
            offHoverEvent
          />
        ),
        content: getCommonsHighlight.tag.span("offHoverEvent"),
        code: tooltipCodeList.offHover,
        replaceAllCode: {
          code: tooltipReplaceCode({
            tooltipText: "마우스 Hover 이벤트가 비활성화 되었습니다.",
            children: <></>,
            offHoverEvent: true,
          }).onoff.code,
          showCode: tooltipReplaceCode({
            tooltipText: "마우스 Hover 이벤트가 비활성화 되었습니다.",
            children: <></>,
            offHoverEvent: true,
          }).onoff.showCode,
        },
      },
    ],
  },
  {
    title: "Tooltip 고정 (Fix)",
    contents: [
      {
        remakrs:
          '실행된 Tooltip을 종료하지 않고 고정시킬 수 있습니다. <br /><b>"open"</b> props와 함께 사용하면 고정된 Tooltip을 표현할 수 있습니다.',
        addProps: {
          ...tooltipExampleInitProps,
          tooltipText: (
            <_SpanText styles={{ fontSize: "12px" }}>
              고정된 Tooltip 입니다.
            </_SpanText>
          ),
          children: <_PText>Open Fix Tooltip</_PText>,
          isFix: true,
          open: true,
        },
        content: getCommonsHighlight.tag.span("Open Fix Tooltip"),
        code: tooltipCodeList.fix,
      },
    ],
  },
  {
    title: "Tooltip 완전 비활성화 (Disable) 적용",
    contents: [
      {
        remakrs:
          "원하는 시점에 Tooltip의 기능을 활성화/비활성화 할 수 있습니다. <br /><b>'isDisable'</b> props 값에 true를 전달하면 비활성화가 적용됩니다.",
        addProps: {
          ...tooltipExampleInitProps,
        },
        replaceChildren: <TooltipExampleDisableReplaceTemplate />,
        content: getCommonsHighlight.tag.p("Hello"),
        code: tooltipCodeList.disable,
        replaceAllCode: {
          code: tooltipReplaceCode({
            tooltipText: "활성화 상태에서만 Tooltip이 실행됩니다.",
            children: <></>,
          }).disable.code,
          showCode: tooltipReplaceCode({
            tooltipText: "활성화 상태에서만 Tooltip이 실행됩니다.",
            children: <></>,
          }).disable.showCode,
        },
      },
    ],
  },
  {
    title: "모바일 OFF",
    contents: [
      {
        remakrs: "모바일 환경(767px 이하)에서는 Tooltip을 가릴 수 있습니다.",
        addProps: {
          ...tooltipExampleInitProps,
          open: true,
          offHoverEvent: true,
          hideMobile: true,
          tooltipText: (
            <_SpanText styles={{ fontSize: "12px" }}>
              모바일에서는 보이지 않습니다.
            </_SpanText>
          ),
        },
        content: getCommonsHighlight.tag.span("Hello"),
        code: tooltipCodeList.hideMobile,
      },
    ],
  },
  {
    title: "",
    isError: {
      requiredList: ["children", "tooltipText"],
    },
    contents: [
      {
        remakrs: "",
        addProps: {
          ...tooltipExampleInitProps,
          children: undefined,
          tooltipText: undefined,
        },
        info: {
          buttonName: "Open Off Auto-close Modal",
        },
        content: `닫기 버튼을 클릭해야만 Modal을 닫을 수 있습니다.`,
        code: null,
      },
    ],
  },
];

/* //////////////////////////////////////////////////////////////// */

// 통째로 변경될 코드 리스트
const tooltipReplaceCode = (props: TooltipPropsType) => {
  return {
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
        returnStr: onoffReplaceCode(props),
        code: "",
        children: "",
        addImport: { react: ["useState"] },
      }),
      showCode: `  ` + onoffReplaceCode(props),
    },
  };
};

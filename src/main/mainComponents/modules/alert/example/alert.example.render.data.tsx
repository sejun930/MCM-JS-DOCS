import { getCommonsHighlight } from "src/commons/highlight";
import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";

import { alertCodeList } from "./alert.example.code.data";

// 코드용 텍스트 출력
const initAlertContents = (text: string) =>
  getCommonsHighlight.colors(text).text;

export const initAlertCommonsProps = {
  children: "Hello",
};

export const alertExampleList = (): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs:
          "제일 기본적으로 실행되는 알럿입니다. <br /><b>children</b> props로 출력될 알럿 메세지를 설정합니다.",
        content: initAlertContents("Open Basic Alert"),
        code: alertCodeList.basic(),
        children: "Open Basic Alert",
      },
    ],
  },
  {
    title: "종료 시간 설정",
    // isFull : true
    contents: [
      {
        remakrs:
          "알럿의 종료 시간(1/1000ms)을 조절할 수 있습니다. <br />위 버튼으로 실행된 알럿은 <b>10초(10000ms) 후</b>에 종료됩니다.",
        content: initAlertContents("Alert closing in 10 seconds"),
        code: alertCodeList.delay(),
        children: "Alert closing in 10 seconds",
        addProps: {
          children: "10초 후 종료됩니다.",
          closeDelayTime: 10000,
        },
      },
    ],
  },
  {
    title: "스타일 지정",
    blockRemarks:
      "알럿의 전체 스타일 및 <b>웹(768px 이상)</b>과 <b>모바일(767px 이하)</b>의 스타일을 분기하여 설정할 수 있습니다.",
    isFull: { isHalf: false },
    contents: [
      {
        remakrs: "웹과 모바일 모두에 적용되는 스타일을 설정할 수 있습니다.",
        content: initAlertContents("Open All-in-one Style in Alert"),
        code: alertCodeList.styles(),
        children: "Open All-in-one Style in Alert",
        addProps: {
          children: "웹과 모바일에 스타일이 적용됩니다.",
          alertStyles: {
            backgroundColor: "black",
            color: "white",
            borderColor: "white",
          },
        },
      },
      {
        remakrs: "웹 <b>(768px 이상)</b>에서만 적용되는 스타일을 설정합니다.",
        content: initAlertContents("Open Web Style in Alert"),
        code: alertCodeList.responsiveStyles(),
        children: "Open Web Style in Alert",
        addProps: {
          children: "웹에만 스타일이 적용됩니다.",
          alertResponsiveStyles: {
            web: {
              backgroundColor: "blue",
              color: "white",
            },
          },
        },
      },
      {
        remakrs:
          "모바일 <b>(767px 이하)</b>에서만 적용되는 스타일을 설정합니다.",
        content: initAlertContents("Open Mobile Style in Alert"),
        code: alertCodeList.responsiveStyles(true),
        children: "Open Mobile Style in Alert",
        addProps: {
          children: "모바일에만 스타일이 적용됩니다.",
          alertResponsiveStyles: {
            mobile: {
              backgroundColor: "pink",
              color: "blue",
            },
          },
        },
      },
    ],
  },
  {
    title: "수동 종료 (+ 스와이프)",
    blockRemarks: "사용자 임의로 알럿을 종료할 수 있는 기능을 제공합니다.",
    isFull: { isHalf: false },
    contents: [
      {
        remakrs: "실행된 알럿을 클릭하면 종료할 수 있습니다.",
        content: initAlertContents("Alert Close Mode"),
        code: alertCodeList.close(),
        children: "Alert Close Mode",
        addProps: {
          children: "Click Me!",
          useCloseMode: true,
          closeDelayTime: 10000,
        },
      },
      {
        remakrs: "실행된 알럿을 좌우로 스와이프 하면 종료할 수 있습니다.",
        content: initAlertContents("Alert Close Swipe Mode"),
        code: alertCodeList.close(true),
        children: "Alert Close Swipe Mode",
        addProps: {
          children: "Swipe Me!",
          useCloseMode: { useSwipeMode: true },
          closeDelayTime: 10000,
        },
      },
    ],
  },
  {
    title: "컨셉 (concept)",
    blockRemarks:
      "메세지의 의도에 따라 알럿의 스타일을 변경할 수 있습니다. <br />원하는 스타일의 컨셉으로 직접 커스텀 할 수도 있습니다.",
    isFull: { isHalf: true },
    contents: [
      {
        remakrs: "<b>정보전달</b>의 목적으로 사용할 수 있습니다.",
        content: initAlertContents("Open Info Concept Alert"),
        code: alertCodeList.concept(
          "물의 표준 끓는점은 99.61° 입니다.",
          "info"
        ),
        children: "Open Info Concept Alert",
        addProps: {
          children: "물의 표준 끓는점은 99.61° 입니다.",
          alertConcept: {
            type: "info",
          },
        },
      },
      {
        remakrs: "<b>성공 여부의 전달</b> 목적으로 사용할 수 있습니다.",
        content: initAlertContents("Open Success Concept Alert"),
        code: alertCodeList.concept("결제가 완료되었습니다.", "success"),
        children: "Open Success Concept Alert",
        addProps: {
          children: "결제가 완료되었습니다.",
          alertConcept: {
            type: "success",
          },
        },
      },
      {
        remakrs: "<b>경고 전달</b>의 목적으로 사용할 수 있습니다.",
        content: initAlertContents("Open Warning Concept Alert"),
        code: alertCodeList.concept(
          'Each child in a list should have a unique "key" prop.',
          "warning"
        ),
        children: "Open Warning Concept Alert",
        addProps: {
          children: 'Each child in a list should have a unique "key" prop.',
          alertConcept: {
            type: "warning",
          },
        },
      },
      {
        remakrs: "<b>실패 여부의 전달</b> 목적으로 사용할 수 있습니다.",
        content: initAlertContents("Open Error Concept Alert"),
        code: alertCodeList.concept(
          "귀하의 뛰어난 역량에도 불구하고...",
          "error"
        ),
        children: "Open Error Concept Alert",
        addProps: {
          children: "귀하의 뛰어난 역량에도 불구하고...",
          alertConcept: {
            type: "error",
          },
        },
      },
      {
        remakrs:
          "컨셉을 원하는대로 커스텀 할 수 있습니다. <br />알럿의 색상과 아이콘의 이모지, 색상, 크기를 직접 설정할 수 있습니다.",
        content: initAlertContents("Open Custom Concept Alert"),
        isFull: true,
        code: alertCodeList.custom(),
        children: "Open Custom Concept Alert",
        addProps: {
          children: "커스텀 된 컨셉입니다.",
          alertConcept: {
            type: "custom",
            custom: {
              color: "#6527BE",
              icon: {
                src: "⭐",
                color: "#6527BE",
                size: 12,
              },
            },
          },
        },
      },
    ],
  },
  {
    title: "중복 실행 방지",
    contents: [
      {
        remakrs:
          '<b>"id"</b> props 값을 설정하면 하나의 알럿만 실행이 가능합니다. <br />(해당 알럿이 종료되기 전까지 실행되지 않습니다.)',
        content: initAlertContents("Open Only One Alert"),
        code: alertCodeList.id(),
        children: "Open Only One Alert",
        addProps: {
          children: "이 알럿은 한개만 오픈됩니다.",
          id: "only",
        },
      },
    ],
  },
  {
    title: "종료되지 않는 알럿",
    contents: [
      {
        remakrs:
          '<b>"closeDelayTime"</b> props에 <b>"infinite"</b>를 전달하면 수동으로 종료되기 전까지 <br />무한하게 실행되는 알럿을 설정할 수 있습니다.',
        content: initAlertContents("Open Infinite Alert"),
        code: alertCodeList.infinite(),
        children: "Open Infinite Alert",
        addProps: {
          children: "이 알럿은 무한하게 실행됩니다.",
          closeDelayTime: "infinite",
          useCloseMode: true,
        },
      },
    ],
  },
];

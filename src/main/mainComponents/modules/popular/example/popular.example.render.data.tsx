import { ExampleIProps } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { popularCodeList } from "./popular.example.code.data";
import { popularInitProps } from "..";

import PopularExampleHoverEventTemplate, {
  PopularExampleHoverEventCode,
} from "./replace/popular.example.hoverEvent.template";

export const popularExampleList = (): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs:
          "제일 기본적으로 실행되는 Popular입니다. <br /><b>list</b> props와 <b>minHeight</b> props로 리스트 및 높이 설정이 필요합니다.",
        content: ``,
        code: ``,
        children: "",
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
        children: "",
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
        children: "",
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
          "웹<b>(768px 이상)</b>과 모바일<b>(767px 이하)</b>각각의 환경에 적용되는 스타일을 설정할 수 있습니다. <br />(웹에서는 초록색 배경, 모바일에서는 빨간색 배경, 하얀색 폰트가 적용됩니다.)",
        content: ``,
        code: popularCodeList.responsiveStyles(),
        children: "",
        addProps: {
          ...popularInitProps,
          popularResponsiveStyles: {
            web: {
              backgroundColor: "#C8FFE0",
            },
            mobile: {
              backgroundColor: "#CD6688",
              color: "white",
            },
          },
        },
      },
    ],
  },
  {
    title: "리스트 관련",
    blockRemarks: "전체 리스트에 관련된 기능들을 제어할 수 있습니다.",
    isFull: {
      isHalf: true,
    },
    contents: [
      {
        remakrs: "전체 리스트를 <b>보이지 않게</b> 설정할 수 있습니다.",
        content: ``,
        code: popularCodeList.hideList(),
        children: "",
        addProps: {
          ...popularInitProps,
          setList: {
            hide: true,
          },
        },
      },
      {
        remakrs: "리스트들의 <b>순위도</b>를 표시합니다.",
        content: ``,
        code: popularCodeList.showRating(),
        children: "",
        addProps: {
          ...popularInitProps,
          setList: {
            showRating: true,
          },
        },
      },
      {
        remakrs: "전환 시 표시되는 리스트의 스타일을 설정할 수 있습니다.",
        content: ``,
        code: popularCodeList.hoverStyles(),
        children: "",
        addProps: {
          ...popularInitProps,
          setList: {
            hoverStyles: {
              backgroundColor: "black",
              color: "white",
              padding: "8px",
            },
          },
        },
      },
      {
        remakrs:
          "전체 리스트 창의 스타일을 설정할 수 있습니다. (웹, 모바일 개별 적용 가능)",
        content: ``,
        code: popularCodeList.listStyles(),
        children: "",
        addProps: {
          ...popularInitProps,
          setList: {
            styles: {
              borderRadius: "0px 0px 10px 10px",
            },
            responsiveStyles: {
              web: {
                backgroundColor: "#bbbbbb",
              },
              mobile: {
                backgroundColor: "black",
              },
            },
          },
        },
      },
    ],
  },
  {
    title: "스와이프 적용",
    contents: [
      {
        remakrs:
          "메인 리스트를 상 하로 스와이프 하여 다른 리스트를 선택할 수 있습니다.",
        content: ``,
        code: popularCodeList.useSwipeMode(),
        children: "",
        addProps: {
          ...popularInitProps,
          useSwipeMode: true,
        },
      },
    ],
  },
  {
    title: "리스트 선택 이벤트",
    contents: [
      {
        remakrs:
          "리스트가 <b>전환 및 선택될 때마다</b> 함께 실행될 이벤트를 설정합니다. <br />설정된 함수의 props에 인덱스 값이 기본으로 전달됩니다.",
        content: ``,
        code: popularCodeList.useSwipeMode(),
        children: "",
        replaceChildren: <PopularExampleHoverEventTemplate />,
        replaceAllCode: {
          code: PopularExampleHoverEventCode.code,
          showCode: PopularExampleHoverEventCode.showCode,
        },
        addProps: {
          ...popularInitProps,
          useSwipeMode: true,
        },
      },
    ],
  },
  {
    title: "최소 높이값 설정",
    contents: [
      {
        remakrs:
          "Popular의 웹<b>(768px 이상)</b> 또는 모바일<b>(767px 이하)</b> 환경의 최소 높이값을 설정할 수 있습니다. <br />위의 모듈은 웹 환경에서는 60px, 모바일 환경에서는 50px의 높이값을 가집니다.",
        content: ``,
        code: ``,
        children: "",
        addProps: {
          ...popularInitProps,
          minHeight: { web: 60, mobile: 50 },
        },
        changeContent: `
      ${popularCodeList.basic()}
      ${popularCodeList.minHeight(60, 50)}
    `,
      },
    ],
  },
  {
    title: "",
    isError: {
      requiredList: ["list", "minHeight"],
    },
    contents: [
      {
        remakrs: "",
        addProps: {
          ...popularInitProps,
          // @ts-ignore
          list: undefined,
          // @ts-ignore
          minHeight: undefined,
        },
        info: {
          buttonName: "Open Off Auto-close Modal",
        },
        content: `닫기 버튼을 클릭해야만 모달창을 닫을 수 있습니다.`,
        code: null,
      },
    ],
  },
];

import { ExampleIProps } from "../../../../commonsComponents/units/template/form/example/template.example.types";
import {
  sliderDefaultChildren,
  sliderCodeList,
} from "./slider.example.code.data";

import SliderExampleChangeEventPage, {
  SliderExampleChangeEventCode,
} from "./replace/slider.example.changeEvent";

export const initSliderCommonsProps = {
  children: [],
};

export const sliderExampleList = (): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs: "제일 기본적으로 실행되는 Slider 입니다.",
        content: sliderDefaultChildren,
        code: ``,
      },
    ],
  },
  {
    title: "애니메이션 (Animation)",
    contents: [
      {
        remakrs: "페이지 전환시 애니메이션 효과가 부여됩니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.useAnimation(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
        },
      },
    ],
  },
  {
    title: "페이지네이션 (Pagination) & 현재 페이지 (Current-Page)",
    isFull: { isHalf: false },
    blockRemarks:
      "리스트에 관한 페이지네이션 및 현재 페이지 정보를 노출합니다.",
    contents: [
      {
        remakrs:
          "페이지네이션 기능을 이용해 다른 페이지로 직접 이동할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.usePagination(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
        },
      },
      {
        remakrs: "현재 페이지에 대한 페이지 정보를 나타낼 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.useCurrentPage(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          useCurrentPage: true,
        },
      },
    ],
  },
  {
    title: "전환 버튼 설정",
    isFull: { isHalf: false },
    blockRemarks:
      "이전 및 다음으로 이동하는 버튼을 숨기거나 변경할 수 있습니다.",
    contents: [
      {
        remakrs: "버튼을 사용하지 않도록 숨길 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.setArrow("hide"),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
          setArrow: {
            hide: true,
          },
        },
      },
      {
        remakrs: "Slider에 <b>마우스를 올릴 때</b> 버튼을 노출시킵니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.setArrow("showHover"),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
          setArrow: {
            showHover: true,
          },
        },
      },
      {
        remakrs:
          "다음 및 이전 버튼을 원하는 <b>문자열 또는 컴포넌트</b>로 변경할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.setArrow("contents"),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
          setArrow: {
            contents: {
              left: "🔙",
              right: "🔜",
            },
          },
        },
      },
    ],
  },
  {
    title: "자동 전환(Autoplay) 및 타이머 적용",
    isFull: { isHalf: false },
    contents: [
      {
        remakrs:
          "일정 시간마다 자동으로 다음 페이지로 전환합니다.  <br />시간은 1/1000ms로 적용되며, <b>최소 3초(3000)</b> 이상부터 적용됩니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.autoPlay(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
          useAutoPlay: {
            delay: 3000,
          },
        },
      },
      {
        remakrs: "타이머를 실행시켜 전환되는 진행도를 확인할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.autoPlayWithTimer(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
          useAutoPlay: {
            delay: 3000,
            showTimer: true,
          },
        },
      },
    ],
  },
  {
    title: "스와이프 기능 적용",
    // isFull: true,
    contents: [
      {
        remakrs: "스와이프하여 페이지를 이전 또는 다음으로 전환할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.useSwipeMode(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          useSwipeMode: {
            sideMovePercent: 30,
          },
        },
      },
    ],
  },
  {
    title: "시작 페이지 지정",
    // isFull: true,
    contents: [
      {
        remakrs: "최초로 시작하는 페이지를 설정합니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.firstPage(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
          firstPage: 3,
        },
      },
    ],
  },
  {
    title: "최소 높이값 지정",
    // isFull: true,
    contents: [
      {
        remakrs:
          "Slider 전체의 <b>최소 높이값</b>을 지정할 수 있습니다. <br />web과 mobile을 별도로 지정하여 <b>웹 사이즈와 모바일 사이즈</b>를 각각 조절할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.minHeight(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
          listMinHeight: {
            web: "200px",
            mobile: "160px",
          },
        },
      },
    ],
  },
  {
    title: "페이지 전환 시 이벤트 발생",
    contents: [
      {
        remakrs:
          "Slider 페이지의 <b>변경이 감지</b>되면 <b>자동으로 실행</b>되는 이벤트를 설정할 수 있습니다. <br />설정된 함수의 props에 인덱스 값이 기본으로 전달됩니다.",
        content: sliderDefaultChildren,
        code: "",
        replaceChildren: <SliderExampleChangeEventPage />,
        replaceAllCode: {
          code: SliderExampleChangeEventCode.code,
          showCode: SliderExampleChangeEventCode.showCode,
        },
      },
    ],
  },
  {
    title: "다음 및 이전 페이지 이동 방지",
    contents: [
      {
        remakrs:
          "Slider의 페이지가 <b>첫번째 또는 마지막 페이</b>지일 경우 <b>이전 또는 다음 페이지 이동을 방지</b>할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.stopInfinite(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          usePagination: true,
          useAutoPlay: {
            delay: 3000,
            showTimer: true,
          },
          useSwipeMode: {
            sideMovePercent: 50,
          },
          stopInfinite: true,
        },
      },
    ],
  },
  {
    title: "",
    isError: {
      requiredList: ["children"],
    },
    // isFull: true,
    contents: [
      {
        remakrs:
          "최초로 시작하는 페이지를 설정합니다. <br />나열된 페이지 번호 중 처음 렌더하고 싶은 페이지의 번호를 입력해주세요. <b>(default : 1)</b>",
        content: sliderDefaultChildren,
        code: null,
        addProps: {
          ...initSliderCommonsProps,
          children: [],
        },
      },
    ],
  },
];

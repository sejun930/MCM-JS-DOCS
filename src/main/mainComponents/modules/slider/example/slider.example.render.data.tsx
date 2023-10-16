import { ExampleIProps } from "../../../../commonsComponents/units/template/form/example/template.example.types";
import {
  sliderDefaultChildren,
  sliderCodeList,
} from "./slider.example.code.data";

import SliderExampleChangeEventPage from "./replace/slider.example.changeEvent";
import { SliderExampleChangeEventCode } from "./replace/slider.example.changeEvent";

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
    title: "페이지네이션 (Pagination)",
    contents: [
      {
        remakrs:
          "전체 페이지의 개수를 확인할 수 있고, 클릭하면 해당 페이지로 이동할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.pagination(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          pagination: { showPageList: true },
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
          pagination: { showPageList: true },
          useSwipeMode: {
            sideMovePercent: 50,
          },
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
          pagination: { showPageList: true },
          useSwipeMode: {
            sideMovePercent: 50,
          },
          setArrow: {
            showHover: true,
          },
        },
      },
      {
        remakrs:
          "버튼을 원하는 <b>문자열 또는 컴포넌트</b>로 변경할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.setArrow("contents"),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          pagination: { showPageList: true },
          useSwipeMode: {
            sideMovePercent: 50,
          },
          setArrow: {
            contents: "⬅",
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
          pagination: { showPageList: true },
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
          pagination: { showPageList: true },
          useAutoPlay: {
            delay: 3000,
            showTimer: true,
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
          pagination: { showPageList: true },
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
          pagination: {
            showPageList: true,
          },
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

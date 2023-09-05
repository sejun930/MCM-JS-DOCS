import { ExampleIProps } from "../../../../commonsComponents/units/template/form/example/template.example.types";
import { sliderDefaultChildren } from "./slider.example.code.data";
import { sliderCodeList } from "./slider.example.code.data";

export const initSliderCommonsProps = {
  children: [],
};

export const sliderExampleList = (): Array<ExampleIProps> => [
  {
    title: "기본 (Basic)",
    contents: [
      {
        remakrs: "제일 기본적으로 실행되는 슬라이더입니다.",
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
    title: "전환 버튼 비활성화",
    contents: [
      {
        remakrs: "이전 또는 다음으로 이동하는 전환 버튼을 숨깁니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.hideArrow(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          pagination: { showPageList: true },
          hideArrow: true,
        },
      },
    ],
  },
  {
    title: "자동 전환(Autoplay) 및 타이머 적용",
    isFull: true,
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
    title: "마우스 드래그 기능 적용",
    // isFull: true,
    contents: [
      {
        remakrs:
          "마우스로 드래그하여 페이지를 이전 또는 다음으로 전환할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.useDragMode(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          useDragMode: {
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
          "슬라이더 전체의 최소 높이값을 지정할 수 있습니다. <br />web과 mobile을 별도로 지정하여 웹 사이즈와 모바일 사이즈를 각각 조절할 수 있습니다.",
        content: sliderDefaultChildren,
        code: sliderCodeList.minHeight(),
        addProps: {
          ...initSliderCommonsProps,
          useAnimation: true,
          pagination: {
            showPageList: true,
          },
          listMinHeight: {
            web: "240px",
            mobile: "200px",
          },
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
          "최초로 시작하는 페이지를 설정합니다. <br />나열된 페이지 번호 중 처음 렌더하고 싶은 페이지의 번호를 입력해주세요. (default : 1)",
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

import styled from "@emotion/styled";

import { SliderPropsTypes } from "mcm-js-dev/dist/commons/types";
import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Slider } = getLibraries();

export default function MySliderExample(props: ExampleContentsTypes) {
  const { children, ..._props } = props.addProps as SliderPropsTypes;
  const _children = props.isError ? undefined : props.commonsProps?.children;

  return (
    <Wrapper>
      {/* @ts-ignore */}
      {props?.replaceChildren || <Slider {..._props}>{_children}</Slider>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  .mcm-slider-contents {
    min-height: 120px;
  }

  .slider-image-example {
    pointer-events: none; // PC 이미지 다운로드 금지
    -webkit-touch-callout: none; // 아이폰 다운로드 금지
    -webkit-user-select: none; // 드래그 방지
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;
  }
`;

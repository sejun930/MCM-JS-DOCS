import { SliderPropsTypes } from "mcm-js-dev/dist/commons/types";
import { getLibraries } from "src/main/commonsComponents/functional";
import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";

const { Slider } = getLibraries();
export default function MySliderExample(props: ExampleContentsTypes) {
  const { children, ..._props } = props.addProps as SliderPropsTypes;
  const _children = props.isError ? undefined : props.commonsProps?.children;

  return (
    // @ts-ignore
    <Slider {..._props}>{_children}</Slider>
  );
}

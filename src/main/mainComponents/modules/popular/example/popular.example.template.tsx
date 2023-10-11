import { getLibraries } from "src/main/commonsComponents/functional/modules";

import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { PopularPropsTypes } from "mcm-js-dev/dist/commons/types";

const { Popular } = getLibraries();
export default function MyPopularExample(props: ExampleContentsTypes) {
  const _props = (props.addProps as PopularPropsTypes) || {};

  let _Children = <Popular {..._props} />;
  // 대체용 컴포넌트가 있는 경우
  if (props.replaceChildren) _Children = props.replaceChildren;

  return _Children;
}

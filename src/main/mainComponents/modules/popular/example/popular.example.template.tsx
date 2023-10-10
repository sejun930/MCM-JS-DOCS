import { getLibraries } from "src/main/commonsComponents/functional/modules";

import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { PopularPropsTypes } from "mcm-js-dev/dist/commons/types";

const { Popular } = getLibraries();
export default function MyPopularExample(props: ExampleContentsTypes) {
  //   const [list] = useState(popularInitList || []);

  let _props = (props.addProps as PopularPropsTypes) || {};
  //   _props.list = list;

  return <Popular {..._props} />;
}

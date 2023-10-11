import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example/template.example.container";
import _PropsForm from "src/main/commonsComponents/units/template/form/props";
// import _TreeForm from "src/main/commonsComponents/units/template/form/tree";
// import _CommentsForm from "src/main/commonsComponents/units/template/form/comments/comments.render";

import { popularCodeList } from "./example/popular.example.code.data";
import { popularExampleList } from "./example/popular.example.render.data";
import { getCommonsHighlight } from "src/commons/highlight";
// import { alertFunctionalList } from "./functional";
import { popularPropsList } from "./props/popular.propsList";

export const popularInitList = [
  <p> 서해안 골뱅이 500g </p>,
  <p> 허니레몬 캔디 450p 1.26kg, 1개 </p>,
  <p> 프로틴 더블 리치 초콜릿 맛, 2.268kg </p>,
  <p> 국내산 논 우렁살 (냉장), 180g, 1개 </p>,
  <p> [원두커피1kg] 갓 볶은 신선한 원두커피 1kg </p>,
];
export const popularInitProps = {
  list: popularInitList,
  minHeight: { web: 40 },
};

export default function MyPopular() {
  return (
    <Template>
      <_MainTitleTemplate />
      <_HowUseForm
        codeInfo={popularCodeList}
        exmapleContents={getCommonsHighlight.colors("Open Alert").text}
      />
      <_ExampleForm
        exampleList={popularExampleList()}
        initProps={popularInitProps}
        commonsProps={{}}
      />
      <_PropsForm list={popularPropsList} />

      {/*

      <_TreeForm />
      <_CommentsForm /> */}
    </Template>
  );
}

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example/template.example.container";
import _PropsForm from "src/main/commonsComponents/units/template/form/props";
import _TreeForm from "src/main/commonsComponents/units/template/form/tree";
import _CommentsForm from "src/main/commonsComponents/units/template/form/comments/comments.render";

import React from "react";
import { sliderExampleList } from "./example/slider.example.render.data";

import {
  sliderCodeList,
  sliderDefaultChildren,
} from "./example/slider.example.code.data";
import { initSliderCommonsProps } from "./example/slider.example.render.data";
import { getUuid } from "src/main/commonsComponents/functional";

export default function MySlider() {
  const commonsProps = {
    children: [
      <p>Hello</p>,
      <p>World</p>,
      <img src="/images/modules/example/tooltip/dancing.gif" />,
    ].map((el) => <React.Fragment key={getUuid()}>{el}</React.Fragment>),
  };

  return (
    <Template>
      <_MainTitleTemplate />
      <_HowUseForm
        codeInfo={sliderCodeList}
        exmapleContents={sliderDefaultChildren}
      />
      <_ExampleForm
        exampleList={sliderExampleList()}
        initProps={initSliderCommonsProps}
        commonsProps={commonsProps}
      />
      <_PropsForm />
      <_TreeForm />
      <_CommentsForm />
    </Template>
  );
}

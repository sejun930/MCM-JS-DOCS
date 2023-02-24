import React from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";

import { moduleState } from "src/commons/store";
import { ExampleIProps } from "./template.example.types";
import { renderTemplateList } from "./template.example.data";

import CommonsHooksComponents from "src/main/commonsComponents/hooks";
import _Title from "../../../title";
import _SubTitleTemplate from "../../title/subTitle";

import ModalExampleRenderPage from "src/main/mainComponents/modules/modal/example";

export default function _ExampleForm({
  exampleList, // 렌더되는 예시용 컴포넌트들
}: {
  exampleList: Array<ExampleIProps>;
}) {
  const { componentRender } = CommonsHooksComponents();
  const [module] = useRecoilState(moduleState);

  console.log(renderTemplateList[module]);

  return (
    <_SubTitleTemplate title="사용 예시">
      <ExampleWrapper>
        {exampleList &&
          exampleList?.length &&
          exampleList.map((el, key) => (
            <ExampleItems
              key={`${module}_${key + 1}`}
              isFull={el.isFull ?? false}
            >
              <_Title title={el.title} titleLevel="h3" />
              <ExampleResult>
                {el.exampleContents &&
                  el.exampleContents.length &&
                  el.exampleContents.map((component, key2) => {
                    console.log(component);
                    // console.log(component.component);
                    return (
                      <React.Fragment key={`${module}_${key}_${key2}`}>
                        {renderTemplateList[module] &&
                          renderTemplateList[module](component)}
                      </React.Fragment>
                    );
                    // return <>{componentRender(component.component)}</>;
                  })}
              </ExampleResult>
            </ExampleItems>
          ))}
      </ExampleWrapper>
    </_SubTitleTemplate>
  );
}

interface StyleTypes {
  offBoard?: boolean;
  isFull?: boolean;
}

export const ExampleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 60px 0px;
`;

export const ExampleItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;

  h3 {
    font-size: 20px;
  }

  ._button_ {
    padding: 0.7rem 1.5rem;
    border-radius: 10px;
    background-color: #7b2869;
    color: white;
    font-weight: 700;
    font-size: 14px;
  }

  ${(props: StyleTypes) =>
    props.isFull && {
      width: "100%",
    }}
`;

export const ExampleResult = styled.div`
  display: flex;
  width: 100%;
  border: solid 1px #dddddd;
  margin-top: 15px;
  border-radius: 5px;
  padding: 1rem;

  ${(props: StyleTypes) =>
    props.offBoard && {
      border: "unset",
      height: "auto",
    }}
`;

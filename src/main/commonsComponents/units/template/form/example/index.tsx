import {
  ExampleContents,
  ExampleContentsItems,
  ExampleItems,
  ExampleResult,
  ExampleWrapper,
} from "./template.example.styles";

import React from "react";
import { useRecoilState } from "recoil";

import { moduleState } from "src/commons/store";
import { IProps } from "./template.example.types";
import { renderTemplateList } from "./template.example.data";

import _ExampleOptionalFormPage from "./optional";
import _Title from "../../../title";
import _SubTitleTemplate from "../../title/subTitle";
import _PText from "../../../text/p";

export default function _ExampleForm({
  exampleList, // 렌더되는 예시용 컴포넌트들
  initProps, // 예시용 컴포넌트 렌더시에 각각에 전달되는 Props 값 초기화
  commonsProps, // 컴포넌트 렌더를 위해 필수적으로 사용되는 props 값들
}: IProps) {
  const [module] = useRecoilState(moduleState);
  let _idx = 0;

  return (
    <_SubTitleTemplate title="사용 예시" className="_example_template_title_">
      <ExampleWrapper>
        {exampleList &&
          exampleList?.length &&
          exampleList.map((el, idx: number) => (
            <ExampleItems
              key={`${module}_${idx + 1}`}
              isFull={el.isFull ?? false}
            >
              <_Title title={el.title} titleLevel="h3" />
              <ExampleResult>
                {el.contents &&
                  el.contents.length &&
                  el.contents.map((component, idx2: number) => {
                    // 렌더할 때 넘겨줄 props 옵션 값 설정
                    const addProps = { ...initProps, ...component.addProps };
                    component.addProps = { ...addProps };

                    // 렌더될 대상의 인덱스 값 지정
                    component.info.idx = _idx++;

                    // 해당 컴포넌트를 실행할 수 있는 공통 props 값 지정
                    component.commonsProps = { ...commonsProps };

                    return (
                      <ExampleContents key={`${module}_${idx}_${idx2}`}>
                        <ExampleContentsItems>
                          {(renderTemplateList[module] &&
                            renderTemplateList[module](component)) || <></>}
                          <_PText
                            text={component.remakrs}
                            className="_exmaple_remarks_"
                          />
                        </ExampleContentsItems>
                        <_ExampleOptionalFormPage code={component.code} />
                      </ExampleContents>
                    );
                  })}
              </ExampleResult>
            </ExampleItems>
          ))}
      </ExampleWrapper>
    </_SubTitleTemplate>
  );
}

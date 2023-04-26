import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";
import { versState } from "src/commons/store";

import { _Button, _Title, _PText } from "mcm-js-commons";
import _SubTitleTemplate from "../../title/subTitle";
import _ExampleOptionalFormPage from "./optional";

import { renderTemplateList } from "./template.example.data";
import { Wrapper } from "../form.commons.styles";
import {
  ExampleContentsItems,
  ExampleContentsWrapper,
  ExampleListItems,
  ExampleListWrapper,
  ExampleResultList,
  ExampleTitleWrapper,
} from "./template.example.styles";
import {
  ExampleContentsTypes,
  IProps,
  UIProps,
} from "./template.example.types";

export default function _ExampleUIPage({ props }: { props: IProps & UIProps }) {
  const {
    exampleList,
    initProps,
    commonsProps,
    openList,
    changeOpenList,
    isOneOpen,
    allLen,
  } = props;
  const [module] = useRecoilState(moduleState);
  const [vers] = useRecoilState(versState);

  let _idx = 0;

  return (
    <Wrapper>
      <ExampleTitleWrapper>
        <_SubTitleTemplate
          title="Example"
          className="exmaple-subTitle"
          remakrs="각각의 사용 예시들을 통해 어떻게 사용할 수 있는지 알아봅시다."
          sideComponent={
            <_Button
              className="toggle-all-code-btn"
              onClickEvent={() =>
                changeOpenList(
                  -1,
                  Array.from(new Array(allLen), () => !isOneOpen)
                )
              }
            >
              모든 코드 {isOneOpen ? "닫기" : "열기"}
            </_Button>
          }
        />
      </ExampleTitleWrapper>
      <ExampleContentsWrapper>
        {exampleList &&
          exampleList?.length &&
          exampleList.map((el, idx: number) => (
            <ExampleContentsItems
              key={`${module}_${idx + 1}`}
              isFull={el.isFull ?? false}
            >
              <_Title
                titleLevel="h3"
                className={(el.isErrorForm && "error-form") || undefined}
              >
                {el.isErrorForm ? "❗ 모듈 호출시 에러 발생 예시" : el.title}
              </_Title>
              <ExampleResultList>
                {el.contents &&
                  el.contents.length &&
                  el.contents.map(
                    (component: ExampleContentsTypes, idx2: number) => {
                      // 렌더할 때 넘겨줄 props 옵션 값 설정
                      const addProps = {
                        ...initProps,
                        ...component.addProps,
                      };
                      component.addProps = { ...addProps };
                      component.isError = el?.isErrorForm || false;

                      // 렌더될 대상의 인덱스 값 지정
                      component.info.idx = _idx;
                      _idx++;

                      // 해당 컴포넌트를 실행할 수 있는 공통 props 값 지정
                      component.commonsProps = { ...commonsProps };

                      // 하위 컴포넌트들의 width 값 지정하기
                      let width: string = "100%";
                      if (el.isFull) {
                        width = `${100 / el.contents.length}%`;
                      }

                      return (
                        <ExampleListWrapper
                          key={`${module}_${idx}_${idx2}`}
                          style={{ width }}
                        >
                          <ExampleListItems>
                            {(renderTemplateList[module] &&
                              renderTemplateList[module](component)) || <></>}
                            <_PText className="example-remarks">
                              {component.remakrs}
                            </_PText>
                          </ExampleListItems>
                          {component.code && (
                            <_ExampleOptionalFormPage
                              code={component.code[vers]}
                              content={component.content}
                              isOpen={openList[_idx - 1]}
                              changeOpenList={changeOpenList}
                              codeIdx={_idx - 1}
                            />
                          )}
                        </ExampleListWrapper>
                      );
                    }
                  )}
              </ExampleResultList>
            </ExampleContentsItems>
          ))}
      </ExampleContentsWrapper>
    </Wrapper>
  );
}

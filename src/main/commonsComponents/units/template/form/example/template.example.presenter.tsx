import { useRecoilState } from "recoil";
import { versState, moduleState } from "src/commons/store";

import { _Button, _Title, _PText, _PTextWithHtml } from "mcm-js-commons";
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

// 모든 코드들의 높이값을 저장하는 객체
const allHeightList = {};
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
  // const [ allHeightList, setAllHeightList ] = useState({})

  const [module] = useRecoilState(moduleState);
  const [vers] = useRecoilState(versState);

  let _idx = 0;

  return (
    <Wrapper id="example-form">
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
                  Array.from(new Array(allLen), () => !isOneOpen),
                  true
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
          exampleList.map(
            (el, idx: number) =>
              !el.isHide && (
                <ExampleContentsItems
                  key={`${module}_${idx + 1}`}
                  isFull={el.isFull ?? false}
                  className={(el.isFull && "example-list-wrapper") || undefined}
                >
                  <_Title
                    titleLevel="h3"
                    className={(el.isError && "error-form") || undefined}
                  >
                    {el.isError ? "❗ 모듈 호출시 에러 발생 예시" : el.title}
                  </_Title>
                  {el.blockRemarks && (
                    <_PText className="example-block-remarks">
                      {el.blockRemarks}
                    </_PText>
                  )}
                  <ExampleResultList className="example-list-items">
                    {(Array.isArray(el.contents) // 콘텐츠가 여러개인지 검증
                      ? el.contents
                      : [el.contents]
                    ) // 한개라면 배열에 감싸기
                      .map((component: ExampleContentsTypes, idx2: number) => {
                        // 렌더할 때 넘겨줄 props 옵션 값 설정
                        const addProps = {
                          ...initProps,
                          ...component.addProps,
                        };
                        component.addProps = { ...addProps };
                        // 에러케이스 처리
                        component.isError = el?.isError || false;
                        // vers 저장
                        component.vers = vers;

                        // 렌더될 대상의 인덱스 값 지정
                        if (component.info) component.info.idx = _idx;
                        _idx++;

                        // 해당 컴포넌트를 실행할 수 있는 공통 props 값 지정
                        component.commonsProps = { ...commonsProps };

                        // 하위 컴포넌트들의 width 값 지정하기
                        let width: string = "100%";
                        if (el.isFull) {
                          width = `${
                            100 /
                            ((Array.isArray(el.contents) &&
                              el.contents.length) ||
                              1)
                          }%`;
                        }

                        let code = component.code;
                        if (typeof code === "function") code = code();
                        if (Array.isArray(code)) code = code[vers];

                        return (
                          <ExampleListWrapper
                            key={`${module}_${idx}_${idx2}`}
                            style={{ width }}
                            className="example-list"
                          >
                            <ExampleListItems>
                              {renderTemplateList[module] &&
                                renderTemplateList[module](component)}
                              <_PTextWithHtml
                                className="example-remarks"
                                dangerouslySetInnerHTML={component.remakrs}
                              />
                            </ExampleListItems>
                            {component.code && (
                              <_ExampleOptionalFormPage
                                code={code ?? ""}
                                content={component.content}
                                isOpen={openList[_idx - 1]}
                                changeOpenList={changeOpenList}
                                codeIdx={_idx - 1}
                                changeContent={component.changeContent || ""}
                                allHeightList={allHeightList}
                                replaceAllCode={
                                  component.replaceAllCode || null
                                }
                              />
                            )}
                          </ExampleListWrapper>
                        );
                      })}
                  </ExampleResultList>
                </ExampleContentsItems>
              )
          )}
      </ExampleContentsWrapper>
    </Wrapper>
  );
}

import { useRecoilState } from "recoil";
import { versState, moduleState, settingInfoState } from "src/commons/store";

import { _Button, _Title, _PTextWithHtml } from "mcm-js-commons";
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
import { getExampleErrorText } from "src/main/commonsComponents/functional";
import { useEffect } from "react";

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
  // 현재 선택된 모듈명
  const [module] = useRecoilState(moduleState);
  // 모듈의 버전
  const [vers] = useRecoilState(versState);
  // 셋팅 정보
  const [settingInfo] = useRecoilState(settingInfoState);

  let _idx = 0;

  // 모든 코드 열기/닫기 여부 저장
  const _isOneOpen = isOneOpen;

  useEffect(() => {
    // 열기가 고정되어 있는 경우
    if (settingInfo.openFix)
      // 모든 코드 초기 오픈
      changeOpenList(
        -1,
        Array.from(new Array(allLen), () => true),
        true
      );
  }, [settingInfo.openFix]);

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
                  Array.from(new Array(allLen), () => !_isOneOpen),
                  true
                )
              }
            >
              모든 코드 {_isOneOpen ? "닫기" : "열기"}
            </_Button>
          }
        />
      </ExampleTitleWrapper>
      <ExampleContentsWrapper id={`${module}-exmaple-wrapper`}>
        {exampleList &&
          exampleList?.length &&
          exampleList.map(
            (el, idx: number) =>
              !el.isHide && (
                <ExampleContentsItems
                  key={`${module}_${idx + 1}+${vers}`}
                  isFull={el?.isFull !== undefined || false}
                  className={(el.isFull && "example-list-wrapper") || undefined}
                >
                  <_Title
                    titleLevel="h3"
                    className={(el.isError && "error-form") || undefined}
                  >
                    {el.isError ? "❗ 모듈 호출시 에러 발생 예시" : el.title}
                  </_Title>
                  {el.blockRemarks && (
                    <_PTextWithHtml
                      className="example-block-remarks"
                      dangerouslySetInnerHTML={el.blockRemarks}
                    />
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
                        component.isError =
                          el?.isError?.requiredList !== undefined || false;
                        if (el?.isError && el.isError?.requiredList) {
                          component.remakrs = getExampleErrorText(
                            module,
                            el.isError.requiredList
                          );
                        }

                        // vers 저장
                        component.vers = vers;

                        // 렌더될 대상의 인덱스 값 지정
                        if (component.info) component.info.idx = _idx;
                        _idx++;

                        // 해당 컴포넌트를 실행할 수 있는 공통 props 값 지정
                        component.commonsProps = { ...commonsProps };

                        // 하위 컴포넌트들의 width 값 지정하기
                        let width: string = el.isFull?.isHalf ? "50%" : "100%";
                        if (el.isFull && !el.isFull?.isHalf) {
                          width = `${
                            100 /
                            ((Array.isArray(el.contents) &&
                              el.contents.length) ||
                              1)
                          }%`;
                        }

                        if (component.isFull) width = "100%";

                        let code = component.code;
                        if (typeof code === "function") code = code();
                        if (Array.isArray(code)) code = code[vers];

                        return (
                          <ExampleListWrapper
                            key={`${module}_${idx}_${idx2}+${vers}={${_idx}}`}
                            style={{ width }}
                            className="example-list"
                          >
                            <ExampleListItems className="example-components">
                              {renderTemplateList[module] &&
                                renderTemplateList[module](component)}
                              <_PTextWithHtml
                                className="example-remarks"
                                dangerouslySetInnerHTML={component.remakrs}
                              />
                            </ExampleListItems>
                            {code !== undefined && code !== null && (
                              <_ExampleOptionalFormPage
                                code={code || ""}
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

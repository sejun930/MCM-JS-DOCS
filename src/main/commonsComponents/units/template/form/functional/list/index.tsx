import {
  FunctionalInfoWrapper,
  FunctionalWrapper,
  PropsInfoItems,
  PropsInfoList,
  PropsInfoWrapper,
  TitleWrapper,
  ExampleCodeBtnWrapper,
  InfoListWrapper,
  Info,
} from "./index.styles";

import { MutableRefObject } from "react";
import { v4 } from "uuid";

import { FunctionalListType } from "src/commons/data/functional/functional.commons.data";
import { _Title, _SpanText, _PText } from "mcm-js-commons";
import ModulePropsListFormPage from "../../props/list";
import _Copy from "src/main/commonsComponents/units/copy";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";

export default function FunctionalDetailInfoListPage({
  module,
  list,
  propsRef,
}: {
  module: string;
  list: Array<FunctionalListType>;
  propsRef?: MutableRefObject<HTMLDivElement>;
}) {
  const { componentRender } = CommonsHooksComponents();
  const { getReturn, getCommonsReturn, getExampleCode } =
    getExampleCodeComponnet();

  // props 페이지 위치로 이동
  const movePropsPage = () => {
    if (propsRef?.current.offsetTop) {
      window.scrollTo({
        top: propsRef?.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  const renderComponent = (str: any) => {
    return str;
  };

  return (
    <FunctionalWrapper>
      {list.map((el) => {
        const key = v4();
        return (
          <FunctionalInfoWrapper key={key}>
            <TitleWrapper>
              <_Title titleLevel="h3" className="functional-name">
                {module}.{el.name}()
              </_Title>
              <_PText className="function-remarks">{el.remakrs}</_PText>
            </TitleWrapper>
            <PropsInfoWrapper>
              <PropsInfoItems>
                <_PText className="props-title">- 📤 Props</_PText>
                <PropsInfoList>
                  {el.props.isSameContents ? (
                    <_PText className="same-props">
                      본문과 동일한 props 입니다.{" "}
                      <button
                        className="move-props-list"
                        type="button"
                        onClick={movePropsPage}
                      >
                        Props List
                      </button>
                      를 확인해주세요.
                    </_PText>
                  ) : (
                    <ModulePropsListFormPage list={el.props.list} />
                  )}
                </PropsInfoList>
              </PropsInfoItems>
              <PropsInfoItems>
                <_PText className="props-title">- 📝 Example</_PText>
                {el?.setExampleCode && (
                  <ExampleCodeBtnWrapper>
                    {componentRender(el.setExampleCode)}
                  </ExampleCodeBtnWrapper>
                )}

                <_Copy
                  text={getExampleCode({
                    code: el.exampleCode,
                    idx: -1,
                    children: "",
                  })}
                  showText={getReturn(
                    getCommonsReturn({
                      code: "",
                      idx: -1,
                      children: "",
                    }) || el.exampleCode
                  )}
                  type="Code"
                  className="functional-props-code-wrapper"
                />
              </PropsInfoItems>
              {el.info && el.info.length && (
                <PropsInfoItems>
                  <_PText className="props-title">- 💡 사용시 참고사항 </_PText>
                  <InfoListWrapper>
                    {el.info.map((infoStr, key2) => (
                      <Info
                        key={`${key}_infoList_${key2}`}
                        dangerouslySetInnerHTML={{ __html: infoStr }}
                      />
                    ))}
                  </InfoListWrapper>
                </PropsInfoItems>
              )}
            </PropsInfoWrapper>
          </FunctionalInfoWrapper>
        );
      })}
    </FunctionalWrapper>
  );
}

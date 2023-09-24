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
import { getUuid, moveDocument } from "src/main/commonsComponents/functional";

import { FunctionalListType } from "..";
import { _Title, _PText } from "mcm-js-commons";
import ModulePropsListFormPage from "../../props/list";
import _Copy from "src/main/commonsComponents/units/copy";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
import getExampleCodeComponnet from "src/main/commonsComponents/hooks/getExampleCodeHooks";
import { getCommonsHighlight } from "src/commons/highlight";

export default function FunctionalDetailInfoListPage({
  module,
  vers,
  list,
  isFunctional,
}: {
  module: string;
  vers: number;
  list: Array<FunctionalListType>;
  isFunctional?: boolean;
}) {
  const { componentRender } = CommonsHooksComponents();
  const { getCommonsReturn, getExampleCode } = getExampleCodeComponnet();

  // props 페이지 위치로 이동
  const movePropsPage = () => {
    moveDocument({ id: "props-form", bonus: -50, isSmooth: true });
  };

  return (
    <FunctionalWrapper>
      {list.map((el) => {
        const key = getUuid();

        return (
          <FunctionalInfoWrapper key={key}>
            <TitleWrapper id={el.id}>
              <_Title titleLevel="h3" className="functional-name">
                {module}.{el.name}()
              </_Title>
              <_PText className="function-remarks">{el.remakrs}</_PText>
            </TitleWrapper>
            <PropsInfoWrapper>
              {((el.props.list && el.props.list.length) ||
                el.props.isSameContents) && (
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
                      <ModulePropsListFormPage
                        list={el.props.list || []}
                        vers={vers || 0}
                        isFunctional={isFunctional || false}
                      />
                    )}
                  </PropsInfoList>
                </PropsInfoItems>
              )}
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
                    module,
                    vers,
                  })}
                  showText={getCommonsHighlight.return(
                    getCommonsReturn({
                      code: "",
                      idx: -1,
                      children: "",
                      module,
                    }) || el.exampleCode
                  )}
                  type="Code"
                  className="functional-props-code-wrapper"
                />
              </PropsInfoItems>
              {el.info && el.info.length && (
                <PropsInfoItems>
                  <_PText className="props-title">- 💡 사용시 주의사항 </_PText>
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

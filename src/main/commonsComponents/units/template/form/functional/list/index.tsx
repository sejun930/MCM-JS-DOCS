import { MutableRefObject } from "react";
import { useRecoilState } from "recoil";
import { versState } from "src/commons/store";

import { v4 } from "uuid";
import styled from "@emotion/styled";

import { FunctionalListType } from "src/commons/data/functional/functional.commons.data";
import { _Title, _SpanText, _PText } from "mcm-js-commons";
import ModulePropsListFormPage from "../../props/list";
import _Copy from "src/main/commonsComponents/units/copy";

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
  const [vers] = useRecoilState(versState);
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

  return (
    <FunctionalWrapper>
      {list.map((el, idx) => {
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
                <_Copy
                  text={getExampleCode({
                    code: "aa",
                    idx: (vers || 0) + (idx + 1),
                    children: "22",
                  })}
                  showText={getReturn(
                    getCommonsReturn({
                      code: "aa",
                      idx: (vers || 0) + (idx + 1),
                      children: "22",
                    })
                  )}
                  type="Code"
                  className="functional-props-code-wrapper"
                />
              </PropsInfoItems>
            </PropsInfoWrapper>
          </FunctionalInfoWrapper>
        );
      })}
    </FunctionalWrapper>
  );
}

export const FunctionalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

export const FunctionalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border-bottom: solid 4px #aa5656; */
`;

export const TitleWrapper = styled.div`
  /* align-items: center; */
  /* justify-content: space-between; */
  background-color: #eeeeee;
  padding: 20px 24px;

  .functional-name {
    font-size: 18px;
  }

  .function-remarks {
    font-size: 14px;
    margin-top: 10px;
    white-space: pre;
    overflow: auto;
  }
`;

export const PropsInfoWrapper = styled.div`
  /* max-height: 0px; */
  overflow: hidden;
`;

export const PropsInfoItems = styled.div`
  padding: 24px 24px;
  padding-right: 0px;
  border-left: solid 4px rgba(170, 86, 86, 0.4);
  /* border-bottom: double 2px #aa5656; */

  .props-title {
    font-weight: 500;
  }

  .functional-props-code-wrapper {
    margin-top: 16px;
  }
`;

export const PropsInfoList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  .same-props {
    color: gray;
    font-size: 14px;

    .move-props-list {
      color: blue;
      font-weight: 500;
    }
  }

  .props-list-wrapper {
    margin-top: 10px;
  }
`;

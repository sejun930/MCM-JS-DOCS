import {
  IndexList,
  IndexListWrapper,
  Items,
  OptionWrapper,
  OpenIndexButton,
  Loading,
} from "./index.styles";

import { _Button, _CloseButton, _PText } from "mcm-js-commons";
import { getUuid } from "../../functional";

import { indexOptionalDataList } from "./index.data";
import { Tooltip } from "mcm-js";

import {
  IndexIPropsTypes,
  IndexUIPropsTypes,
  IndexPagePropsTypes,
} from "./index.type";

type allTypes = IndexIPropsTypes & IndexUIPropsTypes & IndexPagePropsTypes;
export default function _IndexUIForm(props: { [key: string]: any } & allTypes) {
  const {
    indexList,
    current,
    moveIndex,
    toggleIndex,
    isMinimum,
    show,
    loading,
  } = props;

  return (
    <Items className="mcm-index-items">
      {loading && (
        <Loading>
          <_PText>페이지 로딩중</_PText>
        </Loading>
      )}

      {show ? (
        <>
          <OptionWrapper className="mcm-index-option-wrapper" loading={loading}>
            {indexOptionalDataList.map((info, idx) => (
              <Tooltip
                key={`index-option-list-${info.target}-${idx}`}
                useShowAnimation
                tooltipText={
                  Array.isArray(info.tooltipText)
                    ? info.tooltipText[Number(props[info.target])]
                    : info.tooltipText
                }
                isDisable={loading}
              >
                {info.isClose ? (
                  <_CloseButton
                    onClickEvent={() => !loading && toggleIndex(false)}
                    className="mcm-index-close-button"
                  />
                ) : (
                  <_Button
                    className={`mcm-index-optional-button mcm-index-${
                      info.target
                    }-button ${props[info.target] ? "on" : "off"}`}
                    onClickEvent={() =>
                      (info.clickEvent &&
                        !loading &&
                        props[info.clickEvent]()) ||
                      undefined
                    }
                  >
                    {Array.isArray(info.emoji)
                      ? info.emoji[Number(props[info.target])]
                      : info.emoji}
                  </_Button>
                )}
              </Tooltip>
            ))}
          </OptionWrapper>
          <IndexListWrapper>
            {!isMinimum ? (
              indexList.map((list, idx) => (
                <IndexList
                  key={getUuid()}
                  isSelected={current === idx}
                  loading={loading}
                >
                  <_Button
                    onClickEvent={() =>
                      current !== idx && !loading && moveIndex(list.id)
                    }
                    className="index-button"
                  >
                    {list.title}
                  </_Button>
                </IndexList>
              ))
            ) : (
              <IndexList isSelected={true}>
                <_Button onClickEvent={() => {}} className="index-button">
                  {indexList[current].title}
                </_Button>
              </IndexList>
            )}
          </IndexListWrapper>
        </>
      ) : (
        <Tooltip tooltipText="목차 보이기" useShowAnimation>
          <OpenIndexButton onClickEvent={() => toggleIndex(true)}>
            📋
          </OpenIndexButton>
        </Tooltip>
      )}
    </Items>
  );
}

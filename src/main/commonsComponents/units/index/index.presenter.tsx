import {
  IndexList,
  IndexListWrapper,
  Items,
  OptionWrapper,
  OpenIndexButton,
} from "./index.styles";

import { _Button, _CloseButton } from "mcm-js-commons";
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
  const { indexList, current, moveIndex, toggleIndex, isMinimum, show } = props;

  return (
    <Items className="mcm-index-items">
      {show ? (
        <>
          <OptionWrapper className="mcm-index-option-wrapper">
            {indexOptionalDataList.map((info, idx) => (
              <Tooltip
                key={`index-option-list-${info.target}-${idx}`}
                useShowAnimation
                tooltipText={
                  Array.isArray(info.tooltipText)
                    ? info.tooltipText[Number(props[info.target])]
                    : info.tooltipText
                }
              >
                {info.isClose ? (
                  <_CloseButton
                    onClickEvent={() => toggleIndex(false)}
                    className="mcm-index-close-button"
                  />
                ) : (
                  <_Button
                    className={`mcm-index-optional-button mcm-index-${
                      info.target
                    }-button ${props[info.target] ? "on" : "off"}`}
                    onClickEvent={() =>
                      (info.clickEvent && props[info.clickEvent]()) || undefined
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
                <IndexList key={getUuid()} isSelected={current === idx}>
                  <_Button
                    onClickEvent={() => current !== idx && moveIndex(list.id)}
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

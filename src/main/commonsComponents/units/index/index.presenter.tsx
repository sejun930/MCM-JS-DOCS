import {
  IndexList,
  IndexListWrapper,
  Items,
  OptionWrapper,
  FixButton,
  ResizeButton,
} from "./index.styles";

import { _Button, _CloseButton } from "mcm-js-commons";
import { getUuid } from "../../functional";

import { indexOptionalDataList } from "./index.data";
import { Tooltip } from "mcm-js-dev";

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
    closeIndex,
    toggleFix,
    fix,
    isMinimum,
    toggleMinimum,
  } = props;

  return (
    <Items className="mcm-index-items">
      <OptionWrapper className="mcm-index-option-wrapper">
        {indexOptionalDataList.map((info, idx) => (
          <Tooltip
            key={`index-option-list-${info.target}-${idx}`}
            useShowAnimation
            position={{ top: "-50px" }}
            tooltipText={
              Array.isArray(info.tooltipText)
                ? info.tooltipText[Number(props[info.target])]
                : info.tooltipText
            }
          >
            {info.isClose ? (
              <_CloseButton
                onClickEvent={closeIndex}
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

        {/* <Tooltip
          tooltipText={fix ? "목차 가리기" : "목차 고정"}
          useShowAnimation
          position={{ top: "-50px" }}
        >
          <FixButton
            onClickEvent={toggleFix}
            fix={fix}
            className="mcm-index-fix-button"
          >
            📌
          </FixButton>
        </Tooltip>

        <Tooltip
          tooltipText={isMinimum ? "최대화" : "최소화"}
          useShowAnimation
          position={{ top: "-50px" }}
        >
          <ResizeButton onClickEvent={toggleMinimum}>
            {!isMinimum ? "↙" : "↗"}
          </ResizeButton>
        </Tooltip>

        <Tooltip
          tooltipText="목차 닫기"
          useShowAnimation
          position={{ top: "-50px" }}
        >
          <_CloseButton
            onClickEvent={closeIndex}
            className="mcm-index-close-button"
          />
        </Tooltip> */}
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
    </Items>
  );
}

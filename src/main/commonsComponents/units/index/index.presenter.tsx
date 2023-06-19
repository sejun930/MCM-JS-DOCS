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

import {
  IndexIPropsTypes,
  IndexUIPropsTypes,
  IndexPagePropsTypes,
} from "./index.type";

export default function _IndexUIForm({
  indexList,
  current,
  moveIndex,
  closeIndex,
  toggleFix,
  fix,
  isMinimum,
  toggleMinimum,
}: IndexIPropsTypes & IndexUIPropsTypes & IndexPagePropsTypes) {
  return (
    <Items className="mcm-index-items">
      <OptionWrapper className="mcm-index-option-wrapper">
        {/* 목차 hover 고정 */}
        <FixButton
          onClickEvent={toggleFix}
          fix={fix}
          className="mcm-index-fix-button"
        >
          📌
        </FixButton>
        {/* 최소화 & 최대화 */}
        <ResizeButton onClickEvent={toggleMinimum}>
          {!isMinimum ? "↙" : "↗"}
        </ResizeButton>
        {/* 목차 닫기 */}
        <_CloseButton
          onClickEvent={closeIndex}
          className="mcm-index-close-button"
        />
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

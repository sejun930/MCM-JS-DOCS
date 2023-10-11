import { useState } from "react";

import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Tooltip } = getLibraries();

export default function TooltipExampleDisableReplacePage() {
  // Tooltip의 활성화 또는 비활성화의 기준이 되는 state 값입니다.
  const [isDisable, setIsDisable] = useState(false);

  // isDisable state 값을 true 또는 false로 변경합니다.
  const toggleDisable = () => {
    setIsDisable((prev) => !prev);
  };

  return (
    <Wrapper>
      <ToggleBtn onClickEvent={toggleDisable} isTooltipDisable={isDisable}>
        Tooltip {isDisable ? "활성화" : "비활성화"} 실행
      </ToggleBtn>
      <Tooltip
        tooltipText="활성화 상태입니다."
        // isDisable state값이 true라면 Tooltip이 실행되지 않습니다.
        isDisable={isDisable}
      >
        <p> 활성화 상태에서만 Tooltip이 실행됩니다. </p>
      </Tooltip>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 10px 0px;

  p {
    margin: 0px;
  }

  @media ${breakPoints.mobileLarge} {
    align-items: center;
  }
`;

const ToggleBtn = styled(_Button)`
  border: double 3px gray;
  padding: 6px 10px;

  ${(props: { isTooltipDisable?: boolean }) =>
    props.isTooltipDisable && {
      backgroundColor: "#dddddd",
      color: "gray",
    }}
`;

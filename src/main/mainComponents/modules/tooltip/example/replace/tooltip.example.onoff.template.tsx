import { useState } from "react";

import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { getLibraries } from "src/main/commonsComponents/functional/modules";
import { TooltipPropsType } from "mcm-js/dist/commons/types";

const { Tooltip } = getLibraries();
export default function TooltipExampleOnOffReplacePage(
  props: TooltipPropsType
) {
  const [open, setOpen] = useState(false);

  const toggleDisable = () => {
    setOpen((prev) => !prev);
  };

  const closeDisable = () => {
    setOpen(false);
  };

  const { tooltipText, ..._props } = props;

  return (
    <Wrapper>
      <ToggleBtn onClickEvent={toggleDisable}>
        툴팁 {open ? "종료" : "실행"}
      </ToggleBtn>
      <Tooltip
        tooltipText="툴팁이 실행되었습니다."
        // isDisable state값이 true라면 툴팁이 실행되지 않습니다.
        open={open}
        useShowAnimation
        onCloseAfterEvent={closeDisable}
        {..._props}
      >
        <p> {props.tooltipText} </p>
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

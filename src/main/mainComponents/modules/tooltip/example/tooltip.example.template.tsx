import styled from "@emotion/styled";
import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";

import { Tooltip } from "mcm-js";
import { TooltipPropsType } from "mcm-js/dist/commons/types";
import { tooltipExampleInitProps } from "./tooltip.example.render.data";

export default function MyTooltipExample(props: ExampleContentsTypes) {
  let _tooltipText = props.commonsProps?.tooltipText;
  let _children = props.commonsProps?.children;

  const _addProps = props.addProps as TooltipPropsType;
  const { tooltipText, children, ..._props } = _addProps;

  if (tooltipText) _tooltipText = tooltipText;
  if (children) _children = children;

  return (
    <_Tooltip tooltipText={_tooltipText} {..._props}>
      {_children}
    </_Tooltip>
  );
}

const _Tooltip = styled(Tooltip)`
  width: fit-content;
`;

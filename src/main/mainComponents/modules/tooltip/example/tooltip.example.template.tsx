import styled from "@emotion/styled";

import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { TooltipPropsType } from "mcm-js/dist/commons/types";

// import { getLibraries } from "src/main/commonsComponents/functional/modules";
// const { Tooltip } = getLibraries();

import { Tooltip } from "mcm-js";

export default function MyTooltipExample(props: ExampleContentsTypes) {
  let _tooltipText = props.commonsProps?.tooltipText;
  let _children = props.commonsProps?.children;

  const { replaceChildren, isError } = props;
  const _addProps = props.addProps as TooltipPropsType;
  const { tooltipText, children, ..._props } = _addProps;

  if (tooltipText) _tooltipText = tooltipText;
  if (children) _children = children;

  if (isError) {
    _tooltipText = undefined;
    _children = undefined;
  }

  const renderComponents = () => {
    // 대체 컴포넌트가 있다면 대체 컴포넌트로 렌더
    if (replaceChildren) {
      const Components = replaceChildren;
      return Components;
    }

    return (
      <_Tooltip tooltipText={_tooltipText} {..._props}>
        {_children}
      </_Tooltip>
    );
  };

  return renderComponents();
}

const _Tooltip = styled(Tooltip)`
  width: fit-content;

  span {
    font-size: 18px;
  }
`;

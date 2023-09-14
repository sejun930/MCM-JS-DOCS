import styled from "@emotion/styled";
// import "mcm-js-dev/styles.css";

import { AlertPropsType } from "mcm-js-dev/dist/commons/types";
import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
import { _Button } from "mcm-js-commons";
const { Alert } = getLibraries();

export default function MyAlertExample(props: ExampleContentsTypes) {
  const _props = { ...props.commonsProps, ...props.addProps } as AlertPropsType;

  return (
    <Button onClickEvent={() => Alert.openAlert({ ..._props })}>
      {props.children || "Open Alert"}
    </Button>
  );
}

export const Button = styled(_Button)`
  border: double 2px black;
  display: inline-block;
  padding: 12px;
  font-size: 14px;
  word-spacing: 0.05rem;
`;

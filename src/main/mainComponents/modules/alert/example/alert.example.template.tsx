import styled from "@emotion/styled";
// import "mcm-js-dev/styles.css";

import { AlertPropsType } from "mcm-js-dev/dist/commons/types";
import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
import { _Button } from "mcm-js-commons";
const { Alert } = getLibraries();

export default function MyAlertExample(
  props: ExampleContentsTypes & {
    btnText?: string;
    func?: "openAlert" | "closeAlert" | "clearAlert";
  }
) {
  const { func, btnText } = props;
  const _props = {
    ...props,
    ...props.commonsProps,
    ...props.addProps,
  } as AlertPropsType;

  // 버튼에 출력될 텍스트
  const _btnText = btnText || props.children;

  const renderAlertComponents = () => {
    if (!func || func === "openAlert") {
      return (
        <Button onClickEvent={() => Alert.openAlert({ ..._props })}>
          {_btnText || "Open Alert"}
        </Button>
      );
    } else if (func === "closeAlert") {
      return (
        <Button onClickEvent={() => Alert.closeAlert({ ..._props })}>
          {_btnText || "Close Alert"}
        </Button>
      );
    } else if (func === "clearAlert") {
      return (
        <Button onClickEvent={() => Alert.clearAlert()}>
          {_btnText || "Clear Alert"}
        </Button>
      );
    }
  };

  return renderAlertComponents();
}

export const Button = styled(_Button)`
  border: double 2px black;
  display: inline-block;
  padding: 12px;
  font-size: 14px;
  word-spacing: 0.05rem;
`;

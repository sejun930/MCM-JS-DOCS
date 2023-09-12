import { ExampleCodeListTypes } from "src/main/commonsComponents/units/template/form/howUse/index.types";
import { getCommonsHighlight } from "src/commons/highlight";

import { alertCommonsExampleCode } from "./alert.example.commons.code";

export const alertCodeList: ExampleCodeListTypes = {
  default: () => alertCommonsExampleCode.children,
  basic: () => `2`,
};

export const alertReturnCommonsData = ({
  code,
  children,
  changeContent,
}: {
  code: string;
  children?: React.ReactNode | string;
  changeContent?: string;
}) => {
  return getCommonsHighlight.tag.button({
    children: ` ${children}`,
    clickEvent: {
      hasStartSpace: true,
      eventName: `
        <span class="blue3">Alert</span>.openAlert`,
      useArrow: true,
      props: getCommonsHighlight.curly({
        className: "deepPurple",
        children: `
          ${code}
        `,
      }),
    },
  });
};

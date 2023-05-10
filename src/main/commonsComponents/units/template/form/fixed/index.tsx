import { ReactNode } from "react";
import { ModulesInfoWrapper } from "src/main/mainComponents/modules/index.styles";

export default function _FixedForm({ children }: { children: ReactNode }) {
  return <ModulesInfoWrapper>{children}</ModulesInfoWrapper>;
}

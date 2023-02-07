import { ReactNode } from "react";
import { LayoutWrapper, LayoutContentsWrapper } from "./styles";

import LayoutHeadPage from "./header";
import LayoutNavPage from "./nav";

interface IProps {
  children: ReactNode;
}

export default function LayoutPage(props: IProps) {
  return (
    <LayoutWrapper>
      <LayoutHeadPage />
      <LayoutContentsWrapper>
        <LayoutNavPage />
        {props.children}
      </LayoutContentsWrapper>
    </LayoutWrapper>
  );
}

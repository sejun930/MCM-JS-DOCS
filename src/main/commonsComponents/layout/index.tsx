import { ReactNode } from "react";
import { LayoutWrapper, LayoutContentsWrapper } from "./styles";

import LayoutHeadPage from "./header";
import LayoutNavPage from "./nav";
import _HalfDrag from "src/main/mainComponents/modules/half-drag/half-drag.container";

interface IProps {
  children: ReactNode;
}

export default function LayoutPage(props: IProps) {
  return (
    <LayoutWrapper>
      <LayoutHeadPage />
      <LayoutContentsWrapper>
        <_HalfDrag
          LeftComponent={<LayoutNavPage />}
          RightComponent={<>{props.children}</>}
          //   leftComponentWidth={"20%"}
        />
      </LayoutContentsWrapper>
    </LayoutWrapper>
  );
}

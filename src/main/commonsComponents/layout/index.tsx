import { ReactNode, useEffect } from "react";
import { LayoutWrapper, LayoutContentsWrapper } from "./styles";

import CommonsHooksComponents from "../hooks";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import LayoutHeadPage from "./header";
import LayoutNavPage from "./nav";
import _HalfDrag from "src/main/mainComponents/modules/half-drag/half-drag.container";

interface IProps {
  children: ReactNode;
}

export default function LayoutPage(props: IProps) {
  const { getRouter, getModuleNamewithJadenCase } = CommonsHooksComponents();
  const [, setModule] = useRecoilState(moduleState);

  useEffect(() => {
    // 현재 선택한 모듈 저장하기
    const moduleName = getModuleNamewithJadenCase();
    console.log(moduleName);
    setModule(moduleName);
  }, [getRouter()]);

  return (
    <LayoutWrapper>
      <LayoutHeadPage />
      <LayoutContentsWrapper>
        <LayoutNavPage />
        <>{props.children}</>
        {/* <_HalfDrag
          LeftComponent={<LayoutNavPage />}
          RightComponent={<>{props.children}</>}
          leftComponentWidth={"20%"}
        /> */}
      </LayoutContentsWrapper>
    </LayoutWrapper>
  );
}

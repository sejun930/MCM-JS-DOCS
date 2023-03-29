import { ReactNode, useEffect } from "react";
import { LayoutWrapper, LayoutContentsWrapper } from "./styles";

import CommonsHooksComponents from "../hooks/commonsHooks";
// import CommonsHooksComponents from "mcm-js-commons/dist/hooks";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import LayoutHeadPage from "./header";
import LayoutNavPage from "./nav";

interface IProps {
  children: ReactNode;
}

export default function LayoutPage(props: IProps) {
  const { getRouter, getModuleNamewithJadenCase } = CommonsHooksComponents();
  const [, setModule] = useRecoilState(moduleState);

  useEffect(() => {
    // 현재 선택한 모듈 저장하기
    setModule(getModuleNamewithJadenCase());
  }, [getRouter()]);

  return (
    <LayoutWrapper className="layout-home-wrapper">
      <LayoutHeadPage />
      <LayoutContentsWrapper>
        <LayoutNavPage />
        {props.children}
      </LayoutContentsWrapper>
    </LayoutWrapper>
  );
}

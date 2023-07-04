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
  const [module, setModule] = useRecoilState(moduleState);

  const router = getRouter();
  // 현재가 관리자 페이지인지?
  const isAdmin = router.pathname.split("/")[1] === "admin";

  useEffect(() => {
    // 현재 선택한 모듈 저장하기
    if (!isAdmin) setModule(getModuleNamewithJadenCase());
  }, [router]);

  return (
    <LayoutWrapper className="layout-home-wrapper">
      <LayoutHeadPage />
      <LayoutContentsWrapper>
        {!isAdmin && <LayoutNavPage module={module} isAdmin={isAdmin} />}
        {props.children}
      </LayoutContentsWrapper>
    </LayoutWrapper>
  );
}

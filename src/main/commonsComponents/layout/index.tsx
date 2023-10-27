import { ReactNode, useEffect } from "react";
import { LayoutWrapper, LayoutContentsWrapper } from "./styles";

import CommonsHooksComponents from "../hooks/commonsHooks";
// import CommonsHooksComponents from "mcm-js-commons/dist/hooks";
import { useRecoilState } from "recoil";
import {
  moduleState,
  adminLoginState,
  isOpenSettingState,
  settingInfoState,
} from "src/commons/store";

import LayoutHeadPage from "./header";
import LayoutNavPage from "./nav";
import SettingPage from "../units/setting/setting.render";

interface IProps {
  children: ReactNode;
}

export default function LayoutPage(props: IProps) {
  const { getRouter, getModuleNamewithJadenCase, getIsAdminPage } =
    CommonsHooksComponents();
  // 현재 접속중인 모듈
  const [module, setModule] = useRecoilState(moduleState);
  // 관리자 로그인 여부
  const [adminLogin] = useRecoilState(adminLoginState);
  // 셋팅창 오픈 여부
  const [isOpenSetting, setIsOpenSetting] = useRecoilState(isOpenSettingState);
  // 셋팅 정보 종합
  const [settingInfo, setSettingInfo] = useRecoilState(settingInfoState);
  const router = getRouter();

  useEffect(() => {
    // 현재 선택한 모듈 저장하기
    setModule(getModuleNamewithJadenCase());
  }, [router]);

  //  저장되어 있는 셋팅 정보 가져오기
  useEffect(() => {
    let _info: string | { [key: string]: boolean } | null =
      localStorage.getItem("setting-info") || { ...settingInfo };

    // 이전에 저장되어 있던 설정이 있는 경우
    if (_info !== null) {
      // 문자열 타입은 객체 타입으로 전환
      if (typeof _info === "string") _info = JSON.parse(_info);
      // 변경된 객체는 recoil에 저장
      if (_info !== null && typeof _info === "object") setSettingInfo(_info);
    }
  }, [isOpenSetting]);

  // 현재가 관리자 페이지인지?
  const isAdmin = getIsAdminPage();

  // 설정창 토글 함수
  const toggleIsOpenSetting = (bool: boolean) => () => {
    setIsOpenSetting(bool);
  };

  let navRenderCondition = !isAdmin;
  if (isAdmin && adminLogin) navRenderCondition = true;

  return (
    <>
      <LayoutWrapper className="layout-home-wrapper">
        <LayoutHeadPage isAdmin={isAdmin} />
        <LayoutContentsWrapper isAdmin={isAdmin}>
          {navRenderCondition && (
            <LayoutNavPage
              module={module}
              isAdmin={isAdmin}
              openIsOpenSettings={toggleIsOpenSetting(true)}
            />
          )}
          {props.children}
        </LayoutContentsWrapper>
      </LayoutWrapper>
      {isOpenSetting && (
        <SettingPage
          isOpenSetting={isOpenSetting}
          closeIsOpenSettings={toggleIsOpenSetting(false)}
        />
      )}
    </>
  );
}

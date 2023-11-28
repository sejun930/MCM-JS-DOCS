import { ReactNode, useEffect } from "react";
import { LayoutContentsWrapper } from "./styles";
import { LayoutWithDarkModeWrapper } from "src/commons/styles/darkMode.styles";

import CommonsHooksComponents from "../hooks/commonsHooks";
// import CommonsHooksComponents from "mcm-js-commons/dist/hooks";
import { useRecoilState } from "recoil";
import {
  moduleState,
  adminLoginInfoState,
  isOpenSettingState,
  settingInfoState,
  favoriteState,
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
  const [adminLoginInfo] = useRecoilState(adminLoginInfoState);
  // 셋팅창 오픈 여부
  const [isOpenSetting, setIsOpenSetting] = useRecoilState(isOpenSettingState);
  // 셋팅 정보 종합
  const [settingInfo, setSettingInfo] = useRecoilState(settingInfoState);
  // 즐겨찾기 정보
  const [favorite, setFavorite] = useRecoilState(favoriteState);

  const router = getRouter();

  useEffect(() => {
    // 현재 선택한 모듈 저장하기
    setModule(getModuleNamewithJadenCase());
  }, [router]);

  //  저장되어 있는 셋팅 정보 가져오기
  useEffect(() => {
    let _info: string | { [key: string]: boolean } | null =
      localStorage.getItem("mcm-setting") || { ...settingInfo };

    // 이전에 저장되어 있던 설정이 있는 경우
    if (_info !== null) {
      // 문자열 타입을 객체 타입으로 전환
      if (typeof _info === "string") _info = JSON.parse(_info);
      // 변경된 객체를 recoil에 저장
      if (_info !== null) {
        if (typeof _info === "object") {
          setSettingInfo(_info);

          // const body = document.body;
          // if (_info.darkMode)
          //   // 다크모드가 설정되어 있는 경우
          //   body.style.backgroundColor = "#222222";
          // else body.style.backgroundColor = "unset";
        }
      }
    }
  }, [isOpenSetting]);

  useEffect(() => {
    // 즐겨찾기 정보 최초 가져오기
    let _favorite = localStorage.getItem("mcm-favorite") || [];

    // 저장된 즐겨찾기가 있는 경우
    if (_favorite !== null) {
      // 문자열 타입을 배열 타입으로 전환
      if (typeof _favorite === "string") _favorite = JSON.parse(_favorite);
      // 변경된 배열을 recoil에 저장
      if (_favorite !== null && typeof _favorite === "object")
        changeFavoriteList(_favorite);
    }
  }, []);

  // 현재가 관리자 페이지인지?
  const isAdmin = getIsAdminPage();

  // 설정창 토글 함수
  const toggleIsOpenSetting = (bool: boolean) => () => {
    setIsOpenSetting(bool);
  };

  // 즐겨찾기 리스트 변경하기
  const changeFavoriteList = (list: string[]) => {
    setFavorite(list);
  };

  let navRenderCondition = !isAdmin;
  if (isAdmin && adminLoginInfo.login) navRenderCondition = true;

  return (
    <>
      <LayoutWithDarkModeWrapper
        className={(settingInfo.darkMode && !isAdmin && "darkMode") || ""}
        id="layout-home-wrapper"
      >
        <LayoutHeadPage isAdmin={isAdmin} />
        <LayoutContentsWrapper isAdmin={isAdmin} id="layout-contents-wrapper">
          {navRenderCondition && (
            <LayoutNavPage
              module={module}
              isAdmin={isAdmin}
              openIsOpenSettings={toggleIsOpenSetting(true)}
              _favorite={favorite}
              onFavoriteChangeEvent={changeFavoriteList}
            />
          )}
          {props.children}
        </LayoutContentsWrapper>
      </LayoutWithDarkModeWrapper>
      {isOpenSetting && (
        <SettingPage
          isOpenSetting={isOpenSetting}
          closeIsOpenSettings={toggleIsOpenSetting(false)}
        />
      )}
    </>
  );
}

import {
  MobileTapWrapper,
  MobileNavigationTap,
  GoHome,
} from "./main.mobileNavigation.styles";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  moduleState,
  adminLoginInfoState,
  isOpenSettingState,
  favoriteState,
} from "src/commons/store";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
import LayoutNavPage from "src/main/commonsComponents/layout/nav";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Modal } = getLibraries();

export default function MainMobileNavigationTapPage() {
  const [openNav, setOpenNav] = useState(false);
  const [module] = useRecoilState(moduleState);
  const [adminLoginInfo] = useRecoilState(adminLoginInfoState);
  const [, setIsOpenSetting] = useRecoilState(isOpenSettingState);
  const [favorite, setFavorite] = useRecoilState(favoriteState);

  const { getRouter, getIsAdminPage } = CommonsHooksComponents();
  const router = getRouter();
  const isAdmin = getIsAdminPage();

  // 홈으로 이동하기
  const moveHome = () => {
    if (router.pathname !== "/") {
      Modal.close({ className: "mcm-modal-window-type" });
      router.push("/");
    }
  };

  // 모바일 nav 토글
  const toggleNav = (bool: boolean) => {
    if (isAdmin && !adminLoginInfo.login) return;

    setOpenNav(bool);

    // 모바일 환경에서 설정창 열기 = 모듈 모달창 닫기
    const openMobileSettings = () => {
      Modal.close({ id: "mobile-nav-modal" });
      setIsOpenSetting(true);
      setOpenNav(false);
    };

    // 즐겨찾기 리스트 변경하기
    const changeFavoriteList = (list: string[]) => {
      setFavorite(list);
    };

    if (bool) {
      // 모달 오픈
      Modal.open({
        children: (
          <LayoutNavPage
            isMobileTap={true}
            module={module}
            isAdmin={isAdmin}
            openIsOpenSettings={openMobileSettings}
            _favorite={favorite}
            onFavoriteChangeEvent={changeFavoriteList}
          />
        ),
        id: "mobile-nav-modal",
        showBGAnimation: true,
        showModalOpenAnimation: true,
        onFixWindow: true,
        hideCloseButton: true,
        onCloseModal: () => setOpenNav(false),
        mobileModalStyles: {
          contents: {
            overflow: "hidden",
          },
        },
      });
    } else {
      Modal.close({ id: "mobile-nav-modal" });
    }
  };

  return (
    <>
      <MobileTapWrapper isAdmin={isAdmin}>
        <GoHome onClickEvent={moveHome}>🏠</GoHome>
        <MobileNavigationTap
          onClickEvent={() => toggleNav(!openNav)}
          className="mobile-nav-button"
          isOpen={openNav}
          hide={isAdmin && !adminLoginInfo.login}
        />
      </MobileTapWrapper>
    </>
  );
}

import {
  MobileTapWrapper,
  MobileNavigationTap,
  GoHome,
} from "./main.mobileNavigation.styles";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  moduleState,
  adminLoginState,
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
  const [adminLogin] = useRecoilState(adminLoginState);
  const [_, setIsOpenSetting] = useRecoilState(isOpenSettingState);
  const [favorite] = useRecoilState(favoriteState);

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
    if (isAdmin && !adminLogin) return;

    setOpenNav(bool);

    // 모바일 환경에서 설정창 열기 = 모듈 모달창 닫기
    const openMobileSettings = () => {
      Modal.close({ id: "mobile-nav-modal" });
      setIsOpenSetting(true);
      setOpenNav(false);
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
          hide={isAdmin && !adminLogin}
        />
      </MobileTapWrapper>
    </>
  );
}

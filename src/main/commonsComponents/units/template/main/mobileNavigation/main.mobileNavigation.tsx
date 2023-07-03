import {
  MobileTapWrapper,
  MobileNavigationTap,
  GoHome,
} from "./main.mobileNavigation.styles";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";
import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

import { Modal } from "mcm-js";

import LayoutNavPage from "src/main/commonsComponents/layout/nav";

// let open = false;
export default function MainMobileNavigationTapPage() {
  const [openNav, setOpenNav] = useState(false);
  const [module] = useRecoilState(moduleState);
  const { getRouter } = CommonsHooksComponents();

  // 홈으로 이동하기
  const moveHome = () => {
    const router = getRouter();
    if (router.pathname !== "/") router.push("/");
  };

  useEffect(() => {
    Modal.close({ id: "mobile-nav-modal" });
  }, [getRouter()]);

  // 모바일 nav 토글
  const toggleNav = (bool: boolean) => {
    setOpenNav(bool);

    if (bool) {
      // 모달 오픈
      Modal.open({
        children: <LayoutNavPage isMobileTap={true} module={module} />,
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
    // setOpenNav(bool ? bool : (prev) => !prev);
  };

  // 주소가 변경되면 자동으로 탭 닫기
  useEffect(() => {
    setOpenNav(false);
  }, [getRouter().asPath]);

  return (
    <>
      <MobileTapWrapper>
        <GoHome onClickEvent={moveHome}>🏠</GoHome>
        <MobileNavigationTap
          onClickEvent={() => toggleNav(!openNav)}
          className="mobile-nav-button"
          isOpen={openNav}
        ></MobileNavigationTap>
      </MobileTapWrapper>
    </>
  );
}

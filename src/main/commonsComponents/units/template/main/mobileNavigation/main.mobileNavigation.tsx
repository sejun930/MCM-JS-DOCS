import {
  MobileTapWrapper,
  MobileNavigationTap,
  GoHome,
} from "./main.mobileNavigation.styles";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState, adminLoginState } from "src/commons/store";

import { Modal } from "mcm-js";
import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
import LayoutNavPage from "src/main/commonsComponents/layout/nav";

// let open = false;
export default function MainMobileNavigationTapPage() {
  const [openNav, setOpenNav] = useState(false);
  const [module] = useRecoilState(moduleState);
  const [adminLogin] = useRecoilState(adminLoginState);

  const { getRouter } = CommonsHooksComponents();
  const router = getRouter();
  const isAdmin = router.pathname.split("/")[1] === "admin";

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
  };

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

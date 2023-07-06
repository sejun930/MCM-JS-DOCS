import { ComponentType, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminLoginState } from "src/commons/store";
import Template from "../units/template/main";

import { Modal } from "mcm-js";
import AdminLoginPage from "src/main/mainComponents/admin/login";
import CommonsHooksComponents from "../hooks/commonsHooks";

import { checkAccessToken } from "./check";

// 관리자 로그인 권한 체크하기
const WithAuthAdmin =
  <P extends {}>(Component: ComponentType<P>) =>
  (props: P) => {
    let loading = false;
    // 로그인 상태에서만 페이지 렌더 가능
    const [render, setRender] = useState(false);
    const [, setAdminLogin] = useRecoilState(adminLoginState);

    const { getRouter } = CommonsHooksComponents();

    const loginComplete = () => {
      setRender(true);
      setAdminLogin(true);
    };

    useEffect(() => {
      if (loading) {
        checkAccessToken().then((result: boolean) => {
          if (result) {
            // 로그인이 완료되었다면 페이지 렌더
            loginComplete();
          } else {
            // 로그인이 안되어 있는 경우
            Modal.open({
              children: <AdminLoginPage loginComplete={loginComplete} />,
              modalSize: { width: "360px", height: "340px" },
              mobileModalSize: { height: "320px" },
              modalStyles: {
                items: {
                  border: "double 6px #aa5656",
                },
              },
              offAutoClose: true,
              onFixWindow: true,
              className: "admin-login-modal",
              onCloseModal: () => getRouter().replace("/"),
              closeMent: "홈으로 이동",
            });
          }
        });
      } else loading = true;
    }, [getRouter().pathname]);

    return (
      <Template isFull>
        {(render && <Component {...props} />) || <></>}
      </Template>
    );
  };

export default WithAuthAdmin;

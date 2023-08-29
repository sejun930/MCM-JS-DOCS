import { ComponentType, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminLoginState } from "src/commons/store";
import Template from "../units/template/main";

import AdminLoginPage from "src/main/mainComponents/admin/login/admin.login.container";
import CommonsHooksComponents from "../hooks/commonsHooks";

import { checkAccessToken } from "./check";
import { getLibraries } from "../functional";

const { Modal } = getLibraries();
// 관리자 로그인 권한 체크하기
const WithAuthAdmin =
  <P extends {}>(Component: ComponentType<P>) =>
  (props: P) => {
    const [openModal, setOpenModal] = useState(false);
    const [adminLogin, setAdminLogin] = useRecoilState(adminLoginState);

    const { getRouter } = CommonsHooksComponents();

    useEffect(() => {
      checkAccessToken().then((result: boolean) => {
        setAdminLogin(result);
        setOpenModal(true);
      });
    }, [getRouter().pathname]);

    return (
      <Template>
        {openModal && !adminLogin && (
          <Modal
            show={!adminLogin}
            onCloseModal={() => {
              location.replace("/");
            }}
            modalSize={{ width: "360px", height: "340px" }}
            mobileModalSize={{ height: "320px" }}
            modalStyles={{
              wrapper: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
              },
              items: {
                border: "double 6px #aa5656",
              },
            }}
            offAutoClose
            onFixWindow
            className="admin-login-modal"
            closeMent="홈으로 이동"
          >
            <AdminLoginPage loginComplete={() => setAdminLogin(true)} />
          </Modal>
        )}
        {(adminLogin && <Component {...props} />) || <></>}
      </Template>
    );
  };

export default WithAuthAdmin;

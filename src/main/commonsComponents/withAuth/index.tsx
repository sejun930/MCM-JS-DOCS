import { ComponentType, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminLoginInfoState } from "src/commons/store";
import Template from "../units/template/main";

import AdminLoginPage from "src/main/mainComponents/admin/login/admin.login.container";
import CommonsHooksComponents from "../hooks/commonsHooks";

import adminApis from "src/commons/libraries/apis/admin/admin.apis";
import { getLibraries } from "src/main/commonsComponents/functional/modules";
import {
  initAdminLoginInfo,
  AdminLoginTypes,
} from "src/commons/store/store.types";
import { deepCopy } from "../functional";
const { Modal } = getLibraries();

// 관리자 로그인 권한 체크하기
let render = false;
const WithAuthAdmin =
  <P extends {}>(Component: ComponentType<P>) =>
  (props: P) => {
    const [openModal, setOpenModal] = useState(false);
    // 관리자 로그인 여부
    const [adminLoginInfo, setAdminLoginInfo] =
      useRecoilState(adminLoginInfoState);

    const { getRouter } = CommonsHooksComponents();

    useEffect(() => {
      if (!render) {
        adminApis()
          .check(false)
          .then((result) => {
            setAdminLoginInfo(result);
            setOpenModal(true);
          });
        // checkAccessToken().then((result: boolean) => {
        // setAdminLoginInfo(result);
        // setOpenModal(true);
        // });
        render = true;
      }
    }, [getRouter().pathname]);

    // 로그인 완료 시 state 변경하기
    const completeAdminLogin = (isTest: boolean) => {
      const loginResult: AdminLoginTypes = deepCopy(initAdminLoginInfo);
      loginResult.login = true;
      loginResult.isTest = isTest;

      setAdminLoginInfo(loginResult);
    };

    return (
      <Template className="admin-withAuth-template">
        {openModal && !adminLoginInfo.login && (
          <Modal
            show={!adminLoginInfo.login}
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
            <AdminLoginPage loginComplete={completeAdminLogin} />
          </Modal>
        )}
        {(adminLoginInfo.login && <Component {...props} />) || <></>}
      </Template>
    );
  };

export default WithAuthAdmin;

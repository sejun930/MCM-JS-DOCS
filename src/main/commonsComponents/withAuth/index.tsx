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
    // 로그인 상태에서만 페이지 렌더 가능
    const [render, setRender] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [, setAdminLogin] = useRecoilState(adminLoginState);

    const { getRouter } = CommonsHooksComponents();

    const loginComplete = () => {
      setRender(true);
      setAdminLogin(true);
    };

    useEffect(() => {
      checkAccessToken().then((result: boolean) => {
        if (result) {
          // 로그인이 완료되었다면 페이지 렌더
          loginComplete();
        } else {
          setAdminLogin(false);
          setOpenModal(true);

          // 로그인이 안되어 있는 경우
          // Modal.open({
          //   children: <AdminLoginPage loginComplete={loginComplete} />,
          //   modalSize: { width: "360px", height: "340px" },
          //   mobileModalSize: { height: "320px" },
          //   modalStyles: {
          // wrapper: {
          //   backgroundColor: "rgba(0, 0, 0, 0.8)",
          // },
          // items: {
          //   border: "double 6px #aa5656",
          // },
          //   },
          //   offAutoClose: true,
          //   onFixWindow: true,
          //   className: "admin-login-modal",
          //   onCloseModal: () => getRouter().replace("/"),
          //   onAfterCloseEvent: () => {
          //     console.log(123);
          //   },
          //   closeMent: "홈으로 이동",
          // });
        }
      });
    }, [getRouter().pathname]);

    return (
      <Template isFull>
        <Modal
          show={openModal}
          onCloseModal={() => {
            getRouter().replace("/");
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
          <AdminLoginPage loginComplete={loginComplete} />
        </Modal>
        {(render && <Component {...props} />) || <></>}
      </Template>
    );
  };

export default WithAuthAdmin;

import { getLibraries } from "src/main/commonsComponents/functional/modules";
import { Setting } from "../../layout/nav/nav.styles";

import SettingInfoPage from "./setting.info";
import { useRecoilState } from "recoil";
import { settingInfoState } from "src/commons/store";
import { useEffect } from "react";

const { Modal } = getLibraries();

export default function SettingPage(props: {
  isOpenSetting: boolean;
  closeIsOpenSettings: () => void;
}) {
  const [settingInfo, setSettingInfo] = useRecoilState(settingInfoState);
  const { isOpenSetting, closeIsOpenSettings } = props;
  // 셋팅 정보 종합

  // 정보 변경하기
  const changeSettingsInfo = (key: string, value: boolean) => {
    const _info = { ...settingInfo, [key]: value };
    setSettingInfo({ ..._info });

    // localStorage 저장
    window.localStorage.setItem("setting-info", JSON.stringify(_info));
  };

  return (
    <Modal
      show={isOpenSetting || true}
      onCloseModal={closeIsOpenSettings}
      id="setting-modal"
      modalStyles={{
        items: {
          width: "300px",
          height: "360px",
          border: "double 5px darkgray",
        },
      }}
      mobileModalStyles={{
        items: {
          minWidth: "320px",
          width: "40%",
          minHeight: "400px",
          height: "50%",
        },
      }}
      closeMent="닫기"
    >
      <SettingInfoPage
        settingInfo={settingInfo}
        changeSettingsInfo={changeSettingsInfo}
      />
    </Modal>
  );
}

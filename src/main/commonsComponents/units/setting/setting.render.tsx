import { getLibraries } from "src/main/commonsComponents/functional/modules";

import SettingInfoPage from "./setting.info";
import { useRecoilState } from "recoil";
import { settingInfoState } from "src/commons/store";

import { toggleDarkMode } from "../../functional/settings";

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

    if (key === "darkMode") {
      // 다크모드 설정시 배경색 변환
      toggleDarkMode(value);
    }

    // localStorage 저장
    window.localStorage.setItem("mcm-setting", JSON.stringify(_info));
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
          minWidth: "300px",
          maxWidth: "360px",
          width: "80%",
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

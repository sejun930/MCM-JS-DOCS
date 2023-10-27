import { atom } from "recoil";
import { getUuid } from "src/main/commonsComponents/functional";

import { initSettingInfo } from "./store.types";

// 현재 페이지의 모듈 이름 저장
export const moduleState = atom({
  key: `moduleState_${getUuid()}`,
  default: "",
});

// 현재 페이지의 버전 인덱스 값
export const versState = atom({
  key: `versState_${getUuid()}`,
  default: 0,
});

// 현재 유저의 아이피 값 저장
export const ipState = atom({
  key: `ipState_${getUuid()}`,
  default: "",
});

// 어드민 로그인 정보
export const adminLoginState = atom({
  key: `adminLoginState_${getUuid()}`,
  default: false,
});

// 셋팅창 오픈 여부
export const isOpenSettingState = atom({
  key: `isOpenSetting_${getUuid()}`,
  default: false,
});

// 셋팅 정보 저장
export const settingInfoState = atom({
  key: `settingInfo_${getUuid()}`,
  default: initSettingInfo,
});

// 모듈 즐겨찾기 저장
export const favoriteState = atom({
  key: `favorite_${getUuid()}`,
  default: [] as string[],
});

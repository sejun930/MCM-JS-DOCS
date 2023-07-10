import { atom } from "recoil";
import { getUuid } from "src/main/commonsComponents/functional";

import { isBlockInit, IsBlockTypes } from "./store.types";

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

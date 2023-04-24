import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

// 현재 페이지의 모듈 이름 저장
export const moduleState = atom({
  key: `moduleState/${uuidv4()}`,
  default: "",
});

// 현재 페이지의 버전 인덱스 값
export const versState = atom({
  key: `versState/${uuidv4()}`,
  default: 0,
});

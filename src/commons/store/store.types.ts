export interface IsBlockTypes {
  ip: string;
  commentId: string; // 차단된 댓글 아이디 값
  createdAt: { seconds: number; nanoseconds: number } | null; // 차단날짜
  canceledAt: { seconds: number; nanoseconds: number } | null; // 취소 여부 및 날짜
  contents: string; // 차단된 댓글 내용
  category: string; // 차단된 카테고리 이름
  module: string; // 차단된 모듈 이름
}

export const isBlockInit: IsBlockTypes = {
  ip: "",
  commentId: "",
  createdAt: null,
  canceledAt: null,
  contents: "",
  category: "",
  module: "",
};

export type InitSettingInfoType = {
  [key: string]: boolean;
};

// setting info 초기 설정값
export const initSettingInfo: InitSettingInfoType = {
  openFix: false, // 모든 코드 열기
  darkMode: false, // 다크 모드
};

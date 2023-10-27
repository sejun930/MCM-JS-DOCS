export interface NavListTypes {
  name: string;
  href?: string; // 있다면 설정된 페이지로, 없다면 name 값의 lowerCase 결과인 페이지로
  remarks?: string; // 부가 이름
}

export const navList: Array<NavListTypes> = [
  { name: "Modal" },
  { name: "Tooltip" },
  { name: "Slider" },
  { name: "Alert" },
  { name: "Popular" },
];

// 관리자용 navigation
export const adminNavList: Array<NavListTypes> = [
  { name: "Comments", remarks: "댓글 관리" }, // 댓글
  { name: "Block", remarks: "아이피 관리" }, // 아이피 차단
];

export interface InitNavInfoDataTypes {
  search: string;
  render: boolean;
  favorite: string[];
}

// 리스트 관련 데이터
export const initNavInfoData: InitNavInfoDataTypes = {
  search: "",
  render: false,
  favorite: [],
};

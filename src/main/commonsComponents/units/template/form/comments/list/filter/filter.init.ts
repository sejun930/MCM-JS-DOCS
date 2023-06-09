export interface InitTypes {
  name: string;
  //   value: string | Array<string>;
  target: string;
}

// 필터 기본 리스트
export const filterInitList: Array<InitTypes> = [
  { name: "과거순 정렬", target: "oddest" },
];

// 카테고리별 추가 필터 리스트
export const categoryFilterList: { [key: string]: Array<InitTypes> } = {
  bug: [{ name: "해결 완료만 보기", target: "bug-complete" }],
};

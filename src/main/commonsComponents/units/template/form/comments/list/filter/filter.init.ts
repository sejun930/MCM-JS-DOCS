export interface InitTypes {
  name: string; // 필터 이름
  target: string; // 필터 객체 이름
  isCommons?: boolean; // 모든 카테고리에 공통으로 사용되는 필터 여부
}

// 필터 기본 리스트
export const filterInitList: Array<InitTypes> = [
  { name: "과거순 정렬", target: "oddest" },
];

// 카테고리별 추가 필터 리스트
export const categoryFilterList: { [key: string]: Array<InitTypes> } = {
  bug: [{ name: "해결 완료만 보기", target: "bug-complete" }],
  question: [{ name: "답변 완료만 보기", target: "question-complete" }],
  review: Array.from(new Array(5), (_, i) => 1 + i)
    .reverse()
    .map((el) => {
      return { name: `평점 ${el}점 보기`, target: `review-${el}` };
    }),
};

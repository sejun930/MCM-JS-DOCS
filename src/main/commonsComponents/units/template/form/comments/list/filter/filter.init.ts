export interface InitTypes {
  name: string; // 필터 이름
  target: string; // 필터 객체 이름
  isHide?: boolean; // 숫자 가리기
  searchFilterList?: boolean; // filter 객체에서 검색하기
  isShowAdmin?: boolean; // 관리자 페이지에만 보이기
}

// 필터 기본 리스트
export const filterInitList: Array<InitTypes> = [
  { name: "과거순 정렬", target: "oddest", searchFilterList: true },
  {
    name: "삭제된 댓글 포함",
    target: "deleted",
    searchFilterList: true,
    isShowAdmin: true,
  },
];

// 카테고리별 추가 필터 리스트
export const categoryFilterList: { [key: string]: Array<InitTypes> } = {
  bug: [
    [{ name: "해결 완료만 보기", target: "bug-complete" }],
    Array.from(new Array(5), (_, i) => 1 + i)
      .reverse()
      .map((el) => {
        return { name: `중요도 ${el}점 보기`, target: `bug-${el}` };
      }),
  ].flat(),
  question: [{ name: "답변 완료만 보기", target: "question-complete" }],
  review: Array.from(new Array(5), (_, i) => 1 + i)
    .reverse()
    .map((el) => {
      return { name: `평점 ${el}점 보기`, target: `review-${el}` };
    }),
};

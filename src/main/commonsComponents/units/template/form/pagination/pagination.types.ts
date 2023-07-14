export type IProps = {
  allData: number; // 전체 데이터 수
  currentPage: number; // 현재 페이지 위치
  limit: number; // 페이지 별로 보여질 데이터 수
  changePageEvent: (page: number) => void; // 페이지 클릭시 페이지 변경 이벤트
  limitPage?: number; // 한 블럭당 보여질 페이지 수
} & { [key: string]: number | string | boolean | Function };

export interface PageInfoInitType {
  allPage: number; // 전체 페이지 개수
  pageLimit: number; // 한 블럭당 보여질 페이지 개수 (1 block = 10 page)
  next: boolean; // 다음 페이지로 이동 가능 여부
  prev: boolean; // 이전 페이지로 이동 가능 여부
  //   first: boolean; // 끝 페이지로 이동 가능 여부
  //   last: boolean; // 처음 페이지로 이동 가능 여부
  startPage: number; // 페이지네이션의 시작 페이지
}

// 페이지네이션에 사용될 정보 저장
export const pageInfoInit: PageInfoInitType = {
  allPage: 0,
  pageLimit: 10,
  next: false,
  prev: false,
  //   first: false,
  //   last: false,
  startPage: 1,
};

// 댓글 공통 기본값
export interface CommentsInfoTypes {
  id?: string;
  category: string;
  password: string;
  contents: string;
  rating: number;
  bugStatus: number; // 버그 처리 여부 (0 : 대기중, 1 : 처리중, 2 : 처리 완료)
  complateAnswer: boolean; // 문의 답변 완료 (false : 대기중, true : 답변 완료)
}

// 날짜 관련 type
interface DateTypes {
  seconds: number;
  nanoseconds: number;
}

// 렌더용 type
export type InfoTypes = CommentsInfoTypes & {
  id: string;
  createdAt: DateTypes | null;
  modifyAt: DateTypes | null;
  deletedAt: DateTypes | null;
};

// 카테고리 개수 타입
export interface CountListTypes {
  category: string;
  count: number;
}

// 필터 타입 (newest : 최신순, oldest : 과거순)
type SortType = "newest" | "oldest";

export interface CommentsAllInfoTypes {
  commentsList: Array<InfoTypes>;
  selectCategory: string;
  countList: { [key: string]: number };
  filter: {
    search: string;
    page: number;
    sort: SortType;
  };
}

export type CommentsPartialPropsType = Partial<CommentsAllInfoTypes>;

// 댓글 정보들 초기값
export const initCommentsInfo: CommentsAllInfoTypes = {
  commentsList: [], // 댓글 리스트
  selectCategory: "all", // 선택된 카테고리
  countList: {}, // 카테고리 개수 리스트
  filter: { search: "", page: 1, sort: "newest" }, // 필터 정보
};

// 카테고리 원본 타입
export type CategoryTypes = "all" | "bug" | "question" | "review" | string;

// 댓글 공통 기본값
export interface CommentsInfoTypes {
  id?: string;
  category: CategoryTypes;
  password: string;
  contents: string;
  rating: number;
  bugStatus: number; // 버그 처리 여부 (0 : 대기중, 1 : 처리중, 2 : 처리 완료)
  answer: null | string; // 답변
  ip: string; // 작성자 아이피
  agreeProvacy: boolean; // 개인정보 수집 여부
  bugLevel: number;
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
  answerCreatedAt: DateTypes | null;
};

// count (카테고리 별 개수) 초기값
export const initCountList: Array<{ [key: string]: number | string }> = [
  {
    category: "bug",
    count: 0,
    deleted: 0,
    "bug-complete": 0,
    "bug-complete-deleted": 0,
    "bug-1": 0,
    "bug-1-deleted": 0,
    "bug-1-complete": 0,
    "bug-1-complete-deleted": 0,
    "bug-2": 0,
    "bug-2-deleted": 0,
    "bug-2-complete": 0,
    "bug-2-complete-deleted": 0,
    "bug-3": 0,
    "bug-3-deleted": 0,
    "bug-3-complete": 0,
    "bug-3-complete-deleted": 0,
    "bug-4": 0,
    "bug-4-deleted": 0,
    "bug-4-complete": 0,
    "bug-4-complete-deleted": 0,
    "bug-5": 0,
    "bug-5-deleted": 0,
    "bug-5-complete": 0,
    "bug-5-complete-deleted": 0,
  },
  {
    category: "question",
    count: 0,
    deleted: 0,
    "question-complete": 0,
    "question-complete-deleted": 0,
  },
  {
    category: "review",
    count: 0,
    deleted: 0,
    "review-1": 0,
    "review-1-deleted": 0,
    "review-2": 0,
    "review-2-deleted": 0,
    "review-3": 0,
    "review-3-deleted": 0,
    "review-4": 0,
    "review-4-deleted": 0,
    "review-5": 0,
    "review-5-deleted": 0,
  },
];

// 차단 유저 정보 저장
export interface BlockInfoTypes {
  canceledAt?: null;
  category?: string;
  commentId?: string;
  contents?: string;
  createdAt?: DateTypes;
  ip?: string;
  module?: string;
  isBlock: boolean;
}
export interface CountFilterCommonsType {
  count: number;
  category: string;
  id: string;
  deleted: number; // 삭제된 댓글 수
}

export type CountFilterTypes = {
  // 카테고리별 전체 개수 및 필터별 개수
  all: CountFilterCommonsType | { [key: string]: number };
  bug: CountFilterCommonsType | { [key: string]: number };
  question: CountFilterCommonsType | { [key: string]: number };
  review: CountFilterCommonsType | { [key: string]: number };
} & {
  [key: string]:
    | { [key: string]: number & string }
    | CountFilterCommonsType
    | (number & string);
};

export interface CommentsAllInfoTypes {
  commentsList: Array<InfoTypes>;
  selectCategory: CategoryTypes | string;
  selectModule: string;
  filter:
    | {
        // search: string; // 검색어
        page: number; // 페이지
        // sort: SortType; // 정렬 순서
        list: { [key: string]: boolean }; // 현재 적용된 필터 정보들
      } & {
        [key: string]:
          | string
          | number
          // | SortType
          | boolean
          | { [key: string]: boolean };
        allData: number; // 전체 데이터 수
        limit: number; // 렌더될 데이터 수
        startPage: number; // 페이지네이션용 시작용 페이지 (1 이상 페이지부터 작동)
        oddest: boolean; // 과거순 보기
      };
  blockInfo: BlockInfoTypes; // 차단된 유저라면 해당 사유 및 아이피 저장
  userIp: string; // 유저 아이피 저장
  countFilterList: CountFilterTypes;
}

export type CommentsPartialPropsType = Partial<CommentsAllInfoTypes>;

// 댓글 정보들 초기값
export const initCommentsInfo: CommentsAllInfoTypes = {
  commentsList: [], // 댓글 리스트
  selectCategory: "all", // 선택된 카테고리
  selectModule: "", // 선택된 모듈
  filter: {
    allData: 0,
    limit: 10,
    page: 1,
    startPage: 0,
    list: {},
    oddest: false,
  }, // 필터 정보
  blockInfo: { isBlock: false },
  userIp: "",
  countFilterList: {
    all: { count: 0, deleted: 0, category: "all", id: "" },
    bug: { count: 0, deleted: 0, category: "bug", id: "" },
    question: { count: 0, deleted: 0, category: "question", id: "" },
    review: { count: 0, deleted: 0, category: "review", id: "" },
  },
};

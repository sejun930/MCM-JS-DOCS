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

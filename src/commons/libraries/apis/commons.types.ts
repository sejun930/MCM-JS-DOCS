import { FieldValue, OrderByDirection, WhereFilterOp } from "../firebase";

export type OptionsTypes = Array<{
  orderBy?: Array<{
    pathName: string;
    direction: OrderByDirection;
  }>;
  where?: Array<{
    pathName: string;
    filter: WhereFilterOp;
    value: string | number | null;
  }>;
  limit?: { value: number }; // limit는 항상 마지막에 실행
}>;

// 유저 차단 Input props type
export interface BlockInputTypes {
  commentId: string; // 차단된 댓글 아이디 값
  ip: string; // 차단된 유저 아이피
  contents: string; // 차단된 댓글 내용
  category: string; // 차단된 카테고리 이름
  module: string; // 차단된 모듈 이름
}

// 유처 차단 추가 데이터
export interface AddBlockInputType {
  createdAt?: FieldValue;
  canceledAt?: null;
}

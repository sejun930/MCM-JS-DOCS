interface AdminBugStatusSelectListType {
  name: string;
  tooltipText?: string;
  status: number;
}

// 관리자용 이슈 처리 버튼 리스트
export const AdminBugStatusSelectList: Array<AdminBugStatusSelectListType> = [
  { name: "확인 대기중", status: 0 },
  {
    name: "이슈 처리중",
    tooltipText: '해당 이슈를 "처리중"으로 처리합니다.',
    status: 1,
  },
  {
    name: "이슈 해결 완료",
    tooltipText: '해당 이슈를 "해결 완료"로 처리합니다.',
    status: 2,
  },
];

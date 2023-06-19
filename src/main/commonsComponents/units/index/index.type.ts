// 목차 props 타입
export interface IndexIPropsTypes {
  indexList: Array<{ title: string; id: string; children?: JSX.Element }>;
  offFixed?: boolean; // 고정하지 않음
}

// index.container Props type
export interface IndexPagePropsTypes {
  closeIndex: () => void; // 목차창 닫기
  toggleFix: () => void; // 고정 toggle
  toggleMinimum: () => void; // 최소화 toggle
  fix: boolean;
  isMinimum: boolean;
}

// index.presenter Props type
export interface IndexUIPropsTypes {
  current: number; // 현재 목차 위치
  moveIndex: (id: string) => void; // 해당 목차 위치로 이동하기
}

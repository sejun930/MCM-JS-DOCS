// 목차 props 타입
export interface IndexIPropsTypes {
  indexList: Array<{ title: string; id: string; children?: JSX.Element }>;
  offFixed?: boolean; // 고정하지 않음
}

// index.container Props type
export interface IndexPagePropsTypes {
  toggleIndex: (bool: boolean) => void; // 목차창 토글
  toggleFix: () => void; // 고정 toggle
  toggleMinimum: () => void; // 최소화 toggle
  fix: boolean;
  isMinimum: boolean;
  show: boolean;
  isLoading: boolean;
  changeLoading: (bool: boolean) => void;
}

// index.presenter Props type
export interface IndexUIPropsTypes {
  current: number; // 현재 목차 위치
  moveIndex: (id: string) => void; // 해당 목차 위치로 이동하기
}

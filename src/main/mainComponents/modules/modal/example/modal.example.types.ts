// 예시 컴포넌트에 적용되는 타입
export interface IProps {
  type: string;
}

// 예시용 컴포넌트들에 적용되는 타입
export interface IPropsTypes {
  isShow: boolean;
  openModal: () => void;
  closeModal: () => void;
}

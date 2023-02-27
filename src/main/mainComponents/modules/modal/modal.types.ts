// 예시용 컴포넌트들에 적용되는 타입
export interface ModalExamplePropsTypes {
  isShow: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// 추가적으로 붙는 예시용 모달 타입
export interface ModalExampleAddTypes {
  onBGAnimation?: boolean;
  onModalOpenAnimation?: boolean;
}

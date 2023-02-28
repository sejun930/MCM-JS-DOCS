// 예시용 컴포넌트들에 적용되는 타입
export interface ModalExampleCommonsTypes {
  isShow: Array<boolean>;
  openModal: (idx: number) => () => void;
  closeModal: (idx: number) => () => void;
}

// 추가적으로 붙는 예시용 모달 타입
export interface ModalExampleInitTypes {
  onBGAnimation?: boolean;
  onModalOpenAnimation?: boolean;
}

import { Modal } from "mcm-js";

export default function ModalExamplePage() {
  // 모달이 종료될 때 실행되는 함수입니다. 해당 함수가 없어도 모달을 종료시킬 수 있습니다.
  const closeModal = () => {
    alert("모달이 종료됩니다.");
    Modal.close();
  };

  return (
    <button onClick={() => Modal.open({ onCloseModal: closeModal })}>
      모달 실행하기
    </button>
  );
}

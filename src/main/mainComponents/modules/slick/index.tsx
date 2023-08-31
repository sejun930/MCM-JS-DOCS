import { Modal } from "mcm-js-dev";
import { useState } from "react";

export default function ModalExamplePage() {
  // 모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다
  const [isOpen, setIsOpen] = useState(false);

  // 모달을 실행하는 함수입니다.
  const openModal = () => {
    setIsOpen(true);
  };

  // 모달을 종료하는 함수입니다.
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}> 모달 실행하기 </button>
      <Modal
        show={isOpen}
        onCloseModal={closeModal}
        onFixWindow={true}
        timer={0}
      >
        <span> 이 모달이 실행되는 동안에는 스크롤을 제어할 수 없습니다. </span>
      </Modal>
    </div>
  );
}

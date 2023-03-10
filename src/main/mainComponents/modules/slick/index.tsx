import { _Modal } from "mcm-js";
import { useState } from "react";

export default function ExamplePage() {
  // 모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다.
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
      <_Modal show={isOpen} onCloseModal={closeModal} />
    </div>
  );
}

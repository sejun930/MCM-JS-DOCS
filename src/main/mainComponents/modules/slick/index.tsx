import { Modal } from "mcm-js";
    
export default function ModalExamplePage() {
  // 모달을 실행시키는 함수입니다. 
  const openModal = () => {
    Modal.open({ onCloseModal : closeModal })
  };

  // 모달을 종료시킬 수 있는 함수입니다. 해당 함수가 없어도 모달을 종료시킬 수 있습니다. 
  const closeModal = () => {
    alert("모달이 종료됩니다.")
    Modal.close()
  };
    
  return (
    <div>
      <button onClick={openModal}> 모달 실행하기 </button>
      <Modal 12312>
        <span> 기본 모달 페이지입니다. </span>
      </Modal>
    </div>
  );
}
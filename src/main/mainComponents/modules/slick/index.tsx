import { Modal } from "mcm-js";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        Modal.open({
          children: (
            <div>
              <span> 상위 모달 </span>
              <Modal
                show={true}
                onCloseModal={() => Modal.close({ id: "parents-modal" })}
                modalSize={{ width: "400px", height: "400px" }}
                showBGAnimation={true}
                showModalOpenAnimation={true}
              >
                하위 모달을 종료하면 상위 모달도 함께 종료됩니다.
              </Modal>
            </div>
          ),
          id: "parents-modal",
          showBGAnimation: true,
          showModalOpenAnimation: true,
        })
      }
    >
      모달 실행하기
    </button>
  );
}

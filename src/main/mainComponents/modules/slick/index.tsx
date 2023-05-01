import { Modal } from "mcm-js";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        Modal.open({
          children: (
            <div>
              <span> 하위 모달을 종료하면 상위 모달도 함께 종료됩니다. </span>
              <Modal
                show={true}
                onCloseModal={() => Modal.close({ id: "parents-modal" })}
                modalSize={{ width: "100px", height: "100px" }}
              >
                하위 모달
              </Modal>
            </div>
          ),
          id: "parents-modal",
        })
      }
    >
      모달 실행하기
    </button>
  );
}

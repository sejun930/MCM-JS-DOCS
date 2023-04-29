import { Modal } from "mcm-js";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        Modal.open({
          offAutoClose: true,
        })
      }
    >
      모달 실행하기
    </button>
  );
}

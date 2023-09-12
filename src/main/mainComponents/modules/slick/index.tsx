import { Modal } from "mcm-js-dev";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        Modal.open({
          children: <span> 함수로 실행된 모달입니다. </span>,
          showBGAnimation: true,
          showModalOpenAnimation: true,
        })
      }
    >
      모달 실행하기
    </button>
  );
}

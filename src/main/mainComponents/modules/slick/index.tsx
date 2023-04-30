import { Modal } from "mcm-js";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        Modal.open({
          children: <span> 기본 모달 페이지입니다. </span>,
        })
      }
    >
      모달 실행하기
    </button>
  );
}

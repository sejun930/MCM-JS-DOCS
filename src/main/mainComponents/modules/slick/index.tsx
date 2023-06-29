import { Modal } from "mcm-js";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        Modal.open({
          children: (
            <span> 닫기 버튼을 클릭해야만 모달창을 닫을 수 있습니다. </span>
          ),
          offAutoClose: true,
        })
      }
    >
      모달 실행하기
    </button>
  );
}

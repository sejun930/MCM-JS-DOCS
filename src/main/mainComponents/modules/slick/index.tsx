import { Modal } from "mcm-js-dev";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        Modal.open({
          children: (
            <button
              onClick={() => {
                alert("모달을 종료합니다.");
                Modal.close({ id: "modal" });
              }}
            >
              모달 종료하기
            </button>
          ),
          id: "modal",
          showBGAnimation: true,
          showModalOpenAnimation: true,
        })
      }
    >
      모달 실행하기
    </button>
  );
}

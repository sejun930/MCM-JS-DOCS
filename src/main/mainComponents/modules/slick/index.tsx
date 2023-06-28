import { Modal } from "mcm-js";

export default function ModalExamplePage() {
  return (
    <button
      onClick={() =>
        Modal.open({
          children: (
            <span>
              {" "}
              wrapper, items, closeButton, contents 태그의 스타일을 각각 지정할
              수 있습니다.{" "}
            </span>
          ),
          modalStyles: {
            wrapper: {
              backgroundColor: "rgba(30, 0, 50, 0.7)",
            },
            items: {
              backgroundColor: "black",
              border: "double 6px white",
              borderRadius: "0px",
              width: "250px",
              height: "250px",
            },
            closeButton: {
              backgroundColor: "black",
              borderRadius: "100%",
              border: "solid 1px white",
              marginTop: "-10px",
            },
            contents: {
              backgroundColor: "white",
              width: "90%",
            },
          },
        })
      }
    >
      모달 실행하기
    </button>
  );
}

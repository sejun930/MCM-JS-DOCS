import { _Modal } from "MCM-js";

import { ExampleContentsTypes } from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { ModalExamplePropsTypes, ModalExampleAddTypes } from "../modal.types";
import _Button from "src/main/commonsComponents/units/button";

export default function ModalExampleRenderPage(props: ExampleContentsTypes) {
  const { _props, buttonName } = props;
  const { isShow, openModal, closeModal, onBGAnimation, onModalOpenAnimation } =
    _props as ModalExamplePropsTypes & ModalExampleAddTypes;
  console.log(_props);

  return (
    <>
      {/* 모달 실행 버튼 */}
      <_Button onClickEvent={openModal}>{buttonName ?? "Open Modal"}</_Button>
      <_Modal
        show={isShow}
        onCloseModal={closeModal}
        onBGAnimation={onBGAnimation}
        onModalOpenAnimation={onModalOpenAnimation}
      />
    </>
  );
}

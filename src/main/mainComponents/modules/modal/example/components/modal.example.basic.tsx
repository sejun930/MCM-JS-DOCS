import { _Modal } from "MCM-js";
import { IPropsTypes } from "../modal.example.types";

import _Button from "src/main/commonsComponents/units/button";

// 모달 기본 예시
export default function ModalBasicExample(props: { props: IPropsTypes }) {
  const { openModal, isShow, closeModal } = props.props;

  return (
    <>
      <_Button onClickEvent={openModal}>Open Basic Modal</_Button>
      <_Modal show={isShow} onCloseModal={closeModal}>
        모달 기본 예시입니다.
      </_Modal>
    </>
  );
}

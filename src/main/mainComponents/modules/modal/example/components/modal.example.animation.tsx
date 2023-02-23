import { _Modal } from "MCM-js";
import { IPropsTypes } from "../modal.example.types";

import _Button from "src/main/commonsComponents/units/button";

// 애니메이션 적용
export default function ModalAnimationExample(props: { props: IPropsTypes }) {
  const { openModal, isShow, closeModal } = props.props;

  return (
    <>
      <_Button onClickEvent={openModal}>Open Animation Modal</_Button>
      <_Modal
        show={isShow}
        onCloseModal={closeModal}
        onBGAnimation
        onModalOpenAnimation
      >
        애니메이션이 추가된 모달입니다.
      </_Modal>
    </>
  );
}

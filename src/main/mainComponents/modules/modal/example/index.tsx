import { _Modal } from "MCM-js";

import {
  ExampleContentsTypes,
  ExampleContentsInfoTypes,
} from "src/main/commonsComponents/units/template/form/example/template.example.types";
import {
  ModalExampleCommonsTypes,
  ModalExampleInitTypes,
} from "../modal.types";
import _Button from "src/main/commonsComponents/units/button";

export default function ModalExampleRenderPage(props: ExampleContentsTypes) {
  const { idx, buttonName } = props.info as ExampleContentsInfoTypes;
  const { isShow, openModal, closeModal } =
    props.commonsProps as ModalExampleCommonsTypes;
  const { onBGAnimation, onModalOpenAnimation } =
    props.addProps as ModalExampleInitTypes;

  console.log(props);

  return (
    <>
      {/* 모달 실행 버튼 */}
      <_Button onClickEvent={openModal(idx ?? 0)}>
        {buttonName ?? "Open Modal"}
      </_Button>
      {isShow && (
        <_Modal
          show={isShow[idx ?? 0]}
          onCloseModal={closeModal(idx ?? 0)}
          onBGAnimation={onBGAnimation}
          onModalOpenAnimation={onModalOpenAnimation}
        >
          {props.children}
        </_Modal>
      )}
    </>
  );
}

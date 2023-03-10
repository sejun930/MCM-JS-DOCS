import { _Modal } from "mcm-js-dev";

import {
  ExampleContentsTypes,
  ExampleContentsInfoTypes,
} from "src/main/commonsComponents/units/template/form/example/template.example.types";
import {
  ModalExampleCommonsTypes,
  ModalExampleInitTypes,
} from "../modal.types";
import _Button from "src/main/commonsComponents/units/button";

export default function MyModalExample(props: ExampleContentsTypes) {
  const { idx, buttonName } = props.info as ExampleContentsInfoTypes;
  const { isShow, openModal, closeModal } =
    props.commonsProps as ModalExampleCommonsTypes;
  const { showBGAnimation, showModalOpenAnimation } =
    props.addProps as ModalExampleInitTypes;

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
          showBGAnimation={showBGAnimation}
          showModalOpenAnimation={showModalOpenAnimation}
        >
          {props.children}
        </_Modal>
      )}
    </>
  );
}

import React from "react";

import { Modal } from "mcm-js-dev";
import { _Button } from "mcm-js-commons";
import { ModalPropsType } from "mcm-js/dist/commons/types";

import {
  ExampleContentsTypes,
  ExampleContentsInfoTypes,
} from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { ModalExampleCommonsTypes } from "../modal.types";

export default function MyModalExample(props: ExampleContentsTypes) {
  const { idx, buttonName } = props.info as ExampleContentsInfoTypes;
  const { isShow, openModal, closeModal } =
    props.commonsProps as ModalExampleCommonsTypes;
  const {
    showBGAnimation,
    showModalOpenAnimation,
    styles,
    mobileDefaultStyles,
    hideCloseButton,
    closeMent,
    closeButtonSize,
    offAutoClose,
  } = props.addProps as ModalPropsType;

  return (
    <>
      {/* 모달 실행 버튼 */}
      <_Button
        onClickEvent={openModal(idx ?? 0)}
        className="_open_module_button_"
      >
        {buttonName ?? "Open Modal"}
      </_Button>
      {isShow && (
        <Modal
          show={isShow[idx ?? 0]}
          onCloseModal={closeModal(idx ?? 0)}
          showBGAnimation={showBGAnimation}
          showModalOpenAnimation={showModalOpenAnimation}
          styles={styles}
          mobileDefaultStyles={mobileDefaultStyles}
          hideCloseButton={hideCloseButton}
          closeMent={closeMent}
          closeButtonSize={closeButtonSize}
          offAutoClose={offAutoClose}
        >
          {props.content}
        </Modal>
      )}
    </>
  );
}

import React from "react";

import { Modal } from "mcm-js";
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
    modalSize,
    mobileModalSize,
    hideCloseButton,
    closeMent,
    offAutoClose,
    closeButtonInfo,
  } = props.addProps as ModalPropsType;

  const isError = props?.isError || false;
  console.log(isError);
  return (
    <>
      {/* 모달 실행 버튼 */}
      {!isError && (
        <_Button
          onClickEvent={openModal(idx ?? 0)}
          className="_open_module_button_"
        >
          {buttonName ?? "Open Modal"}
        </_Button>
      )}
      {isShow && (
        <Modal
          // @ts-ignore
          show={isError ? undefined : isShow[idx ?? 0]}
          // @ts-ignore
          onCloseModal={isError ? undefined : closeModal(idx ?? 0)}
          showBGAnimation={showBGAnimation}
          showModalOpenAnimation={showModalOpenAnimation}
          modalSize={modalSize}
          mobileModalSize={mobileModalSize}
          hideCloseButton={hideCloseButton}
          closeMent={closeMent}
          closeButtonInfo={closeButtonInfo}
          offAutoClose={offAutoClose}
        >
          {props.content}
        </Modal>
      )}
    </>
  );
}

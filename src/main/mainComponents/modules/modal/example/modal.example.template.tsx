import React from "react";
import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { Modal } from "mcm-js";
import { _Button } from "mcm-js-commons";

import {
  ExampleContentsTypes,
  ExampleContentsInfoTypes,
} from "src/main/commonsComponents/units/template/form/example/template.example.types";
import { ModalExampleCommonsTypes } from "../modal.types";

export default function MyModalExample(props: ExampleContentsTypes) {
  const { idx, buttonName } = props.info as ExampleContentsInfoTypes;
  const { isShow, openModal, closeModal } =
    props.commonsProps as ModalExampleCommonsTypes;

  const isError = props?.isError || false;

  const _props = { ...props.addProps };
  _props.show = isShow[idx ?? 0];
  _props.onCloseModal = closeModal(idx ?? 0);

  if (isError) {
    _props.show = undefined;
    _props.onCloseModal = undefined;
  }

  if (props.vers === 1) {
    _props.show = true;
    _props.children = props.content ? (
      props.content
    ) : (
      <span>{props.content}</span>
    );

    if (props.addProps?.children) _props.children = props.addProps.children;
  }

  return (
    <>
      {/* 모달 실행 버튼 */}
      {!isError && (
        <OpenModalButton
          onClickEvent={() =>
            props.vers === 0 ? openModal(idx ?? 0)() : Modal.open({ ..._props })
          }
        >
          {buttonName ?? "Open Modal"}
        </OpenModalButton>
      )}
      {isShow &&
        ((props.vers === 0 && (
          // @ts-ignore
          <Modal {..._props}>
            <span>{props.content}</span>
          </Modal>
        )) || <></>)}
    </>
  );
}

export const CloseMultipleModal = () => {
  return (
    <div>
      <span> 상위 모달 </span>
      <Modal
        show={true}
        onCloseModal={() => Modal.close({ id: "parents-modal" })}
        modalSize={{ width: "400px", height: "400px" }}
      >
        <span> 하위 모달을 종료하면 상위 모달도 함께 종료됩니다. </span>
      </Modal>
    </div>
  );
};

export const OpenModalButton = styled(_Button)`
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  border: double 3px #7b2869;
  font-weight: 700;
  font-size: 14px;
  width: fit-content;
  transition: all 0.3s ease;

  :hover {
    background-color: #7b2869;
    color: white;
    border: double 3px white;
  }

  @media ${breakPoints.mobileLarge} {
    width: 100%;
    padding: 0.8rem;
  }
`;

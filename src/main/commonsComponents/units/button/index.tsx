import React from "react";
import styled from "@emotion/styled";

import CommonsHooksComponents from "../../hooks";

interface StyleTypes {
  children: React.ReactNode;
  className?: string; // 클래스 이름
  onClickEvent: () => void; // 실행할 클릭 이벤트
}

export default function _Button({
  children,
  className,
  onClickEvent,
}: StyleTypes) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    <Button
      className={getAllComponentsClassName("_button_", className)}
      onClick={onClickEvent}
    >
      {children}
    </Button>
  );
}

const Button = styled.button``;

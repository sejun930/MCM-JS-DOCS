import styled from "@emotion/styled";
import React, { CSSProperties, MutableRefObject } from "react";

import CommonsHooksComponents from "../../hooks/commonsHooks";

interface IProps {
  src: string; // 출력될 이미지 경로
  styles?: CSSProperties; // 설정할 스타일
  className?: string;
  _ref?: MutableRefObject<HTMLImageElement>;
}

export default function _Image({ src, styles, className, _ref }: IProps) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    <Img
      className={getAllComponentsClassName("_image_", className)}
      src={src}
      style={styles}
      ref={_ref}
    />
  );
}

const Img = styled.img`
  width: 100%;
  pointer-events: none; // PC 이미지 다운로드 금지
  -webkit-touch-callout: none; // 아이폰 다운로드 금지
  -webkit-user-select: none; // 드래그 방지
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

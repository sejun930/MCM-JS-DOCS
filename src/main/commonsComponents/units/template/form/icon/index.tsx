import styled from "@emotion/styled";
import { _SpanText } from "mcm-js-commons";
import { CSSProperties } from "react";

export default function _IconForm({ type }: { type: "update" }) {
  const renderIcon = () => {
    let className = "icons-form";

    if (type === "update") className += " update-icons";

    return (
      <Icon type={type} className={className}>
        UP
      </Icon>
    );
  };

  return renderIcon();
}

interface StyleTypes {
  type: "update";
}

export const Icon = styled(_SpanText)`
  pointer-events: none; // PC 이미지 다운로드 금지
  -webkit-touch-callout: none; // 아이폰 다운로드 금지
  -webkit-user-select: none; // 드래그 방지
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  letter-spacing: -0.03rem;

  ${(props: StyleTypes) => {
    let styles: CSSProperties & { [key: string]: string } = {};

    if (props.type) {
      if (props.type === "update")
        styles = {
          fontSize: "10px",
          color: "#aa5656",
          fontWeight: "700",
        };
    }

    return styles;
  }}
`;

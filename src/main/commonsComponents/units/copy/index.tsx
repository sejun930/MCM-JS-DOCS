import { CopyButton, CopyText, CopyWrapper } from "./copy.styles";
import { MutableRefObject, useRef, useState } from "react";
import { _PText } from "mcm-js-commons";

import CommonsHooksComponents from "../../hooks/commonsHooks";
import { CodeTypes } from "./copy.types";
import { getTap, removeTag, removeBoldTag } from "../../functional/code";
import { Pre } from "./code-highlight/codeHighlight.styles";

import { getLibraries } from "../../functional/modules";
const { Alert } = getLibraries();

// 글자 복사 기능 컴포넌트
export default function _Copy({
  text,
  showText,
  className,
  onlyClickButton,
  copiedMessage,
  type,
  isMinimum,
  offCopyAnimation,
  position,
  copyDisable,
}: CodeTypes) {
  const _ref = useRef() as MutableRefObject<HTMLDivElement>;
  const _textWrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { getAllComponentsClassName } = CommonsHooksComponents();

  let textPosition = "center";
  if (position) {
    textPosition = position.toLowerCase();
    if (position === "Top") textPosition = "flex-start";
    if (position === "Bottom") textPosition = "flex-end";
  }

  // 복사 확인 여부 (true일 경우 복사 완료)
  const [isCopied, setIsCopied] = useState(false);

  // 글자 복사하기
  const copy = () => {
    if (isCopied || copyDisable) return;

    Alert.openAlert({
      id: "copy-alert",
      children: `${(type === "Code" && `Code`) || ""} Copied!`,
      closeDelayTime: "infinite",
      useCloseMode: { useSwipeMode: true },
      alertConcept: {
        type: "success",
        custom: {
          color: "white",
          text: {
            color: "white",
            weight: 700,
          },
        },
      },
      alertStyles: {
        backgroundColor: "#35A29F",
      },
    });
    setIsCopied(true);

    if (_ref.current)
      _ref?.current?.addEventListener("mouseleave", leaveIconMouse);

    if (type === "Code") text = getTap(removeTag(removeBoldTag(text)));
    navigator.clipboard.writeText(text);
  };

  // 마우스 leave 이벤트 작동시, 아이콘 되돌리기
  const leaveIconMouse = () => {
    if (_ref.current) {
      setIsCopied(false);
      _ref?.current?.removeEventListener("mouseleave", leaveIconMouse);
    }
  };

  // 마우스가 벗어날 경우 현재 오픈된 alert 제거
  const closeAlert = () => {
    Alert.closeAlert({ id: "copy-alert" });
  };

  // 코드를 렌더하고 있는지?
  const isCode = type === "Code";

  return (
    <CopyWrapper
      className={getAllComponentsClassName("copy-wrapper", className)}
      ref={_ref}
      isCopied={isCopied}
      offCopyAnimation={offCopyAnimation}
      isCode={isCode}
      onMouseLeave={closeAlert}
    >
      <CopyText ref={_textWrapperRef} className="copy-text">
        {/* 코드용과 텍스트용 분할 렌더 */}
        {type === "Code" ? (
          <Pre className="copy-code-list">
            <code
              className="copy-code"
              dangerouslySetInnerHTML={{ __html: getTap(showText || text) }}
            />
          </Pre>
        ) : (
          <_PText className="copy-contents">{showText || text}</_PText>
        )}
      </CopyText>

      {!copyDisable && (
        <CopyButton
          isCode={isCode}
          textPosition={textPosition}
          className="copy-btn"
          onMouseDown={(!onlyClickButton && copy) || undefined}
        >
          <_PText>{isCopied ? "Copied!" : "Copy"}</_PText>
        </CopyButton>
      )}
    </CopyWrapper>
  );
}

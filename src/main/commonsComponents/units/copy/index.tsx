import { CopyButton, CopyText, CopyWrapper } from "./copy.styles";
import { Pre } from "./code-highlight/codeHighlight.styles";
import { MutableRefObject, useRef, useState } from "react";
import { _PText } from "mcm-js-commons";

import CommonsHooksComponents from "../../hooks/commonsHooks";
import { CodeTypes } from "./copy.types";

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

  // 태그 제거하기
  const removeTag = (str: string) => {
    return str
      .split("</span>")
      .map((el) =>
        el.replace(el.substring(el.indexOf("<span"), el.indexOf(">") + 1), "")
      )
      .join("");
  };

  // 탭 (공백) 적용하기
  const getTap = (str: string) => {
    // 2줄 처리하기
    return str
      .split("/&tap&/")
      .join(
        `
`
      )
      .split("/&tap2&/").join(`
    
`);
  };

  // 글자 복사하기
  const copy = () => {
    if (isCopied || copyDisable) return;

    setIsCopied(true);
    _ref?.current?.addEventListener("mouseleave", leaveIconMouse);

    if (_ref.current) {
      if (type === "Code") {
        text = getTap(removeTag(text));
      }
      navigator.clipboard.writeText(text);
    }
  };

  // 마우스 leave 이벤트 작동시, 아이콘 되돌리기
  const leaveIconMouse = () => {
    if (_ref.current) {
      setIsCopied(false);
      _ref?.current?.removeEventListener("mouseleave", leaveIconMouse);
    }
  };

  // 코드를 렌더하고 있는지?
  const isCode = type === "Code";

  console.log(text);
  return (
    <CopyWrapper
      onMouseDown={(!onlyClickButton && copy) || undefined}
      className={getAllComponentsClassName("copy-wrapper", className)}
      ref={_ref}
      isCopied={isCopied}
      offCopyAnimation={offCopyAnimation}
      isCode={isCode}
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
        <CopyButton isCode={isCode} textPosition={textPosition}>
          <_PText>{isCopied ? "Copied!" : "Copy"}</_PText>
        </CopyButton>
      )}
    </CopyWrapper>
  );
}

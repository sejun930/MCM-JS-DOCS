import { CopyButton, CopyText, CopyWrapper } from "./copy.styles";
import { Pre } from "./code-highlight/codeHighlight.styles";
import { MutableRefObject, useRef, useState } from "react";

import CommonsHooksComponents from "../../hooks";
import _Image from "../image";

interface IProps {
  text: string; // 복사할 텍스트 내용
  className?: string; // 클래스네임 지정
  onlyClickButton?: boolean; // 복사 버튼을 클릭할 때만 복사 여부 지정 (default : false)
  copiedMessage?: string; // 복사 완료시 출력되는 완료 메세지 (default : "복사되었습니다.")
  type?: "Text" | "Code"; // 복사할 텍스트의 타입 지정 (default : Text)
  // ex) Code를 선택할 경우 자바스크립트 코드를 사용
  isMinimum?: boolean; // 복사 아이콘만 출력 (default : false)
  offCopyAnimation?: boolean; // 복사 애니메이션 끄기 (default : false)
}

// 글자 복사 기능 컴포넌트
export default function _Copy({
  text,
  className,
  onlyClickButton,
  copiedMessage,
  type,
  isMinimum,
  offCopyAnimation,
}: IProps) {
  const _ref = useRef() as MutableRefObject<HTMLDivElement>;
  const _textWrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _textRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { getAllComponentsClassName } = CommonsHooksComponents();

  // 복사 확인 여부 (true일 경우 복사 완료)
  const [isCopied, setIsCopied] = useState(false);

  // 태그 제거하기
  const removeTag = (str: string) => {
    return str
      .split("</span>")
      .map((el) => {
        return el.substring(el.lastIndexOf(">") + 1);
      })
      .join("");
  };

  // 글자 복사하기
  const copy = () => {
    if (isCopied) return;
    if (_textRef.current && _ref.current) {
      if (type === "Text" || !type) {
        // 복사할 input 선택하기
        _textRef.current.select();
      } else {
        // 복사할 임시 input 생성
        const tempInput = document.createElement("input");
        tempInput.value = removeTag(text);
        tempInput.classList.add("hide");

        if (_textWrapperRef.current) {
          _textWrapperRef?.current?.appendChild(tempInput);
          tempInput.select();

          window.setTimeout(() => {
            tempInput.remove();
          }, 0);
        }
      }
      // 텍스트 복사하기
      document.execCommand("copy");

      setIsCopied(true);
      _ref?.current?.addEventListener("mouseleave", leaveIconMouse);
    }
  };

  // 마우스 leave 이벤트 작동시, 아이콘 되돌리기
  const leaveIconMouse = () => {
    if (_ref.current) {
      setIsCopied(false);
      _ref?.current?.removeEventListener("mouseleave", leaveIconMouse);
    }
  };

  return (
    <CopyWrapper
      onMouseDown={(!onlyClickButton && copy) || undefined}
      className={getAllComponentsClassName("_copy_", className)}
      ref={_ref}
      isCopied={isCopied}
      offCopyAnimation={offCopyAnimation}
      isCode={type === "Code"}
    >
      <CopyText ref={_textWrapperRef}>
        {/* 타입에 따른 별도 렌더하기 */}
        {type === "Code" ? (
          <Pre>
            <code ref={_textRef} dangerouslySetInnerHTML={{ __html: text }} />
          </Pre>
        ) : (
          <input
            className="copyInput"
            readOnly
            type="text"
            value={text}
            ref={_textRef}
          />
        )}
      </CopyText>
      <CopyButton onClick={(onlyClickButton && copy) || undefined}>
        <_Image
          src={`/images/commons/icons/${isCopied ? "copied" : "copy"}.png`}
          className="_copyIcon_"
        />
      </CopyButton>
    </CopyWrapper>
  );
}

import styled from "@emotion/styled";
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
        tempInput.value = text;
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
      onClick={(!onlyClickButton && copy) || undefined}
      className={getAllComponentsClassName("_copy_", className)}
      ref={_ref}
      isCopied={isCopied}
      offCopyAnimation={offCopyAnimation}
    >
      <CopyText ref={_textWrapperRef}>
        {/* 타입에 따른 별도 렌더하기 */}
        {type === "Code" ? (
          <code ref={_textRef}>{text}</code>
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

interface StyleTypes {
  isCopied?: boolean;
  offCopyAnimation?: boolean;
}

export const CopyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f3f3;
  width: 100%;
  /* padding: 1rem; */
  border-radius: 5px;
  height: 60px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .hide {
    position: absolute;
    opacity: 0;
  }

  .copyInput {
    width: 100%;
    height: 100%;
    border: unset;
    background-color: unset;
    cursor: pointer;
    outline: none;
    font-size: 16px;
  }

  ._copyIcon_ {
    width: 20px;
    transition: all 0.3s ease-out;
  }

  :before,
  :after {
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    transition: all 0.3s;

    ${(props: StyleTypes) =>
      props.isCopied &&
      !props.offCopyAnimation && {
        width: "100%",
        height: "100%",
      }}
  }

  :before {
    bottom: 0;
    left: 0;
    border-left: 2px solid #95bdff;
    border-bottom: 2px solid #95bdff;
    border-radius: 0 0 0 4px;
  }

  :after {
    top: 0;
    right: 0;
    border-right: 2px solid #95bdff;
    border-top: 2px solid #95bdff;
    border-radius: 0 4px 0 0px;
  }
`;

export const CopyButton = styled.button`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CopyText = styled.div`
  display: flex;
  padding-left: 1rem;
`;

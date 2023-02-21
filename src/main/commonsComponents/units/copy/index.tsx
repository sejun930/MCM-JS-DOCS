import styled from "@emotion/styled";
import { MutableRefObject, useRef, useState } from "react";

import CommonsHooksComponents from "../../hooks";
import _Image from "../image";

interface IProps {
  text: string; // 복사할 텍스트 내용
  className?: string; // 클래스네임 지정
  onlyClickButton?: boolean; // 복사 버튼을 클릭할 때만 복사 여부 지정 (default : false)
  copiedMessage?: string; // 복사 완료시 출력되는 완료 메세지 (default : "복사되었습니다.")
}

// 글자 복사 기능 컴포넌트
export default function _Copy({ text, className, onlyClickButton }: IProps) {
  const _ref = useRef() as MutableRefObject<HTMLDivElement>;
  const _textRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { getAllComponentsClassName } = CommonsHooksComponents();

  // 복사 확인 여부 (true일 경우 복사 완료)
  const [isCopied, setIsCopied] = useState(false);

  // 글자 복사하기
  const copy = () => {
    if (_textRef.current && _ref.current) {
      // 복사할 input 선택하기
      _textRef.current.select();
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
    >
      {/* <span ref={_ref}>123123</span> */}
      <input readOnly type="text" value={text} ref={_textRef} />
      <CopyButton onClick={(onlyClickButton && copy) || undefined}>
        <_Image
          src={`/images/commons/icons/${isCopied ? "copied" : "copy"}.png`}
          className="_copyIcon_"
        />
      </CopyButton>
    </CopyWrapper>
  );
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

  input {
    width: 100%;
    height: 100%;
    padding: 0px 1.5rem;
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
`;

export const CopyButton = styled.button`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

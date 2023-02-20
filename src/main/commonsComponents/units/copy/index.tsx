import styled from "@emotion/styled";
import { MutableRefObject, useRef } from "react";

import CommonsHooksComponents from "../../hooks";
import _Image from "../image";

interface IProps {
  text: string;
  className?: string;
}

// 글자 복사 기능 컴포넌트
export default function _Copy({ text, className }: IProps) {
  const _ref = useRef() as MutableRefObject<HTMLInputElement>;
  const { getAllComponentsClassName } = CommonsHooksComponents();

  const copy = () => {
    if (_ref.current) {
      // 복사할 input 선택하기
      _ref.current.select();
      // 텍스트 복사하기
      document.execCommand("copy");
    }
  };

  return (
    <CopyWrapper
      onClick={copy}
      className={getAllComponentsClassName("_copy_", className)}
    >
      <input readOnly type="text" value={text} ref={_ref} />
      <button>
        <_Image src="/images/commons/icons/copy.png" className="_copyIcon_" />
      </button>
    </CopyWrapper>
  );
}

export const CopyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f3f3;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  height: 60px;
  cursor: pointer;

  input {
    border: unset;
    background-color: unset;
    cursor: pointer;
    outline: none;
    font-size: 16px;
  }

  ._copyIcon_ {
    width: 20px;
  }
`;

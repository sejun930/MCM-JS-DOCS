import { useState } from "react";

import { modalExampleList } from "./data";
import { IProps } from "./modal.example.types";

export default function ModalExampleHomePage({ type }: IProps) {
  // 모달을 오픈할 show state (true일 때 모달 오픈)
  const [isShow, setIsShow] = useState<boolean>(false);

  // 버튼 클릭 시 모달 오픈
  const openModal = (): void => {
    setIsShow(true);
  };

  // 모달 종료 함수
  const closeModal = (): void => {
    setIsShow(false);
  };

  // 예시용 컴포넌트로 전달되는 props
  const props = { isShow, openModal, closeModal };

  const renderExample = () => {
    // 각각의 타입에 맞는 예시용 컴포넌트 출력
    return modalExampleList[type]({ props });
  };
  return renderExample();
}

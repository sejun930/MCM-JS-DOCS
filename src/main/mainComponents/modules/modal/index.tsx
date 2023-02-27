import { useState } from "react";

import styled from "@emotion/styled";
import { exampleList, initModalProps } from "./example/data";

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example";

export default function MyModal() {
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
  const props = { ...initModalProps, isShow, openModal, closeModal };

  return (
    <Template>
      <_MainTitleTemplate />
      <ModulesInfoWrapper>
        <_HowUseForm />
        <_ExampleForm exampleList={exampleList} _props={props} />
      </ModulesInfoWrapper>
    </Template>
  );
}

export const ModulesInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px 0px;
`;

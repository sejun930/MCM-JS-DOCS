import { useState } from "react";

import styled from "@emotion/styled";
import {
  modalExampleList,
  modalExampleInitProps,
} from "./example/modal.example.render.data";
import { modalCodeList } from "./example/modal.example.code.data";

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example";
import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

export default function MyModal() {
  // 모달을 오픈할 show state (true일 때 모달 오픈)
  const { getAllExampleComponentLength } = CommonsHooksComponents();

  const [isShow, setIsShow] = useState(
    new Array(getAllExampleComponentLength(modalExampleList)).fill(false)
  );

  // 버튼 클릭 시 모달 오픈
  const openModal = (idx: number) => (): void => {
    const temp = [...isShow];
    temp[idx] = true;

    setIsShow(temp);
  };

  // 모달 종료 함수
  const closeModal = (idx: number) => (): void => {
    const temp = [...isShow];
    temp[idx] = false;

    setIsShow(temp);
  };

  // 예시용 컴포넌트로 전달되는 props
  const commonsProps = { isShow, openModal, closeModal };

  return (
    <Template>
      <_MainTitleTemplate />
      <ModulesInfoWrapper>
        <_HowUseForm
          code={modalCodeList.basic}
          exmapleContents="기본 모달 페이지입니다."
        />
        <_ExampleForm
          exampleList={modalExampleList}
          initProps={modalExampleInitProps}
          commonsProps={commonsProps}
        />
      </ModulesInfoWrapper>
    </Template>
  );
}

export const ModulesInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px 0px;
`;

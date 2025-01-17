import { ModulesInfoWrapper } from "../index.styles";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { versState } from "src/commons/store";

import {
  modalExampleList,
  modalExampleInitProps,
  modalFunctionalData,
} from "./example/modal.example.render.data";
import { modalCodeList } from "./example/modal.example.code.data";
import { modalFunctionalList } from "./functional";
import { modalPropsList } from "./props/modal.propsList";

import Template from "src/main/commonsComponents/units/template/main";
import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example/template.example.container";
import _FunctionalForm from "src/main/commonsComponents/units/template/form/functional";
import _TreeForm from "src/main/commonsComponents/units/template/form/tree";
import _PropsForm from "src/main/commonsComponents/units/template/form/props";
import _CommentsForm from "src/main/commonsComponents/units/template/form/comments/comments.render";
import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

export default function MyModal() {
  // 모달을 오픈할 show state (true일 때 모달 오픈)
  const { getAllExampleComponentLength } = CommonsHooksComponents();

  const [vers] = useRecoilState(versState);
  const [isShow, setIsShow] = useState<Array<boolean>>(
    new Array(getAllExampleComponentLength(modalExampleList(vers))).fill(false)
  );

  // fixed 종료 시점 설정
  const endPointRef = useRef() as MutableRefObject<HTMLDivElement>;
  // endPointRef가 있을 경우에만 렌더
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    if (endPointRef.current) {
      setRender(true);
    }
  }, [endPointRef]);

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
        {(render && (
          <>
            <_HowUseForm
              codeInfo={modalCodeList(vers)}
              exmapleContents="기본 Modal 페이지입니다."
              endPointRef={endPointRef.current}
            />
            <_ExampleForm
              exampleList={modalExampleList(vers)}
              initProps={modalExampleInitProps}
              commonsProps={commonsProps}
            />
            {modalFunctionalData[vers] && vers === 1 && (
              <_FunctionalForm functionalList={modalFunctionalList} />
            )}
          </>
        )) || <></>}
        <_PropsForm isObject={vers === 1} list={modalPropsList(vers)} />
      </ModulesInfoWrapper>
      <_TreeForm endPointRef={endPointRef} />
      <_CommentsForm />
    </Template>
  );
}

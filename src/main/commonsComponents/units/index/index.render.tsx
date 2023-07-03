import { Wrapper } from "./index.styles";
import { useState } from "react";

import _IndexForm from "./index.container";
import { _Error, _Title } from "mcm-js-commons";
import { IndexIPropsTypes } from "./index.type";

// 목차 페이지의 렌더 페이지
// 전달된 리스트의 id 값들을 모두 확인해 하나라도 없는 아이디 값이라면 렌더 불가능
export default function IndexRenderPage(props: IndexIPropsTypes) {
  const { indexList, offFixed } = props;

  // 목차 렌더 여부
  const [show, setShow] = useState(true);
  // 목차 고정하기
  const [fix, setFix] = useState(true);
  // 최소화 여부
  const [isMinimum, setIsMinimum] = useState(false);

  // 목차창 on/off
  const toggleIndex = (bool?: boolean) => {
    if (bool) setShow(bool);
    else setShow((prev) => !prev);

    setFix(true);
  };

  // 고정 toggle
  const toggleFix = () => {
    setFix((prev) => !prev);
  };

  // 최소화 toggle
  const toggleMinimum = () => {
    setIsMinimum((prev) => !prev);
  };

  // 페이지 렌더 여부 확인 및 최종 렌더하기
  const renderIndexPage = () => {
    let node = (
      <_IndexForm
        {...props}
        toggleIndex={toggleIndex}
        fix={fix}
        toggleFix={toggleFix}
        isMinimum={isMinimum}
        toggleMinimum={toggleMinimum}
        show={show}
      />
    );
    let errorMessage;

    if (!indexList) {
      // indexList props를 전달하지 않았을 경우
      node = (
        <_Error
          propsList={props as { [key: string]: any }}
          requiredList={["indexList"]}
        >
          {node}
        </_Error>
      );
    } else if (!indexList.length) {
      // indexList는 전달되었으나, 비어있는 리스트일 경우
      errorMessage = (
        <>
          <b>indexList</b> props를 올바른 데이터로 전달해주세요.
        </>
      );
    } else {
      // indexList 중에서 하나라도 id값이 올바르지 않을 경우
      indexList.some((info) => {
        const documents = document.getElementById(info.id);

        // 없는 id값이 실제로 존재할 경우
        if (!documents) {
          errorMessage = (
            <>
              <b>{info.id}</b> id 값을 찾을 수가 없습니다.
            </>
          );
        }
      });
    }

    if (errorMessage) {
      node = (
        <_Title titleLevel="h3" className="error-message">
          {errorMessage}
        </_Title>
      );
    }

    return (
      <Wrapper
        className="mcm-index-wrapper"
        fix={offFixed ? false : fix}
        isMinimum={isMinimum}
        show={show}
      >
        {node}
      </Wrapper>
    );
  };

  return renderIndexPage();
}

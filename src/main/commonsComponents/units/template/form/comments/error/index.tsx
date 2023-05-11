import styled from "@emotion/styled";
import { Modal } from "mcm-js";

import { _Title, _Button } from "mcm-js-commons";

export default function ErrorModalForm({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <Wrapper>
      <_Title>{errorMessage}</_Title>
      <ButtonWrapper>
        <_Button onClickEvent={() => Modal.close({ className: "error-modal" })}>
          확인
        </_Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;

  .mcm-title-unit {
    font-size: 24px;
    font-weight: 900;
    height: 50%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;

  .cmm-button-unit {
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 16px;
    color: #666666;
  }
`;

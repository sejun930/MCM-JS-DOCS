import styled from "@emotion/styled";
import { Modal } from "mcm-js";

import { _Title, _Button, _PTextWithHtml } from "mcm-js-commons";

export default function ErrorModalForm({
  errorMessage, // 에러 메세지
  errorEvent, // 확인 버튼 클릭시 실행 이벤트
  isSuccess, // 성공했을 경우
  offClose, // 닫기 금지
}: {
  errorMessage: string;
  errorEvent?: () => void;
  isSuccess?: boolean;
  offClose?: boolean;
}) {
  console.log(errorEvent);
  return (
    <Wrapper>
      <_PTextWithHtml
        dangerouslySetInnerHTML={`🙇 ${errorMessage}`}
        className="message"
      />
      {/* <_Title>🙇 {errorMessage}</_Title> */}
      {!offClose && (
        <ButtonWrapper>
          <_Button
            onClickEvent={() => {
              Modal.close({
                className: `error-modal ${(isSuccess && "success") || ""}`,
              });
              if (errorEvent) errorEvent();
            }}
          >
            확인
          </_Button>
        </ButtonWrapper>
      )}
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

  .message {
    font-size: 24px;
    font-weight: 900;
    height: 50%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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

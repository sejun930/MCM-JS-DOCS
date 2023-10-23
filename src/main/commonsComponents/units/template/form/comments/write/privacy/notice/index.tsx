import styled from "@emotion/styled";

import { _Title, _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

// 개인정보 수집 약관 및 동의 페이지
export default function PrivacyNoticePage({
  privacyAgreeEvent,
}: {
  privacyAgreeEvent: () => void;
}) {
  return (
    <Wrapper className="privacy-notice-wrapper">
      <TitleWrapper>
        <_Title className="privacy-notice-title">
          개인정보 (IP) 수집 약관
        </_Title>
      </TitleWrapper>
      <NoticeContentsWrapper>
        <NoticeContents>
          <li>
            댓글 작성 시 아이피 주소가 자동으로 수집되며 <br />
            해당 정보는 <b>mcm-js</b>의 데이터베이스에 저장됩니다.
          </li>
          <li>아이피 주소 외에는 추가적인 개인 정보를 수집하지 않습니다.</li>{" "}
          <li>
            아이피 주소 수집의 목적은 불건전한 댓글 및 불량 사용자를 식별 및
            차단하기 위한 용도로 사용되며, 이 외에의 용도에는 절대 사용되지
            않습니다.
          </li>
          <li>
            아이피 주소는 귀하의 개인 정보를 보호하기 위해 적절한 보안 조치를
            취하고, 법적 요구 사항을 준수하는 데 사용됩니다.
          </li>{" "}
          <li>
            개인정보 보호 및 데이터 처리에 대한 자세한 내용은 <b>mcm-js</b>의
            개인정보 보호 정책을 참조해주시기 바랍니다.
          </li>
          <li>
            개인정보 수집 약관에 동의하지 않을 시 댓글 등록이 불가하며,{" "}
            <b>mcm-js</b>의 모든 댓글 등록은 사용자가 개인정보 수집 약관에
            동의함으로 간주합니다.
          </li>
        </NoticeContents>
      </NoticeContentsWrapper>
      {/* <Tooltip tooltipText="개인정보 (IP) 수집에 동의합니다." useShowAnimation> */}
      <_Button
        className="privacy-agree-button"
        onClickEvent={privacyAgreeEvent}
        buttonType="button"
      >
        개인정보 (IP) 수집 동의
      </_Button>
      {/* </Tooltip> */}
    </Wrapper>
  );
}

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;

  .privacy-agree-button {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #30a2ff;
    border-radius: 0px 0px 10px 10px;
    color: white;
    font-size: 18px;
    font-weight: 700;
  }

  @media ${breakPoints.mobileLarge} {
    height: 100%;
    justify-content: space-between;
    padding-top: 20px;

    .privacy-agree-button {
      position: relative;
      border-radius: 0px;
      font-size: 14px;
      height: 40px;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 100%;

  .privacy-notice-title {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 26px;
    font-family: sans-serif;
    word-spacing: -0.1rem;
  }

  @media ${breakPoints.mobileLarge} {
    padding: 0;

    .privacy-notice-title {
      align-items: center;
      font-size: 20px;
      font-weight: 900;
      line-height: 26px;
      /* margin-top: 20px; */
    }
  }
`;

export const NoticeContentsWrapper = styled.div`
  display: flex;
  background-color: #eeeeee;
  border-radius: 10px;
  margin-top: 10px;
  padding: 1rem;
  height: 300px;

  @media ${breakPoints.mobileLarge} {
    padding: 0.5rem;
    margin-top: 0px;
  }
`;

export const NoticeContents = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 24px 0px;
  height: 100%;

  li {
    font-family: monospace;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02rem;
  }

  @media ${breakPoints.mobileLarge} {
    gap: 16px 0px;
    /* height: 80%; */

    li {
      font-size: 12px;
      line-height: 18px;
    }
  }
`;

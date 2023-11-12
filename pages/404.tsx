import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { useEffect } from "react";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";
import { _Title, _PText, _Link } from "mcm-js-commons";
import Template from "src/main/commonsComponents/units/template/main";

let timeEvent: number | ReturnType<typeof setInterval>;
// 404 에러 발생시 렌더되는 화면
export default function ErrorRenderPage() {
  const { getRouter } = CommonsHooksComponents();

  useEffect(() => {
    const doc = document.getElementById("layout-contents-wrapper");
    const _next = document.getElementById("__next");

    if (doc) doc.style.height = "100%";
    if (_next) _next.style.height = "100%";

    clearInterval(timeEvent);
    let timer = 10;
    timeEvent = setInterval(() => {
      startTimer(--timer);
    }, 1000);
    return () => {
      clearInterval(timeEvent);

      if (doc) doc.style.height = "auto";
      if (_next) _next.style.height = "auto";
    };
  }, []);

  // 10초 카운트
  const startTimer = (timer: number) => {
    if (!timer) {
      clearInterval(timeEvent);

      const router = getRouter();
      router.push("/");
      return;
    }

    const doc = document.getElementById("timer");
    if (doc) {
      // 1초 감소 후 렌더
      doc.innerText = String(timer).padStart(2, "0");
    }
  };

  return (
    <Template>
      <ErrorWrapper className="error-wrapper">
        <_Title className="error-title">😢 Page 404</_Title>
        <ErrorRemakrs>
          <_PText className="error-remarks">
            잘못된 경로의 페이지로 접근하셨습니다!
          </_PText>
          <_PText className="error-timer-wrapper">
            <span>
              <b id="timer">10</b>
            </span>
            <span>초 후 메인 홈페이지로 이동합니다.</span>
          </_PText>
        </ErrorRemakrs>

        <_Link href="/" className="error-move-home" replace>
          🏠 Home으로 이동
        </_Link>
      </ErrorWrapper>
    </Template>
  );
}

export const ErrorWrapper = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px 0px;
  letter-spacing: -0.06rem;

  .error-title {
    font-size: 52px;
    color: #555555;
  }

  .error-move-home {
    width: 180px;
    font-size: 24px;
    margin-top: 20px;
    color: #555555;
  }

  @media ${breakPoints.mobileLarge} {
    align-items: center;
    padding: 4rem 0rem;
  }

  @media ${breakPoints.mobileSmall} {
    gap: 24px 0px;

    .error-title {
      font-size: 40px;
    }
  }
`;

export const ErrorRemakrs = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 20px;
    line-height: 30px;
  }

  #timer {
    color: #aa5656;
    width: 28px;
  }

  .error-timer-wrapper {
    display: flex;

    span {
      display: flex;
    }
  }

  @media ${breakPoints.mobileLarge} {
    align-items: center;
  }

  @media ${breakPoints.mobileSmall} {
    p {
      font-size: 16px;
      line-height: 24px;
    }

    #timer {
      width: 22px;
    }
  }
`;

import React from "react";
import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import MainMobileNavigationTapPage from "./mobileNavigation/main.mobileNavigation";
import { ModulesInfoWrapper } from "src/main/mainComponents/modules";

import MainHead from "./head";

// DOC 페이지 메인 템플릿
export default function Template({
  children,
  isFull,
}: {
  children: React.ReactNode;
  isFull?: boolean;
}) {
  return (
    <>
      <MainHead />
      <Wrapper className="main-template-wrapper" isFull={isFull}>
        {/* 모바일 nav */}
        <MainMobileNavigationTapPage />
        <ModulesInfoWrapper>{children}</ModulesInfoWrapper>
      </Wrapper>
    </>
  );
}

interface StyleTypes {
  isFull?: boolean;
}

export const Wrapper = styled.main`
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  min-width: 85%;
  position: relative;

  ${(props: StyleTypes) =>
    props.isFull && {
      minWidth: "100%",
    }}

  // 코드에 관한 색상 스타일 지정
  code {
    font-weight: 500;
    font-size: 14px;
    color: #9d9d9d;

    .purple,
    .import,
    .export,
    .from {
      // 보라색 : import, export, from
      color: #cb86b9;
    }

    .deepPurple,
    .state {
      // 진보라색 : state, function
      color: #de6db7;
    }

    .number {
      // 숫자
      color: #c4d7b2;
    }

    .lightYellow,
    .function {
      // 연한 노란색 : 함수명
      color: #fffbac;
    }

    .yellow {
      // 노란색
      color: #ffe100;
    }

    .darkBlue {
      // 진한 파란색 : function, const, 태그이름
      /* color: #537fe7; */
      color: #5e8fe9;
    }

    .blue,
    .var {
      color: #009eff;
    }

    .blue1 {
      // 파란색 : 변수명, state 이름
      color: #00c0ff;
    }

    .blue2 {
      color: #70a9ff;
    }

    .blue3 {
      color: #70c0ff;
    }

    .skyblue {
      // 스카이블루 : 라이브러리 및 속성
      /* color: #89c4e1; */
      color: #99e1f0;
    }

    .lightOrange {
      // 연한 주황색 : 라이브러리 및 경로, 문자열
      /* color: #dc8449; */
      /* color: #ff9551; */
      color: #e9a178;
    }

    .gray {
      // 회색 : 태그 여닫기
      color: #9d9d9d;
    }

    .lightGray {
      // 연한 회색 : 세미콜론
      color: #dddddd;
    }

    .lightGreen {
      // 연초록 : 주석
      color: #5f8d4e;
    }

    .green {
      // 초록색 : 스타일 컴포넌트 및 컴포넌트 명
      /* color: #03c988; */
      color: #6cc4a1;
    }
  }

  #mobile-nav-modal {
    display: none;
  }

  @media ${breakPoints.mobileLarge} {
    min-width: 100%;
    padding: 20px;

    #mobile-nav-modal {
      display: flex;

      .mcm-modal-items {
        height: 80% !important;
        width: 80% !important;
        max-width: 420px !important;
        top: 20px;

        .mcm-modal-contents {
          overflow-x: hidden;
        }
      }
    }
  }
`;

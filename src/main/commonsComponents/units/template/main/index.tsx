import React from "react";
import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

// DOC 페이지 메인 템플릿
export default function Template({ children }: { children: React.ReactNode }) {
  return <Wrapper className="main-template-wrapper">{children}</Wrapper>;
}

export const Wrapper = styled.main`
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  min-width: 85%;
  /* z-index: 99; */

  // 코드에 관한 색상 스타일 지정
  code {
    font-weight: 500;
    font-size: 14px;
    color: #9d9d9d;

    .purple {
      // 보라색 : import, export, from
      color: #be6db7;
    }

    .lightYellow {
      // 연한 노란색 : 함수명
      color: #fffbac;
    }

    .yellow {
      // 노란색
      color: #ffe100;
    }

    .darkBlue {
      // 진한 파란색 : function, const, 태그이름
      /* color: #4d77ff; */
      /* color: #537fe7; */
      /* color: #3c79f5; */
      color: #537fe7;
    }

    .blue {
      // 파란색 : 변수명, state 이름
      color: #009eff;
    }

    .skyblue {
      // 스카이블루
      color: #89c4e1;
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

  @media ${breakPoints.mobile} {
    padding: 5vw;
  }
`;

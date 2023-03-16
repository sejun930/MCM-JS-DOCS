import styled from "@emotion/styled";

export const Pre = styled.pre`
  line-height: 1.8;
  code {
    font-weight: 500;
    font-family: "Manlo";
    /* font-family: "Lucida Console"; */
    font-size: 14px;
    color: black;
  }

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
    // 연한 주황색 : 라이브러리 및 경로
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
    color: #4e944f;
  }

  .green {
    // 초록색 : 스타일 컴포넌트 및 컴포넌트 명
    /* color: #03c988; */
    color: #6cc4a1;
  }
`;

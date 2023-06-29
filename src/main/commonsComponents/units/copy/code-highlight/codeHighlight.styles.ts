import styled from "@emotion/styled";

export const Pre = styled.pre`
  line-height: 1.8;
  width: 100%;

  code {
    font-family: "Manlo";
  }

  @media (max-width: 500px) {
    code {
      font-size: 12px;
    }
  }
`;

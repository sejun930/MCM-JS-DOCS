import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export const ModulesInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 240px 0px;

  @media ${breakPoints.mobileLarge} {
    gap: 120px 0px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  gap: 0px 30px;
`;

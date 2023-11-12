import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { _Image, _PText } from "mcm-js-commons";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0px;
  width: 100%;

  .main-title-remarks {
    line-height: 28px;
    letter-spacing: -0.02rem;
  }

  @media ${breakPoints.mobileLarge} {
    padding-top: 0px;
    gap: 32px 0px;
    align-items: center;

    .main-title-remarks {
      text-align: center;
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${breakPoints.mobileLarge} {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

export const TitleItems = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 16px;

  .module-favorite-btn {
    position: relative;
    opacity: 1;
    font-size: 24px;
  }

  .main-title {
    display: flex;
    align-items: center;
  }
`;

export const ExampleImage = styled(_Image)`
  margin-top: 30px;
  width: 500px;
  object-fit: fill;
  border: solid 1px gray;
  border-radius: 10px;

  @media ${breakPoints.mobileLarge} {
    max-width: 600px;
  }

  @media ${breakPoints.mobileSmall} {
    max-width: 100%;
    min-width: auto;
  }
`;

export const UpdateInfo = styled(_PText)`
  font-size: 14px;
  color: #666666;
  position: relative;

  .icons-form {
    position: absolute;
    transform: translate3d(-4px, -8px, 0px);
  }

  @media ${breakPoints.mobileLarge} {
    margin-top: 6px;
  }
`;

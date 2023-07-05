import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { _Button, _PTextWithHtml } from "mcm-js-commons";

interface StyleTypes {
  isSubmit?: boolean;
  isSuccess?: boolean;
}

export const LoginAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 10px;
  justify-content: space-between;
  height: 100%;

  .admin-login-title {
    p {
      font-size: 26px;
      line-height: 38px;
      text-align: center;
      letter-spacing: -0.04rem;
      word-spacing: 4px;
      margin: 0;

      b {
        color: #aa5656;
      }
    }
  }

  @media ${breakPoints.mobileLarge} {
    padding: 1rem 10px;

    .admin-login-title {
      p {
        font-size: 20px;
        line-height: 30px;
        white-space: pre;
      }
    }
  }
`;

export const LoginForm = styled.form`
  display: flex;
  justify-content: space-between;

  @media ${breakPoints.mobileLarge} {
    flex-direction: column;
    justify-content: unset;
    gap: 20px 0px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0px;
  width: 100%;

  .mcm-input-unit-wrapper {
    height: 36px;

    .mcm-input-unit-items {
      border: unset;
      box-shadow: 2px 2px 3px 1px;

      .mcm-input-unit {
        font-size: 14px;
      }
    }
  }

  @media ${breakPoints.mobileLarge} {
    .mcm-input-unit {
      font-size: 12px !important;
    }
  }
`;

export const SubmitButton = styled(_Button)`
  min-width: 80px;
  margin-left: 20px;
  box-shadow: 2px 2px 3px 1px;
  transition: all 0.25s;

  ${(props: StyleTypes) =>
    !props.isSubmit && {
      cursor: "not-allowed",
      backgroundColor: "#dddddd",
      color: "#666666",
      boxShadow: "0px 0px 0px 0px",
    }}

  @media ${breakPoints.mobileLarge} {
    margin-left: 0px;
    height: 36px;
  }
`;

export const Message = styled(_PTextWithHtml)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #aa5656;
  font-weight: 700;
  white-space: pre;
  font-size: 16px;
  line-height: 24px;

  ${(props: StyleTypes) =>
    props.isSuccess && {
      color: "#30a2ff",
    }}

  b {
    color: #666666;
    font-size: 14px;
  }
`;

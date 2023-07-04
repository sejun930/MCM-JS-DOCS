import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { _Title, _Input, _Button } from "mcm-js-commons";
import { FormEvent, useState } from "react";

let debouncing: number | ReturnType<typeof setTimeout>;
export default function AdminLoginPage() {
  // 관리자 아이디 및 비밀번호 기입 정보 저장
  const [info, setInfo] = useState<{ id: string; password: string }>({
    id: "",
    password: "",
  });

  // 기입 정보 변경
  const changeInfo = (text: string, type: string) => {
    clearTimeout(debouncing);

    debouncing = setTimeout(() => {
      setInfo({ ...info, [type]: text });
    }, 200);
  };

  // 기입 정보 누락 체크
  const checkInfo = () => {
    return Boolean(info.id && info.password);
  };

  // 로그인
  const login = (e?: FormEvent) => {
    if (e) e.preventDefault();
    console.log(123);
  };

  return (
    <LoginAlertWrapper>
      <_Title className="admin-login-title">
        <p>비로그인 상태입니다.</p>
        <p>
          관리자로 <b>로그인</b>해주세요.
        </p>
      </_Title>

      <LoginForm onSubmit={login}>
        <InputWrapper>
          <_Input
            onChangeEvent={(text) => changeInfo(text, "id")}
            placeHolder="관리자 아이디를 입력해주세요."
            maxLength={30}
          />
          <_Input
            onChangeEvent={(text) => changeInfo(text, "password")}
            inputType="password"
            placeHolder="관리자 비밀번호를 입력해주세요."
            maxLength={30}
          />
        </InputWrapper>

        <SubmitButton onClickEvent={login} isSubmit={checkInfo()}>
          로그인
        </SubmitButton>
      </LoginForm>
    </LoginAlertWrapper>
  );
}

interface StyleTypes {
  isSubmit?: boolean;
}

export const LoginAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0px;
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
    padding: 1rem 0px;

    .admin-login-title {
      p {
        font-size: 20px;
        line-height: 30px;
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

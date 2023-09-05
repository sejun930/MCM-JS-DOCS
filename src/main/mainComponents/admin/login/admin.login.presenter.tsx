import { FormEvent, MutableRefObject } from "react";
import {
  LoginAlertWrapper,
  LoginForm,
  InputWrapper,
  InputItems,
  ShowPw,
  SubmitButton,
} from "./admin.login.styles";

import { _Title, _Input } from "mcm-js-commons";
import { Tooltip } from "mcm-js";

// import { getLibraries } from "src/main/commonsComponents/functional/modules";
// const { Tooltip } = getLibraries();

export default function AdminLoginUIPage({
  login,
  changeInfo,
  idRef,
  pwRef,
  showPw,
  toggleShowPw,
  checkInfo,
}: {
  login: (e?: FormEvent) => void;
  changeInfo: (text: string, type: string) => void;
  idRef: MutableRefObject<HTMLInputElement>;
  pwRef: MutableRefObject<HTMLInputElement>;
  showPw: boolean;
  toggleShowPw: () => void;
  checkInfo: () => boolean;
}) {
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
          <InputItems>
            {/* 아이디 입력창 */}
            <_Input
              onChangeEvent={(text) => changeInfo(text, "id")}
              placeHolder="관리자 아이디를 입력해주세요."
              maxLength={30}
              inputRef={idRef}
            />
          </InputItems>

          <InputItems>
            {/* 비밀번호 입력창 */}
            <_Input
              onChangeEvent={(text) => changeInfo(text, "password")}
              inputClassName="password-input"
              inputType={showPw ? "text" : "password"}
              placeHolder="관리자 비밀번호를 입력해주세요."
              maxLength={30}
              inputRef={pwRef}
            />
            <ShowPw buttonType="button" onClickEvent={toggleShowPw}>
              <Tooltip tooltipText={`비밀번호 ${showPw ? "가리기" : "보이기"}`}>
                {!showPw ? "🙈" : "🙉"}
              </Tooltip>
            </ShowPw>
          </InputItems>
        </InputWrapper>
        {/* 로그인 버튼 */}
        <SubmitButton onClickEvent={login} isSubmit={checkInfo()}>
          로그인
        </SubmitButton>
      </LoginForm>
    </LoginAlertWrapper>
  );
}

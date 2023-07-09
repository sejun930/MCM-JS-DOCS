import {
  InputWrapper,
  LoginAlertWrapper,
  LoginForm,
  Message,
  SubmitButton,
} from "./login.styles";

import { Modal } from "mcm-js";
import { _Title, _Input } from "mcm-js-commons";
import { FormEvent, MutableRefObject, useRef, useState } from "react";

import {
  getHashText,
  getDateForm,
} from "src/main/commonsComponents/functional";
import { adminLoginInfoData } from "./login.data";

let debouncing: number | ReturnType<typeof setTimeout>;
let loading = false; // 중복 클릭 방지
export default function AdminLoginPage({
  loginComplete,
}: {
  loginComplete: () => void;
}) {
  const idRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pwRef = useRef() as MutableRefObject<HTMLInputElement>;

  // 관리자 아이디 및 비밀번호 기입 정보 저장
  const [info, setInfo] = useState<{ id: string; password: string }>({
    id: "",
    password: "",
  });

  // 기입 정보 변경
  const changeInfo = (text: string, type: string) => {
    clearTimeout(debouncing);

    debouncing = setTimeout(() => {
      setInfo({ ...info, [type]: text.trim() });
    }, 200);
  };

  // 기입 정보 누락 체크
  const checkInfo = () => {
    return Boolean(info.id && info.password);
  };

  // 로그인
  const login = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (loading) return;

    // 에러 및 성공 메세지
    let msg: string | JSX.Element = "";
    // focus 이벤트
    let _focusEvent = () => {};

    const focusEvent: { [key: string]: () => void } = {
      id: () => {
        if (idRef?.current) {
          idRef.current.focus();
        }
      },
      password: () => {
        if (pwRef?.current) {
          pwRef.current.focus();
        }
      },
      success: () => {
        loading = false;
        loginComplete();
        Modal.close({ className: "admin-login-modal" });
      },
    };

    // 아이디 및 비밀번호가 누락되어 있을 경우
    if (!checkInfo()) {
      if (!info.id) {
        msg = "아이디를 입력해주세요.";
        _focusEvent = focusEvent.id;
      } else if (!info.password) {
        msg = "비밀번호를 입력해주세요.";
        _focusEvent = focusEvent.password;
      }
    } else {
      // 아이디 및 비밀번호 일치 확인
      const hashId = await getHashText(info.id); // 아이디 해쉬화
      const hashpw = await getHashText(info.password); // 비밀번화 해쉬화

      const now = new Date();
      // 현재 요일값 가져오기
      const currentWeek = now.getDay();
      // 어드민 로그인 정보 가져오기
      const adminInfo = adminLoginInfoData[currentWeek];

      if (hashId !== adminInfo.id) {
        // 아이디가 불일치 할 경우
        msg = "아이디가 일치하지 않습니다.";
        _focusEvent = focusEvent.id;
      } else if (hashpw !== adminInfo.password) {
        // 비밀번호가 불일치 할 경우
        msg = "비밀번호가 일치하지 않습니다.";
        _focusEvent = focusEvent.password;
      } else {
        loading = true;
        // 로그인 성공
        msg = `관리자로 로그인 되었습니다.<b>(${getDateForm({
          date: now,
          getDate: true,
        })})</b>`;
        _focusEvent = focusEvent.success;

        // 로그인 시간 저장하기
        localStorage.setItem("login-date", JSON.stringify(now));
        // accessToken 저장하기
        localStorage.setItem(
          "admin-accessToken",
          JSON.stringify(await getHashText(JSON.stringify(now)))
        );
      }
    }

    if (msg && _focusEvent) {
      Modal.open({
        children: <Message isSuccess={loading} dangerouslySetInnerHTML={msg} />,
        showBGAnimation: true,
        showModalOpenAnimation: true,
        modalSize: { width: "220px", height: `${loading ? 80 : 60}px` },
        mobileModalSize: { width: "220px", height: "60px" },
        onAfterCloseEvent: _focusEvent,
      });
    }
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
          {/* 아이디 입력창 */}
          <_Input
            onChangeEvent={(text) => changeInfo(text, "id")}
            placeHolder="관리자 아이디를 입력해주세요."
            maxLength={30}
            inputRef={idRef}
          />
          {/* 비밀번호 입력창 */}
          <_Input
            onChangeEvent={(text) => changeInfo(text, "password")}
            inputType="password"
            placeHolder="관리자 비밀번호를 입력해주세요."
            maxLength={30}
            inputRef={pwRef}
          />
        </InputWrapper>
        {/* 로그인 버튼 */}
        <SubmitButton onClickEvent={login} isSubmit={checkInfo()}>
          로그인
        </SubmitButton>
      </LoginForm>
    </LoginAlertWrapper>
  );
}

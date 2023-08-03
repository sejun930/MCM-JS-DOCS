import { Message } from "./admin.login.styles";
import { useState, useRef, MutableRefObject, FormEvent } from "react";
import { useRecoilState } from "recoil";
import { ipState } from "src/commons/store";

import { Modal } from "mcm-js";

import {
  getHashText,
  getUserIp,
  getDateForm,
} from "src/main/commonsComponents/functional";
import { getDoc, getServerTime } from "src/commons/libraries/firebase";

import AdminLoginUIPage from "./admin.login.presenter";
import { adminLoginInfoData } from "./admin.login.data";

let debouncing: number | ReturnType<typeof setTimeout>;
let loading = false; // 중복 클릭 방지
export default function AdminLoginPage({
  loginComplete,
}: {
  loginComplete: () => void;
}) {
  const [ip, setIp] = useRecoilState(ipState);

  const idRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pwRef = useRef() as MutableRefObject<HTMLInputElement>;

  // 관리자 아이디 및 비밀번호 기입 정보 저장
  const [info, setInfo] = useState<{ id: string; password: string }>({
    id: "",
    password: "",
  });
  // 비밀번호 가리기 여부
  const [showPw, setShowPw] = useState(false);

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

      console.log(process.env.NODE_ENV);

      if (hashId !== adminInfo.id || hashpw !== adminInfo.password) {
        // 아이디 & 비밀번호가 불일치 할 경우
        msg = "아이디 & 비밀번호 오류";
      } else {
        loading = true;

        let _ip = ip;
        if (!_ip) {
          try {
            // 유저 아이피 가져오기
            _ip = await getUserIp();
            setIp(ip);
          } catch (err) {
            msg = "아이피 조회에 실패하여 로그인이 불가능합니다.";
          }
        }

        if (_ip) {
          try {
            await getDoc("admin", "login", "log").add({
              loginTime: getServerTime(), // 로그인 시간
              ip: _ip, // 로그인 아이피
            });

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
          } catch (err) {
            msg = "관리자 로그인에 실패했습니다.";
            console.log(err);
          }
        }
      }
    }

    if (msg) {
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

  // 비밀번호 보이기 / 숨기기
  const toggleShowPw = () => {
    setShowPw((prev) => !prev);
  };

  return (
    <AdminLoginUIPage
      login={login}
      changeInfo={changeInfo}
      idRef={idRef}
      pwRef={pwRef}
      showPw={showPw}
      toggleShowPw={toggleShowPw}
      checkInfo={checkInfo}
    />
  );
}

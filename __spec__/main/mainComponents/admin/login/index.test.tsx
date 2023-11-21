import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import AdminLoginPage from "src/main/mainComponents/admin/login/admin.login.container";

let container: HTMLElement;

// 각각의 태그 정보들
const tagList: {
  idInput: null | HTMLInputElement;
  pwInput: null | HTMLInputElement;
  loginBtn: null | Element;
} = { idInput: null, pwInput: null, loginBtn: null };

// 관리자 로그인 홈페이지
describe("Admin Login Page", () => {
  // 비동기 함수 처리하는 mock 함수
  jest.mock("../../../../../src/main/commonsComponents/withAuth", () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve(true)), // Resolve with a mock value
  }));

  // 비동기 함수 처리 및 container 초기화
  beforeEach(async () => {
    container = render(
      <RecoilRoot>
        <AdminLoginPage loginComplete={() => {}} />
      </RecoilRoot>
    ).container;

    tagList.idInput = container.querySelector("#admin-id-input");
    tagList.pwInput = container.querySelector("#admin-pw-input");
    tagList.loginBtn = container.querySelector("#admin-login-btn");
  });

  // 스냅샷
  test("Admin Login Page - Snapshot", async () => {
    expect(container).toMatchSnapshot();
  });

  // 여러 태그 존재 여부 검사
  test("Admin Login Page - Check Elements", async () => {
    // wrapper 태그 존재 여부
    const wrapperEle = container.querySelector("#admin-login-wrapper");
    expect(wrapperEle).toBeInTheDocument();

    if (wrapperEle) {
      // 로그인 타이틀 존재 여부
      const titleEle = container.querySelector("#admin-login-title");
      expect(titleEle).toBeInTheDocument();

      // 아이디 입력창 존재 여부
      expect(tagList.idInput).toBeInTheDocument();
      // 비밀번호 입력창 존재 여부
      expect(tagList.pwInput).toBeInTheDocument();

      // 비밀번호 가리기/보이기 존재 여부
      const togglePw = container.querySelector("#admin-pw-toggle-btn");
      expect(togglePw).toBeInTheDocument();

      // 로그인 버튼 존재 여부
      expect(tagList.loginBtn).toBeInTheDocument();
    }
  });

  // 아이디 및 비밀번호가 비어져 있을 경우 모달 오픈 여부
  test("Admin Login Page - Check Empty ID or Password", () => {
    const { idInput, pwInput, loginBtn } = tagList;

    if (idInput && pwInput) {
      idInput.value = "";
      pwInput.value = "";

      // 아이디 및 비밀번호가 빈 값인지 체크
      expect(idInput).toHaveValue("");
      expect(pwInput).toHaveValue("");

      // 로그인 버튼 존재 여부 검사
      expect(loginBtn).toBeInTheDocument();

      // 로그인 버튼 클릭
      if (loginBtn) {
        fireEvent.click(loginBtn);

        // 아이디와 비밀번호 하나 중 입력이 안되어 있는 경우
        if (!idInput.value || !pwInput.value) {
          // 실패 모달이 오픈되어 있는지 체크
          const hasModal = document.body.querySelector(
            "#admin-login-fail-modal"
          );
          expect(hasModal).toBeInTheDocument();
          if (hasModal) hasModal.remove();
        }
      }
    }
  });
});

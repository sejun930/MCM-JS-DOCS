import { render, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import AdminMainHome from "src/main/mainComponents/admin";

let container: HTMLElement;
// 관리자 메인 홈페이지
describe("Admin Main Home Page", () => {
  // 비동기 함수 처리하는 mock 함수
  jest.mock("../../../../src/main/commonsComponents/withAuth", () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve(true)), // Resolve with a mock value
  }));

  // 비동기 함수 처리 및 container 초기화
  beforeEach(async () => {
    await act(async () => {
      container = (
        await render(
          <RecoilRoot>
            <AdminMainHome />
          </RecoilRoot>
        )
      ).container;
    });
  });

  // 스냅샷
  test("Admin Main Home Page - Snapshot", async () => {
    expect(container).toMatchSnapshot();
  });

  // withAuth 체크
  test("Admin Main Home Page - Check ID Selector", () => {
    const checkId = container.querySelector("#main-template-wrapper");
    expect(checkId).toBeInTheDocument();
  });
});

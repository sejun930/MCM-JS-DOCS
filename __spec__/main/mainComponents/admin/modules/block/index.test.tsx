import { render, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import AdminBlockPage from "src/main/mainComponents/admin/modules/block/block.container.tsx";

let container: HTMLElement;
// 차단 유저 관리 페이지
describe("Admin Block Page", () => {
  // 비동기 함수 처리하는 mock 함수
  jest.mock("../../../../../../src/main/commonsComponents/withAuth", () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve(true)), // Resolve with a mock value
  }));

  // window.alert을 사용할 수 있는 mock 함수
  jest.spyOn(window, "alert").mockImplementation(() => {});

  // location의 href 속성 함수로 정의하기
  Object.defineProperty(window, "location", {
    value: { href: "http://example.com" },
    writable: false,
  });

  // location의 reload 속성 함수로 정의하기
  Object.defineProperty(window.location, "reload", {
    writable: true,
    value: jest.fn().mockImplementation(() => {}),
  });

  // 비동기 함수 처리 및 container 초기화
  beforeEach(async () => {
    await act(async () => {
      container = (
        await render(
          <RecoilRoot>
            <AdminBlockPage />
          </RecoilRoot>
        )
      ).container;
    });
  });

  // 스냅샷
  test("Admin Block Page - Snapshot", async () => {
    expect(container).toMatchSnapshot();
  });

  // 유저 리스트 가져오기
  // test("Admin Block Page - Check Has Tags", async () => {
  //   expect(container).toMatchSnapshot();
  // });
});

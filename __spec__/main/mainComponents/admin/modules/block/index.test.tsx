import { render, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import { firebaseConfig } from "src/commons/libraries/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import AdminBlockPage from "src/main/mainComponents/admin/modules/block/block.container.tsx";
import blockApis from "src/commons/libraries/apis/block/block.apis";

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

    // 파이어베이스 초기 설정
    firebase.initializeApp(firebaseConfig);
  });

  jest.mock("src/commons/libraries/firebase", () => ({
    firestore: {
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          get: jest.fn(() =>
            Promise.resolve({
              exists: true,
              data: jest.fn(() => ({ yourData: "mockData" })),
            })
          ),
        })),
      })),
    },
  }));

  // 스냅샷
  test("Admin Block Page - Snapshot", async () => {
    expect(container).toMatchSnapshot();
  });

  // 태그 검증하기
  test("Admin Block Page - Check Has Tags", async () => {
    // wrapper 확인
    const wrapper = document.querySelector("#admin-block-wrapper");
    expect(wrapper).toBeInTheDocument();

    // option 섹션
    const optionWrapper = document.querySelector(
      "#admin-block-optional-wrapper"
    );
    expect(optionWrapper).toBeInTheDocument();

    if (optionWrapper) {
      // filter 확인
      const filterWrapper = document.querySelector(
        "#admin-block-filter-wrapper"
      );
      expect(filterWrapper).toBeInTheDocument();
    }

    // list 섹션
    const listWrapper = document.querySelector("#admin-block-list-wrapper");
    expect(listWrapper).toBeInTheDocument();
  });

  // 차단된 회원 정보 가져오기
  test("Admin Block Page - Get User List", async () => {
    // Block 관련 파이어베이스 doc 가져오기
    await act(async () => {
      const blockResult = await blockApis().get();
      console.log(blockResult);
      // let doc = await getDoc("block", "user", "ip");
      // console.log((await doc.get()).size);
    });

    // 차단된 유저 정보 조회 후 데이터 결과 저장
  }, 50000);
});

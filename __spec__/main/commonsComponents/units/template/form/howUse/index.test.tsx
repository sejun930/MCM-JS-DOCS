import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";

import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";
import { useRouter } from "next/router";

// 가짜 router 만들기
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

export default describe("HowUse Template Page", () => {
  // 스냅샷
  test("HowUse Template Page - Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <_HowUseForm />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});

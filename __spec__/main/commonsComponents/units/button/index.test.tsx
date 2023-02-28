import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import _Button from "src/main/commonsComponents/units/button";
import { useRouter } from "next/router";

// 가짜 router 만들기
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

export default it("Button Units Page Sanpshot", () => {
  const component = render(
    <_Button onClickEvent={() => console.log("버튼 클릭")} className="jest_btn">
      버튼 테스트
    </_Button>
  );
  // @ts-ignore
  expect(component.container).toMatchSnapshot();
});

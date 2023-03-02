import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import _Title from "src/main/commonsComponents/units/title";
import { useRouter } from "next/router";

// 가짜 router 만들기
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

export default it("Title Units Page Sanpshot", () => {
  const component = render(
    <_Title
      title="타이틀 테스트"
      titleLevel="h2"
      className="_jest_title_"
      styles={{ color: "blue" }}
    />
  );
  // @ts-ignore
  expect(component.container).toMatchSnapshot();
});

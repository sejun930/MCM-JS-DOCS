import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import MainHomePage from "src/main/mainComponents";
import { useRouter } from "next/router";

// 가짜 router 만들기
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

export default it("Modal Page Sanpshot", () => {
  const component = render(<MainHomePage />);
  // @ts-ignore
  expect(component.container).toMatchSnapshot();
});

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import _SpanText from "src/main/commonsComponents/units/text/span";
import { useRouter } from "next/router";

// 가짜 router 만들기
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

export default it("Text Span Tag Units Page Sanpshot", () => {
  const component = render(
    <_SpanText
      text="span 태그 테스트"
      className="_jest_span_text_"
      styles={{ color: "red" }}
    />
  );
  // @ts-ignore
  expect(component.container).toMatchSnapshot();
});

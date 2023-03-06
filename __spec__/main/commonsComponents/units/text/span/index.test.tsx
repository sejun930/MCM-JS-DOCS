import { render } from "@testing-library/react";
import _SpanText from "src/main/commonsComponents/units/text/span";

export default describe("Text Span tag Units Page Jest", () => {
  // 스냅샷
  test("Text Span Tag Units Page - Sanpshot", () => {
    const { container } = render(
      <_SpanText
        text="span 태그 테스트"
        className="_jest_span_text_"
        styles={{ color: "red" }}
      />
    );
    // @ts-ignore
    expect(container).toMatchSnapshot();
  });

  //
  test("Text Span Tag Units Page - Check has span tag", () => {
    const { container, getByText } = render(
      <_SpanText
        text="span 태그 테스트"
        className="_jest_span_text_"
        styles={{ color: "red" }}
      />
    );

    const spanEle = container.querySelector("span");
    expect(spanEle).toBeInTheDocument(); // span 태그가 있는지 검증

    if (spanEle) {
      expect(getByText("span 태그 테스트")).toBeTruthy();
      // const spanText = screen.getByText("span 태그 테스트");
      // expect(spanText).toBeInTheDocument(); // 텍스트가 존재하는지 검증
      expect(spanEle).toHaveClass("_jest_span_text_"); // 클래스가 있는지 검증
      expect(spanEle).toHaveStyle("color : red"); // 스타일이 있는지 검증
    }
  });
});

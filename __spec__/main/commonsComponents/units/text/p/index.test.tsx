import { render, screen } from "@testing-library/react";
import _PText from "src/main/commonsComponents/units/text/p";

export default describe("Text P tag Units Page Jest", () => {
  // P 태그 스냅샷
  test("Text P Tag Units Page - Sanpshot", () => {
    const { container } = render(
      <_PText
        text="p 태그 테스트"
        className="_jest_p_text_"
        styles={{ color: "red" }}
      />
    );
    // @ts-ignore
    expect(container).toMatchSnapshot();
  });

  // P 태그 존재여부 검증
  test("Text P Tag Units Page - Check has P Tag", () => {
    const { container } = render(
      <_PText
        text="p 태그 테스트"
        className="_jest_p_text_"
        styles={{ color: "red" }}
      />
    );
    const pEle = container.querySelector("._jest_p_text_");
    expect(pEle).toBeInTheDocument(); // P 태그가 있는지 검증

    if (pEle) {
      const checkText = screen.getByText("p 태그 테스트");
      expect(checkText).toBeInTheDocument(); // 텍스트가 존재하는지 검증

      expect(pEle).toHaveClass("_jest_p_text_"); // 클래스가 있는지 검증
      expect(pEle).toHaveStyle("color: red"); // 스타일 일치하는지 검증
    }
  });
});

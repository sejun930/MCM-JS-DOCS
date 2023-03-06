import { render } from "@testing-library/react";
import _Title from "src/main/commonsComponents/units/title";

export default describe("Text Span tag Units Page Jest", () => {
  // 스냅샷
  test("Title Units Page - Sanpshot", () => {
    const { container } = render(
      <_Title
        title="타이틀 테스트"
        titleLevel="h2"
        className="_jest_title_"
        styles={{ color: "blue", fontSize: "20px" }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("Title Units Page - Check has h1 tag", () => {
    const { container } = render(<_Title title="타이틀 테스트" />);
    const h1Ele = container.querySelector("h1");
    expect(h1Ele).toBeInTheDocument(); // h1 태그가 존재하는지 검증
  });

  test("Title Units Page - Check has h2 tag", () => {
    const { container } = render(
      <_Title title="타이틀 테스트" titleLevel="h2" />
    );
    const h2Ele = container.querySelector("h2");
    expect(h2Ele).toBeInTheDocument(); // h2 태그가 존재하는지 검증
  });

  test("Title Units Page - Check has option", () => {
    const { container } = render(
      <_Title
        title="타이틀 테스트"
        titleLevel="h3"
        className="_jest_title_3_"
        styles={{ color: "blue", fontSize: "20px" }}
      />
    );
    const h3Ele = container.querySelector("h3");
    expect(h3Ele).toBeInTheDocument(); // h3 태그가 존재하는지 검증

    if (h3Ele) {
      // expect(getByText("타이틀 테스트")).toBeTruthy();
      // const h3Text = screen.getByText("타이틀 테스트");
      // expect(h3Text).toBeInTheDocument(); // title이 존재하는지 검증
      expect(h3Ele).toHaveStyle("color : blue; font-size : 20px"); // 스타일이 존재하는지 검증
      expect(h3Ele).toHaveClass("_jest_title_3_"); // 클래스가 존재하는지 검증
    }
  });
});

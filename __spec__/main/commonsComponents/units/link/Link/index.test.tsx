import { render } from "@testing-library/react";
import _Link from "src/main/commonsComponents/units/link/Link";

export default describe("Link Tag Page", () => {
  // 스냅샷
  test("Link Page - Snapshot", () => {
    const { container } = render(
      <_Link href="/modules/modal">모달로 이동하기</_Link>
    );
    expect(container).toMatchSnapshot();
  });

  // Link(a) 태그가 있는지 검증
  test("Link Page - Check have a tag", () => {
    const { container } = render(
      <_Link href="/modules/modal" className="_link_jest_">
        모달로 이동하기
      </_Link>
    );

    const aEle = container.querySelector("._link_jest_");
    expect(aEle).toBeInTheDocument(); // a 태그 존재여부 검증
  });

  // href, className 속성이 존재하는지 검증
  test("Link Page - Check have href in a tag", () => {
    const { container } = render(
      <_Link href="/modules/modal" className="_link_jest_">
        모달로 이동하기
      </_Link>
    );

    const aEle = container.querySelector("._link_jest_");
    if (aEle) {
      expect(aEle).toHaveAttribute("href", "/modules/modal");
      expect(aEle).toHaveClass("_link_ _link_jest_");
    }
  });

  // <button>모달로 이동하기</button> 태그가 존재하는지 검증
  test("Link Page - Check have button tag in a tag", () => {
    const { container, getByText } = render(
      <_Link href="/modules/modal">
        <button className="_link_btn_">모달로 이동하기</button>
      </_Link>
    );

    // 버튼 태그 존재 여부 검증
    const btnEle = container.querySelector("._link_btn_");
    expect(btnEle).toBeInTheDocument();

    // 텍스트 검증하기
    expect(getByText("모달로 이동하기")).toBeTruthy();
  });
});

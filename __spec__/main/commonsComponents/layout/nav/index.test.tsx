import { render } from "@testing-library/react";
import LayoutNavPage from "src/main/commonsComponents/layout/nav";

export default describe("Layout Nav Page", () => {
  // 스냅샷
  test("Layout Nav Page - Snapshot", () => {
    const { container } = render(<LayoutNavPage />);
    expect(container).toMatchSnapshot();
  });

  // tap (a, p Tag)가 제대로 동작하는지 검증
  test("Layout Nav Page - Snapshot", () => {
    const { container } = render(<LayoutNavPage />);

    const listEle = container.querySelector("._layout_nav_list_");
    expect(listEle).toBeInTheDocument();

    // list가 존재하는지 검증
    if (listEle) {
      const aEle = listEle.querySelector("._tap_");
      expect(aEle).toBeInTheDocument(); // a 태그가 존재하는지 검증

      if (aEle) {
        expect(aEle).toHaveAttribute("href", "/modules/modal");
        const pEle = aEle.querySelector("._tap_name_");

        expect(pEle).toBeInTheDocument();
      }
    }
  });
});

import { render } from "@testing-library/react";
import LayoutHeadPage from "src/main/commonsComponents/layout/header";

export default describe("Layout Header Page", () => {
  // 스냅샷
  test("Layout Header Page - Snapshot", () => {
    const { container } = render(<LayoutHeadPage />);
    expect(container).toMatchSnapshot();
  });

  // 모든 태그가 다 존재하는지 검증
  test("Layout Header Page - Snapshot", () => {
    const { container } = render(<LayoutHeadPage />);
    expect(container).toMatchSnapshot();

    // 전체 태그를 감싸는 상위 부모 태그가 있는지 검증
    const wrapperEle = container.querySelector("._layout_header_wrapper_");
    expect(wrapperEle).toBeInTheDocument();

    if (wrapperEle) {
      // link 컴포넌트가 존재하는지 검증
      const linkEle = wrapperEle.querySelector("._layout_header_link_");
      expect(linkEle).toBeInTheDocument(); // 있는지 검증

      if (linkEle) {
        expect(linkEle).toHaveAttribute("href", "/"); // 주소 검증

        // img 태그가 있는지 검증
        const imgEle = linkEle.querySelector("._layout_header_logo_");
        expect(imgEle).toBeInTheDocument();
        expect(imgEle).toHaveAttribute(
          "src",
          "/images/commons/logo/MCM_white_logo.png"
        );
      }
    }
  });
});

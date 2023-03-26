import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import LayoutNavPage from "src/main/commonsComponents/layout/nav";

export default describe("Layout Nav Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <LayoutNavPage />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });

  // 검색 (Search), 리스트 (List) 컴포넌트 존재 여부 검증
  test("Check Search and List component in Nav Page", () => {
    const { container } = render(
      <RecoilRoot>
        <LayoutNavPage />
      </RecoilRoot>
    );

    // 검색 컴포넌트 존재 검증
    const searchEle = container.querySelector(".nav-search-wrapper");
    expect(searchEle).toBeInTheDocument();

    // 리스트 컴포넌트 존재 검증
    const listEle = container.querySelector(".nav-list-wrapper");
    expect(listEle).toBeInTheDocument();
  });
});

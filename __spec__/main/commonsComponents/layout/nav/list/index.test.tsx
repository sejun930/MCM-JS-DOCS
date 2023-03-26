import { render } from "@testing-library/react";
import NavListPage from "src/main/commonsComponents/layout/nav/list";
import { navList } from "src/main/commonsComponents/layout/nav/nav.data";

export default describe("Layout Nav List Page", () => {
  // 스냅샷 : isSelect={false}
  test("Snapshot : isSelect=false", () => {
    const { container } = render(
      <NavListPage list={navList} isSelect={false} />
    );
    expect(container).toMatchSnapshot();
  });

  // 스냅샷 : isSelect={true}
  test("Snapshot : isSelect=true", () => {
    const { container } = render(
      <NavListPage list={navList} isSelect={true} />
    );
    expect(container).toMatchSnapshot();
  });

  // wrapper 존재 여부 검증
  test("Check wrapper", () => {
    const { container } = render(
      <NavListPage list={navList} isSelect={false} />
    );

    const wrapperEle = container.querySelector(".nav-list-wrapper");
    expect(wrapperEle).toBeInTheDocument();
  });

  // isSelect가 true일 경우 wrapper 존재 여부와 클래스값 검증
  test("Check wrapper if isSelect is true", () => {
    const { container } = render(
      <NavListPage list={navList} isSelect={true} />
    );

    const wrapperEle = container.querySelector(".nav-list-wrapper");
    expect(wrapperEle).toBeInTheDocument();
    expect(wrapperEle).toHaveClass("nav-list-select-wrapper");
  });

  // search가 있을 경우 keyword classname 검증
  test("Check search keywrod", () => {
    const { container } = render(
      <NavListPage list={navList} isSelect={false} search="test" />
    );

    const wrapperEle = container.querySelector(".nav-list-wrapper");
    expect(wrapperEle).toBeInTheDocument();

    const spanEle = wrapperEle?.querySelector(".mcm-span-unit");
    expect(spanEle).toBeInTheDocument();

    expect(spanEle?.innerHTML).toBe("Modal");
  });
});

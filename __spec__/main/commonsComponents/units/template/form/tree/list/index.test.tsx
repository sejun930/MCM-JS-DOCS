import { render } from "@testing-library/react";

import { modalTreeList } from "src/main/mainComponents/modules/modal/tree/modal.tree";
import ModuleTreeListPage from "src/main/commonsComponents/units/template/form/tree/list";

export default describe("Tree List Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <ModuleTreeListPage
        treeList={modalTreeList}
        select={0}
        selectTree={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // wrapper 및 copy가 있는지 검증
  test("Check wrapper and copy", () => {
    const { container } = render(
      <ModuleTreeListPage
        treeList={modalTreeList}
        select={0}
        selectTree={() => {}}
      />
    );

    const wrapperEle = container.querySelector(".tree-list-wrapper");
    expect(wrapperEle).toBeInTheDocument();

    if (wrapperEle) {
      const copyEle = wrapperEle.querySelector(".tree-list");
      expect(copyEle).toBeInTheDocument();
    }
  });
});

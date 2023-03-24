import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import LayoutPage from "src/main/commonsComponents/layout";

export default describe("Layout Home Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <LayoutPage>
          <div>레아이웃 페이지입니다.</div>
        </LayoutPage>
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});

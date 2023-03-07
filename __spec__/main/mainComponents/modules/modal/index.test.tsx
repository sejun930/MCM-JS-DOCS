import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import MyModal from "src/main/mainComponents/modules/modal";

export default describe("Modal Module Page", () => {
  // 스냅샷
  test("Modal Module Page - Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <MyModal />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});

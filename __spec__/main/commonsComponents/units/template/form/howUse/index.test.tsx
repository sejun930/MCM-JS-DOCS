import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";

export default describe("HowUse Template Page", () => {
  // 스냅샷
  test("HowUse Template Page - Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <_HowUseForm />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});

import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import _ExampleOptionalFormPage from "src/main/commonsComponents/units/template/form/example/optional";

export default describe("Example Optional", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <_ExampleOptionalFormPage
          code="<span></span>"
          codeIdx={0}
          content="테스트 코드"
          isOpen={false}
          changeOpenList={() => {}}
        />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});

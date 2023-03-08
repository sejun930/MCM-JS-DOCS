import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import MyModalExample from "src/main/mainComponents/modules/modal/example/modal.example.template";
import { modalExampleInitProps } from "src/main/mainComponents/modules/modal/example/modal.example.render.data";

export default describe("Modal Example Page", () => {
  // 스냅샷
  test("Modal Example Page - Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <MyModalExample
          info={{ idx: 1, buttonName: "클릭하세요." }}
          commonsProps={{
            isShow: [false],
            openModal: () => () => {},
            closeModal: () => () => {},
          }}
          addProps={modalExampleInitProps}
        >
          <></>
        </MyModalExample>
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});

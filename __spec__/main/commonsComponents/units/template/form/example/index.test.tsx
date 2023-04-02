import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import _ExampleForm from "src/main/commonsComponents/units/template/form/example/template.example.container";

import {
  modalExampleList,
  modalExampleInitProps,
} from "src/main/mainComponents/modules/modal/example/modal.example.render.data";

const commonsProps = {
  isShow: [false, false],
  openModal: (_: number) => () => {},
  closeModal: (_: number) => () => {},
};

export default describe("Example Template Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <_ExampleForm
          exampleList={modalExampleList}
          initProps={modalExampleInitProps}
          commonsProps={commonsProps}
        />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });

  // h2 태그와 사용 예시 텍스트 검증
  test("Check have h2 tag", () => {
    const { container } = render(
      <RecoilRoot>
        <_ExampleForm
          exampleList={modalExampleList}
          initProps={modalExampleInitProps}
          commonsProps={commonsProps}
        />
      </RecoilRoot>
    );
    const h2WrapperEle = container.getElementsByClassName("subTitle-Template");
    const h2Ele = h2WrapperEle[0]?.querySelector(
      ".subTitle"
    ) as HTMLHeadingElement;

    if (h2Ele) {
      // h2 태그 존재 여부 검증
      expect(h2Ele).toBeInTheDocument();

      // 사용 예시 텍스트 검증
      expect(h2Ele.textContent).toEqual("📝 Example");
    }
  });
});

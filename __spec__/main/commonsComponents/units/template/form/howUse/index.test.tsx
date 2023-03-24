import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import { modalCodeList } from "src/main/mainComponents/modules/modal/example/modal.example.code.data";
import _HowUseForm from "src/main/commonsComponents/units/template/form/howUse";

export default describe("HowUse Template Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <_HowUseForm code={modalCodeList.basic} exmapleContents={<div></div>} />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });

  // h2, p 태그 검증하기
  test("Check have h2", () => {
    const { container } = render(
      <RecoilRoot>
        <_HowUseForm code={modalCodeList.basic} exmapleContents={<div></div>} />
      </RecoilRoot>
    );

    const subTitleEl = container.querySelector(".subTitle-Template");
    const h2Ele = subTitleEl?.querySelector(".subTitle") as HTMLHeadingElement;

    // h2 태그 존재여부 판단
    expect(h2Ele).toBeInTheDocument();
    expect(h2Ele.textContent).toEqual("🔍 사용 방법");

    // const codeWrapper = getByRole("code-wrapper");
  });
});

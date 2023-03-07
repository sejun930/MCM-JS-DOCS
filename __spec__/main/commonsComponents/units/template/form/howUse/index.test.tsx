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

  // h2, p 태그 검증하기
  test("HowUse Template Page - Check have h2, p tag", () => {
    const { container, getByRole } = render(
      <RecoilRoot>
        <_HowUseForm />
      </RecoilRoot>
    );

    const subTitleEl = container.getElementsByClassName("_subTitleTemplate_");
    const h2Ele = subTitleEl[0]?.querySelector(
      "._howUse_Title_"
    ) as HTMLHeadingElement;

    // h2 태그 존재여부 판단
    if (h2Ele) {
      expect(h2Ele).toBeInTheDocument();
      expect(h2Ele.innerText).toEqual("🔍 사용 방법");
    }

    const codeWrapper = getByRole("code-wrapper");
    if (codeWrapper) {
      // p 태그 존재여부 판단
      const pEle = codeWrapper.querySelector("._howUse_example_notice_");

      expect(pEle).toBeInTheDocument();
      expect(pEle?.textContent).toEqual(
        "기본값으로 사용할 수 있는 예시 코드입니다."
      );
    }
  });
});

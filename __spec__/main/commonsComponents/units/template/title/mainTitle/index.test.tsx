import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import _MainTitleTemplate from "src/main/commonsComponents/units/template/title/mainTitle";

export default describe("mainTitle Template Page", () => {
  // 스냅샷
  test("mainTitle Template Page - Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <_MainTitleTemplate />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });

  // h1 태그 존재 여부 확인
  test("mainTitle Template Page - Check have h1 and p tag", () => {
    const { container } = render(
      <RecoilRoot>
        <_MainTitleTemplate />
      </RecoilRoot>
    );

    // h1, p 태그를 감싸는 wrapper 태그 존재여부 검증
    const wrapperEle = container.querySelector("._main_title_wrapper_");
    expect(wrapperEle).toBeInTheDocument();

    if (wrapperEle) {
      // h1 태그 있는지 검증
      const h1Ele = wrapperEle.querySelector("._main_title_");
      expect(h1Ele).toBeInTheDocument();

      // p 태그 있는지 검증
      const pEle = wrapperEle.querySelector("._main_title_remarks_");
      expect(pEle).toBeInTheDocument();
    }
  });
});

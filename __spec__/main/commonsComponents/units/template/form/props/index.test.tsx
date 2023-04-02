import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import _PropsForm from "src/main/commonsComponents/units/template/form/props";

export default describe("Props Template Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <_PropsForm />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });

  // h2 태그 검증
  test("Check h2 tag", () => {
    const { container } = render(
      <RecoilRoot>
        <_PropsForm />
      </RecoilRoot>
    );

    const h2Ele = container.querySelector(".subTitle");
    expect(h2Ele).toBeInTheDocument();

    // h2 태그와 텍스트 검증
    if (h2Ele) {
      expect(h2Ele.textContent).toEqual("📤 Props List");
    }

    const remarksEle = container.querySelector(".subTitle-remarks");
    expect(remarksEle).toBeInTheDocument();

    // remarks 텍스트 검증
    if (remarksEle) {
      expect(remarksEle.textContent).toEqual(
        "Props들을 이용해 원하는 모듈을 조립해보세요."
      );
    }
  });

  // props list 페이지가 존재하는지 검증
  test("Check props list wrapper", () => {
    const { container } = render(
      <RecoilRoot>
        <_PropsForm />
      </RecoilRoot>
    );

    const listWrapper = container.querySelector(".props-empty-list-wrapper");
    expect(listWrapper).toBeInTheDocument();
  });
});

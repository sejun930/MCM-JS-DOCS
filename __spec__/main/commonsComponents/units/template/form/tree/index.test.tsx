import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import _TreeForm from "src/main/commonsComponents/units/template/form/tree";

export default describe("Tree Template Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <RecoilRoot>
        <_TreeForm />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });

  // subTitle 태그의 존재여부 검증
  test("Check h2 tag and p tag", () => {
    const { container } = render(
      <RecoilRoot>
        <_TreeForm />
      </RecoilRoot>
    );

    const wrapperEle = container.querySelector(".tree-subTitle ");
    const h2Ele = wrapperEle?.querySelector(".mcm-title-unit");
    expect(h2Ele).toBeInTheDocument();

    if (h2Ele) {
      expect(h2Ele.textContent).toEqual("📂 Module Tree");
    }

    const remarksEle = container.querySelector(".subTitle-remarks");
    expect(remarksEle).toBeInTheDocument();

    if (remarksEle) {
      expect(remarksEle.textContent).toEqual(
        "모듈의 구조 안의 각각의 태그들이 어떤 역할을 하고 있는지 태그를 클릭해보세요."
      );
    }
  });

  // list, detail 페이지가 있는지를 검증
  test("Check list and detail wrapper page", () => {
    const { container } = render(
      <RecoilRoot>
        <_TreeForm />
      </RecoilRoot>
    );

    // list 페이지가 있는지 검증
    const listWrapperEle = container.querySelector(".tree-list-wrapper");
    expect(listWrapperEle).toBeInTheDocument();

    // detail 페이지가 있는지 검증
    const detailWrapperEle = container.querySelector(".tree-detail-wrapper");
    expect(detailWrapperEle).toBeInTheDocument();
  });
});

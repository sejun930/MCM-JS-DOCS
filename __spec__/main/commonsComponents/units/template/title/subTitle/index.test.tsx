import { render } from "@testing-library/react";

import _SubTitleTemplate from "src/main/commonsComponents/units/template/title/subTitle";

export default describe("subTitle Template Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <_SubTitleTemplate title="서브타이틀 테스트">
        <span>내용</span>
      </_SubTitleTemplate>
    );
    expect(container).toMatchSnapshot();
  });

  // h2 태그 여부 확인 및 텍스트 검증
  test("Check have h2 tag and title", () => {
    const { container } = render(
      <_SubTitleTemplate title="How To Use">
        <span className="contents">내용</span>
      </_SubTitleTemplate>
    );

    // h2 태그를 감싸고 있는 wrapper의 존재여부 검증
    const wrapperEle = container.querySelector(".subTitle-Template");
    expect(wrapperEle).toBeInTheDocument();

    // Wrapper안에 h2태그 존재 여부 검증
    const h2Ele = wrapperEle?.querySelector(".subTitle") as HTMLHeadingElement;
    expect(h2Ele).toBeInTheDocument();

    if (h2Ele) {
      expect(h2Ele.textContent).toEqual("🔍 How To Use"); // 타이틀 검증
    }
  });

  // wrapper 안에 img 태그 존재 여부 검증
  test("Check have img tag in wrapper", () => {
    const { container } = render(
      <_SubTitleTemplate title="How To Use">
        <img
          alt=""
          src="/images/commons/logo/MCM_main_logo.png"
          className="img"
        />
      </_SubTitleTemplate>
    );

    // h2 태그를 감싸고 있는 wrapper의 존재여부 검증
    const wrapperEle = container.querySelector(".subTitle-Template");
    expect(wrapperEle).toBeInTheDocument();

    if (wrapperEle) {
      // img 태그 존재 여부 검증
      const imgEle = wrapperEle.querySelector(".img");
      expect(imgEle).toBeInTheDocument();
      expect(imgEle).toHaveClass("img");
      expect(imgEle).toHaveAttribute(
        "src",
        "/images/commons/logo/MCM_main_logo.png"
      );
    }
  });
});

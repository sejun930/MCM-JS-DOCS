import { render } from "@testing-library/react";

import _SubTitleTemplate from "src/main/commonsComponents/units/template/title/subTitle";

export default describe("subTitle Template Page", () => {
  // 스냅샷
  test("subTitle Template Page - Snapshot", () => {
    const { container } = render(
      <_SubTitleTemplate title="서브타이틀 테스트">
        <div>내용</div>
      </_SubTitleTemplate>
    );
    expect(container).toMatchSnapshot();
  });

  // h2 태그 여부 확인 및 텍스트 검증
  test("subTitle Template Page - Check have h2 tag and title", () => {
    const { container } = render(
      <_SubTitleTemplate title="사용 방법">
        <div className="contents">내용</div>
      </_SubTitleTemplate>
    );

    // h2 태그를 감싸고 있는 wrapper의 존재여부 검증
    const wrapperEle = container.querySelector("._subTitleTemplate_");
    expect(wrapperEle).toBeInTheDocument();

    // Wrapper안에 h2태그 존재 여부 검증
    const h2Ele = wrapperEle?.querySelector(
      "._subTitle_"
    ) as HTMLHeadingElement;
    expect(h2Ele).toBeInTheDocument();

    if (h2Ele) {
      expect(h2Ele.innerText).toEqual("🔍 사용 방법"); // 타이틀 검증
    }
  });

  // wrapper 안에 img 태그 존재 여부 검증
  test("subTitle Template Page - Check have img tag in wrapper", () => {
    const { container } = render(
      <_SubTitleTemplate title="사용 방법">
        <img
          alt=""
          src="/images/commons/logo/MCM_main_logo.png"
          className="img"
        />
      </_SubTitleTemplate>
    );

    // h2 태그를 감싸고 있는 wrapper의 존재여부 검증
    const wrapperEle = container.querySelector("._subTitleTemplate_");
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

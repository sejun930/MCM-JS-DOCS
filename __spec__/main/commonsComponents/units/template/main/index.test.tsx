import { render } from "@testing-library/react";
import { _Title } from "mcm-js-commons";

import Template from "src/main/commonsComponents/units/template/main";

export default describe("Main Template Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(<Template>메인 템플릿 페이지</Template>);
    expect(container).toMatchSnapshot();
  });

  // main 태그가 존재하는 여부 검증
  test("Check main tag in Template Components", () => {
    const { container } = render(<Template>메인 템플릿 페이지</Template>);

    // main 태그 존재 여부 검증
    const mainEle = container.querySelector(".main-template-wrapper");
    expect(mainEle).toBeInTheDocument();
  });

  // <div>메인 템플릿 페이지</div>가 children으로 존재하는지에 대한 여부 검증
  test("Check div tag in Template Components", () => {
    const { container, getByText } = render(
      <Template>
        <div className="main-template-contents">메인 템플릿 페이지</div>
      </Template>
    );

    // main 태그 존재 여부 검증
    const mainEle = container.querySelector(".main-template-wrapper");
    expect(mainEle).toBeInTheDocument();

    // div 태그 존재 여부 검증
    const divEle = container.querySelector(".main-template-contents");
    expect(divEle).toBeInTheDocument();

    // main 태그 안에 div 태그가 존재하는지를 검증
    const divEleInMainEle = mainEle?.querySelector(".main-template-contents");
    expect(divEleInMainEle).toBeInTheDocument();

    // 메인 템플릿 페이지 텍스트 확인
    expect(getByText("메인 템플릿 페이지")).toBeTruthy();
  });

  // Title 컴포넌트가 children으로 사용중인지 여부 검증
  test("Check Title Component in Template Components", () => {
    const { container } = render(
      <Template>
        <_Title titleLevel="h2" className="main-template-title">
          메인 템플릿 페이지
        </_Title>
      </Template>
    );

    // main 태그 존재 여부 검증
    const mainEle = container.querySelector(".main-template-wrapper");
    expect(mainEle).toBeInTheDocument();

    // h2 태그 확인하기
    const h2Ele = container.querySelector(
      ".main-template-title"
    ) as HTMLHeadingElement;
    expect(h2Ele).toBeInTheDocument();

    // main 태그 안에 h2 태그 존재 여부 검증
    const h2EleInMainEle = mainEle?.querySelector(
      ".main-template-title"
    ) as HTMLHeadingElement;
    expect(h2EleInMainEle).toBeInTheDocument();
    if (h2EleInMainEle) {
      expect(h2EleInMainEle).toHaveClass("mcm-title-unit main-template-title"); // 클래스 값 검증
      expect(h2EleInMainEle.textContent).toEqual("메인 템플릿 페이지");
    }
  });
});

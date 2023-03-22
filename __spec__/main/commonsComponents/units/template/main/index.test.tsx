import { render } from "@testing-library/react";
import { _Title } from "mcm-js-commons";

import Template from "src/main/commonsComponents/units/template/main";

export default describe("Main Template Page", () => {
  // 스냅샷
  test("Main Template Page - Snapshot", () => {
    const { container } = render(<Template>메인 템플릿 페이지</Template>);
    expect(container).toMatchSnapshot();
  });

  // main 태그가 존재하는 여부 검증
  test("Main Template Page - Check main tag in Template Components", () => {
    const { container } = render(<Template>메인 템플릿 페이지</Template>);

    // main 태그 존재 여부 검증
    const mainEle = container.querySelector("._main_template_wrapper_");
    expect(mainEle).toBeInTheDocument();
  });

  // <div>메인 템플릿 페이지</div>가 children으로 존재하는지에 대한 여부 검증
  test("Main Template Page - Check div tag in Template Components", () => {
    const { container, getByText } = render(
      <Template>
        <div className="_main_template_contents_">메인 템플릿 페이지</div>
      </Template>
    );

    // main 태그 존재 여부 검증
    const mainEle = container.querySelector("._main_template_wrapper_");
    expect(mainEle).toBeInTheDocument();

    // div 태그 존재 여부 검증
    const divEle = container.querySelector("._main_template_contents_");
    expect(divEle).toBeInTheDocument();

    // main 태그 안에 div 태그가 존재하는지를 검증
    const divEleInMainEle = mainEle?.querySelector("._main_template_contents_");
    expect(divEleInMainEle).toBeInTheDocument();

    // 메인 템플릿 페이지 텍스트 확인
    expect(getByText("메인 템플릿 페이지")).toBeTruthy();
  });

  // Title 컴포넌트가 children으로 사용중인지 여부 검증
  test("Main Template Page - Check Title Component in Template Components", () => {
    const { container } = render(
      <Template>
        <_Title
          title="메인 템플릿 페이지"
          titleLevel="h2"
          className="_main_template_title_"
        />
      </Template>
    );

    // main 태그 존재 여부 검증
    const mainEle = container.querySelector("._main_template_wrapper_");
    expect(mainEle).toBeInTheDocument();

    // h2 태그 확인하기
    const h2Ele = container.querySelector(
      "._main_template_title_"
    ) as HTMLHeadingElement;
    expect(h2Ele).toBeInTheDocument();

    // main 태그 안에 h2 태그 존재 여부 검증
    const h2EleInMainEle = mainEle?.querySelector(
      "._main_template_title_"
    ) as HTMLHeadingElement;
    expect(h2EleInMainEle).toBeInTheDocument();

    if (h2EleInMainEle) {
      expect(h2EleInMainEle).toHaveClass("_title_ _main_template_title_"); // 클래스 값 검증
      expect(h2EleInMainEle.innerText).toEqual("메인 템플릿 페이지");
    }
  });
});

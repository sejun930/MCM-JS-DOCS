import { fireEvent, render } from "@testing-library/react";

import { modalTreeList } from "src/main/mainComponents/modules/modal/tree/modal.tree";
import ModuleTreeDetailPage from "src/main/commonsComponents/units/template/form/tree/detail";

export default describe("Tree Detail Page", () => {
  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <ModuleTreeDetailPage
        treeList={modalTreeList}
        select={0}
        selectTree={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // 아무것도 선택하지 않았을 때의 empty wrapper 검증
  test("Check has Empty Wrapper", () => {
    const { container } = render(
      <ModuleTreeDetailPage
        treeList={modalTreeList}
        select={-1}
        selectTree={() => {}}
      />
    );
    expect(container).toMatchSnapshot();

    const wrapperEle = container.querySelector(".tree-detail-empty-select");
    expect(wrapperEle).toBeInTheDocument();

    if (wrapperEle) {
      const pEle = wrapperEle.querySelector(".mcm-p-unit");
      expect(pEle).toBeInTheDocument();

      if (pEle) {
        expect(pEle.textContent).toEqual("태그를 클릭해보세요.");
      }
    }
  });

  // 태그를 선택했을 때의 태그들 검증
  test("Check has Empty Wrapper", () => {
    const handleClick = jest.fn();

    const { container } = render(
      <ModuleTreeDetailPage
        treeList={modalTreeList}
        select={1}
        selectTree={handleClick}
      />
    );

    const wrapperEle = container.querySelector(".tree-detail-contents-wrapper");
    expect(wrapperEle).toBeInTheDocument();

    const titleWrapperEle = wrapperEle?.querySelector(
      ".tree-detail-title-wrapper"
    );
    expect(titleWrapperEle).toBeInTheDocument();

    if (titleWrapperEle) {
      // 태그 타입 명시 검증
      const typeTextEle = wrapperEle?.querySelector(".tree-detail-tag-type");
      expect(typeTextEle).toBeInTheDocument();

      // 타입 표시 검증하기
      if (typeTextEle) {
        const text = typeTextEle.querySelector(".mcm-span-unit");
        expect(text?.textContent).toEqual("Tag Type");

        const copyText = typeTextEle.querySelector("code");
        expect(copyText?.textContent).toEqual("<div>");
      }

      // 클래스 명시 검증
      const classNameTextEle = wrapperEle?.querySelector(
        ".tree-detail-tag-className"
      );
      expect(classNameTextEle).toBeInTheDocument();

      // 클래스 표시 검증하기
      if (classNameTextEle) {
        const text = classNameTextEle.querySelector(".mcm-span-unit");
        expect(text?.textContent).toEqual("ClassName");

        const copyText = classNameTextEle.querySelector("code");
        expect(copyText?.textContent).toEqual("mcm-modal-items");
      }
    }

    if (wrapperEle) {
      const roleInfoEle = wrapperEle.querySelector(".tree-detail-info-role");
      expect(roleInfoEle).toBeInTheDocument();

      if (roleInfoEle) {
        expect(roleInfoEle.textContent).toEqual(
          "모달 창을 나타내는 태그입니다.  width, height 값으로 모달의 내부 크기를 조절할 수 있습니다. styles, mobileDefaultStyles가 직접 적용되는 태그입니다."
        );
      }

      // 상위 태그 클릭 태그 검증
      const buttonEle = wrapperEle.querySelector(".tree-detail-button");
      expect(buttonEle).toBeInTheDocument();

      if (buttonEle) {
        fireEvent.click(buttonEle);
        expect(handleClick).toHaveBeenCalled();
      }
    }
  });
});

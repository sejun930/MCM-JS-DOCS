import { MutableRefObject, useRef } from "react";

import { render } from "@testing-library/react";
import NavSearchPage from "src/main/commonsComponents/layout/nav/search";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: jest.fn(),
}));

export default describe("Layout Nav Search Page", () => {
  const _inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  // 스냅샷
  test("Snapshot", () => {
    const { container } = render(
      <NavSearchPage
        _inputRef={_inputRef}
        changeSearch={() => {}}
        search="test"
      />
    );
    expect(container).toMatchSnapshot();
  });

  // 검색을 위한 input 태그 존재 여부 검증
  test("Check input tag", () => {
    const { container } = render(
      <NavSearchPage
        _inputRef={_inputRef}
        changeSearch={() => {}}
        search="test"
      />
    );

    // wrapper 존재 여부 검증
    const wrapperEle = container.querySelector(".nav-search-wrapper");
    expect(wrapperEle).toBeInTheDocument();

    // input 존재 여부 검증
    const inputEle = wrapperEle?.querySelector(".nav-search-input");
    expect(inputEle).toBeInTheDocument();
  });
});

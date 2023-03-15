import { render } from "@testing-library/react";
// import { RecoilRoot } from "recoil";
import _ExampleOptionalCodeIconPage from "src/main/commonsComponents/units/template/form/example/optional/code";

export default describe("Example Code Icon", () => {
  // 스냅샷
  test("Example Code Icon - Snapshot", () => {
    const { container } = render(
      <_ExampleOptionalCodeIconPage
        showCode={false}
        toggleShowCode={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // 스냅샷
  test("Example Code Icon - Snapshot", () => {
    const { container } = render(
      <_ExampleOptionalCodeIconPage
        showCode={false}
        toggleShowCode={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

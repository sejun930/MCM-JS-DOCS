import { render } from "@testing-library/react";
// import { RecoilRoot } from "recoil";
import _ExampleOptionalCodeIconPage from "src/main/commonsComponents/units/template/form/example/optional/code";

export default describe("Example Code Icon", () => {
  // 스냅샷
  test("Snapshot : false", () => {
    const { container } = render(
      <_ExampleOptionalCodeIconPage showCode={false} />
    );
    expect(container).toMatchSnapshot();
  });

  // fin을 출력하는 태그가 존재하는지 검증
  test("Check Fin", () => {
    const { getByRole } = render(
      <_ExampleOptionalCodeIconPage showCode={false} />
    );

    // 왼쪽 핀이 존재하는지 검증
    const leftEle = getByRole("example-left-tem");
    expect(leftEle).toBeInTheDocument();

    // 가운데 핀이 존재하는지 검증
    const finEle = getByRole("example-fin");
    expect(finEle).toBeInTheDocument();

    // 오른쪽 핀이 존재하는지 검증
    const rightEle = getByRole("example-right-tem");
    expect(rightEle).toBeInTheDocument();
  });

  // showCode가 true일 경우
  test("if showCode is true", () => {
    const { getByRole } = render(
      <_ExampleOptionalCodeIconPage showCode={true} />
    );

    // 왼쪽 핀이 존재하는지 검증
    const leftEle = getByRole("example-left-tem-open");
    expect(leftEle).toBeInTheDocument();

    // 가운데 핀이 존재하는지 검증
    const finEle = getByRole("example-fin-open");
    expect(finEle).toBeInTheDocument();

    // 오른쪽 핀이 존재하는지 검증
    const rightEle = getByRole("example-right-tem-open");
    expect(rightEle).toBeInTheDocument();
  });
});

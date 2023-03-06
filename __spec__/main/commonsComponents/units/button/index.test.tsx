import { fireEvent, render } from "@testing-library/react";
import _Button from "src/main/commonsComponents/units/button";

export default describe("Button Units Page Jest", () => {
  // 스냅샷
  test("Button Units Page - Snapshot", () => {
    const component = render(
      <_Button
        onClickEvent={() => console.log("버튼 클릭")}
        className="jest_btn"
      >
        버튼 테스트
      </_Button>
    );

    expect(component.container).toMatchSnapshot();
  });

  // onClick 버튼 테스트
  test("Button Units Page - Check onClick event", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <_Button onClickEvent={onClick} className="jest_btn">
        버튼 테스트
      </_Button>
    );
    fireEvent.click(getByText("버튼 테스트"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // button 태그 유무 확인하기
  test("Button Units Page - Check have button tag", () => {
    const { container } = render(
      <_Button
        onClickEvent={() => console.log("버튼 클릭")}
        className="jest_btn"
      >
        버튼 테스트
      </_Button>
    );
    const btnEle = container.querySelector("button");

    // button 태그가 존재하는지 검증
    expect(btnEle).toBeInTheDocument();
    // 클래스 존재 여부 검증
    expect(btnEle).toHaveClass("jest_btn");
  });
});

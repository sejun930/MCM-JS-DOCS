import { render } from "@testing-library/react";

import MainHomePage from "src/main/mainComponents";

export default describe("Main Home Page", () => {
  // 스냅샷
  test("Main Home Page - Snapshot", () => {
    const { container } = render(<MainHomePage />);
    expect(container).toMatchSnapshot();
  });
});

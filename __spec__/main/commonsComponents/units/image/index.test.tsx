import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import _Image from "src/main/commonsComponents/units/image";
import { useRouter } from "next/router";
import { MutableRefObject, useRef } from "react";

// 가짜 router 만들기
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const push = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

// 가짜 ref 만들기
// jest.mock("react", () => ({
//   useRef: jest.fn(),
// }));
// (useRef as jest.Mock).mockImplementation(() => {});

export default it("Image Units Page Sanpshot", () => {
  const _ref = useRef() as MutableRefObject<HTMLImageElement>;
  const component = render(
    <_Image src="/images/" className="jest_image" _ref={_ref} />
  );
  // @ts-ignore
  expect(component.container).toMatchSnapshot();
});

import "@testing-library/jest-dom";
import { useRouter } from "next/router";

export default function TestCommonsHooksComponents() {
  const getNextRouter = () => {
    // 가짜 router 만들기
    jest.mock("next/router", () => ({
      useRouter: jest.fn(),
    }));
    const mockRouter = useRouter as jest.Mock;
    return mockRouter;
    // console.log(mockRouter.mockImplementation);
    // console.log(123123123123213);

    // const push = jest.fn();
    // mockRouter.mockImplementation(() => ({
    //   push,
    // }));
  };

  return {
    getNextRouter,
  };
}

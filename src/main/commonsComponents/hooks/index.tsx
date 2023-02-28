import { ReactNode } from "react";
import { NextRouter, useRouter } from "next/router";
import { ExampleIProps } from "../units/template/form/example/template.example.types";

export default function CommonsHooksComponents() {
  const router = useRouter();

  // 컴포넌트 렌더 함수
  const componentRender = (Component: ReactNode): ReactNode => {
    return Component;
  };

  // 컴포넌트 클래스 네임 완성
  const getAllComponentsClassName = (
    defaultClass: string,
    className?: string
  ): string => {
    // defaultClass : 디폴트로 무조건 적용되는 클래스 이름
    // className : 새로 추가될 클래스 이름
    const _className = `${defaultClass}${className ? ` ${className}` : ""}`;
    return _className;
  };

  // router 객체 리턴하기
  const getRouter: () => NextRouter = () => {
    return router;
  };

  // 주소 query 끝 제이든 케이스 리턴하기
  const getModuleNamewithJadenCase = (): string => {
    let moduleName = router.pathname.split("/").at(-1);

    if (moduleName) {
      moduleName = moduleName[0].toUpperCase() + moduleName.substring(1);
      return moduleName;
    }
    return "";
  };

  // 예시용 렌더시 몇개의 예시 컴포넌트를 가지고 있는지를 리턴
  const getAllExampleComponentLength = (list: Array<ExampleIProps>): number => {
    return list.reduce((acc, cur) => acc + cur.contents.length, 0);
  };

  return {
    componentRender,
    getAllComponentsClassName,
    getRouter,
    getModuleNamewithJadenCase,
    getAllExampleComponentLength,
  };
}

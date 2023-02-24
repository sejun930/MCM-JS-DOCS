import { ReactNode } from "react";
import { NextRouter, useRouter } from "next/router";

export default function CommonsHooksComponents() {
  const router = useRouter();

  // 컴포넌트 렌더 함수
  const componentRender = (Component: ReactNode): ReactNode => {
    console.log(Component);
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

  return {
    componentRender,
    getAllComponentsClassName,
    getRouter,
    getModuleNamewithJadenCase,
  };
}

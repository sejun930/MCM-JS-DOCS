import { ReactNode } from "react";

export default function CommonsHooksComponents() {
  // 컴포넌트 렌더 함수
  const componentRender = (Component: ReactNode) => {
    return Component;
  };

  // 컴포넌트 클래스 네임 완성
  const getAllComponentsClassName = (
    defaultClass: string,
    className?: string
  ) => {
    // defaultClass : 디폴트로 무조건 적용되는 클래스 이름
    // className : 새로 추가될 클래스 이름
    const _className = `${defaultClass}${className ? ` ${className}` : ""}`;
    return _className;
  };

  return {
    componentRender,
    getAllComponentsClassName,
  };
}

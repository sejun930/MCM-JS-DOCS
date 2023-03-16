import React from "react";
import styled from "@emotion/styled";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

// a태그를 사용해 타 웹 사이트 이동
export default function _A({
  children,
  href,
  notTarget,
  className,
}: {
  children: React.ReactNode; // 화면에 렌더될 페이지
  href: string; // 실행할 웹 페이지의 경로
  notTarget?: boolean; // target의 _blank값을 사용하지 않을 것인지 (default : false)
  className?: string; // 설정할 클래스 네임
}) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    <A
      href={href}
      target={notTarget ? "_self" : "_blank"}
      rel="noreferrer"
      className={getAllComponentsClassName("_a_", className)}
    >
      {children}
    </A>
  );
}

const A = styled.a`
  color: blue;
  text-decoration: underline;
`;

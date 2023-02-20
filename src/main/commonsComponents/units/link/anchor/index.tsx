import React from "react";
import styled from "@emotion/styled";

// a태그를 사용해 타 웹 사이트 이동
export default function _A({
  children,
  href,
  notTarget,
}: {
  children: React.ReactNode; // 화면에 렌더될 페이지
  href: string; // 실행할 웹 페이지의 경로
  notTarget?: boolean; // target의 _blank값을 사용하지 않을 것인지 (default : false)
}) {
  return (
    <A href={href} target={notTarget ? "_self" : "_blank"} rel="noreferrer">
      {children}
    </A>
  );
}

const A = styled.a`
  color: blue;
  text-decoration: underline;
`;

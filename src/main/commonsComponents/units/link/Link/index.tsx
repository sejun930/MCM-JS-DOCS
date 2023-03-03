import Link from "next/link";
import styled from "@emotion/styled";
import CommonsHooksComponents from "../../../hooks";
import { ReactNode } from "react";

interface IProps {
  href: string; // 이동 경로 설정
  children: ReactNode; // 렌더될 내용
  className?: string; // 클래스 네임 설정
}

// router 이동 관련 컴포넌트
export default function _Link({ href, children, className }: IProps) {
  const { getAllComponentsClassName } = CommonsHooksComponents();

  return (
    <LinkComponent
      passHref={true}
      href={href}
      className={getAllComponentsClassName("_link_", className)}
    >
      {children}
    </LinkComponent>
  );
}

const LinkComponent = styled(Link)`
  cursor: pointer;
`;

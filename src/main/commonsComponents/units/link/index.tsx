import Link from "next/link";
import styled from "@emotion/styled";
import CommonsHooksComponents from "../../hooks";
import { ReactNode } from "react";

interface IProps {
  href: string; // 이동 경로 설정
  Component: ReactNode; // 렌더될 컴포넌트
  usePassHref?: boolean; // passHref 사용 여부 (기본 : true)
  className?: string; // 클래스 네임 설정
}

// router 이동 관련 컴포넌트
export default function _Link({
  href,
  Component,
  usePassHref,
  className,
}: IProps) {
  const { componentRender, getAllComponentsClassName } =
    CommonsHooksComponents();

  return (
    <LinkComponent
      passHref={usePassHref || true}
      href={href}
      className={getAllComponentsClassName("_link_", className)}
    >
      {componentRender(Component)}
    </LinkComponent>
  );
}

const LinkComponent = styled(Link)`
  cursor: pointer;
`;

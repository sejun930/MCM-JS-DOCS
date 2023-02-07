import Link from "next/link";
import styled from "@emotion/styled";
import CommonsHooksComponents from "../../hooks";
import { ReactNode } from "react";

interface IProps {
  href: string; // 이동 경로 설정
  Component: ReactNode; // 렌더될 컴포넌트
  usePassHref?: boolean; // passHref 사용 여부 (기본 : true)
}

// router 이동 관련 컴포넌트
export default function _Link({ href, Component, usePassHref }: IProps) {
  const { componentRender } = CommonsHooksComponents();

  return (
    <LinkComponent passHref={usePassHref || true} href={href}>
      {componentRender(Component)}
    </LinkComponent>
  );
}

const LinkComponent = styled(Link)`
  cursor: pointer;
`;

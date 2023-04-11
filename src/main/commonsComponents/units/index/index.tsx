import { useEffect, Children } from "react";
import styled from "styled-components";

// 목차 렌더 페이지
export default function _Index({
  children,
  indexList,
}: {
  children: JSX.Element | Array<JSX.Element>;
  indexList?: any;
}) {
  return (
    <Wrapper className="mcm-index-wrapper">
      {(Array.isArray(children) &&
        children.flatMap((el) => <Items>{el}</Items>)) || (
        <Items>{children}</Items>
      )}
      <IndexListWrapper></IndexListWrapper>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 160px 0px;
`;

export const Items = styled.section``;

export const IndexListWrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 100px;
  right: 50px;
  z-index: 9999 !important;
  background-color: white;
  border-radius: 10px;
  border: double 3px #57c5b6;
  padding: 1rem 1.5rem;
`;

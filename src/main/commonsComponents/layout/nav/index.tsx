import styled from "@emotion/styled";

import { navList } from "./data";
import _Link from "../../units/link";
import _PText from "../../units/text/p";

export default function LayoutNavPage() {
  return (
    <LayoutNavWrapper>
      <LayoutNavListWrapper>
        {navList
          .slice()
          .sort((a, b) => (a.name > b.name ? 1 : -1)) // 알파벳 순서로 정렬
          .map((el, key) => (
            <_Link
              key={`_layout_modules_list_${key}_`}
              href={
                el.href
                  ? `/modules/${el.href}`
                  : `/modules/${el.name.toLowerCase()}`
              }
              Component={<_PText text={el.name} />}
            />
          ))}
      </LayoutNavListWrapper>
    </LayoutNavWrapper>
  );
}

const LayoutNavWrapper = styled.nav`
  width: 15%;
  border-right: solid 3px #aa5656;
  padding: 1rem;
  min-width: 200px;
`;

const LayoutNavListWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px 0px;

  ._p_ {
    transition: all 0.25s ease-in;
    padding: 10px;
    border-radius: 10px;

    :hover {
      background-color: #f5f5f5;
    }
  }
`;

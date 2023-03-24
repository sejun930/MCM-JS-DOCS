import { MutableRefObject, useRef } from "react";
import { LayoutNavListWrapper, LayoutNavWrapper } from "./nav.styles";

import { navList } from "./nav.data";
import { _PText, _Link } from "mcm-js-commons";

import CommonsHooksComponents from "../../hooks/commonsHooks";
import NavSearchPage from "./search";

export default function LayoutNavPage() {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { getRouter, getAllComponentsClassName } = CommonsHooksComponents();
  const router = getRouter();

  // 현재 선택중인 탭
  const selectTap = router.pathname.split("/").at(-1);

  return (
    <LayoutNavWrapper ref={wrapperRef} className="nav-wrapper">
      <LayoutNavListWrapper className="nav-list-wrapper">
        <NavSearchPage />
        {navList
          .slice()
          .sort((a, b) => (a.name > b.name ? 1 : -1)) // 알파벳 순서로 정렬
          .map((el, key) => {
            const isSelect = selectTap === (el.href || el.name.toLowerCase());

            return (
              <_Link
                key={`layout-modules-list-${key}`}
                href={
                  el.href
                    ? `/modules/${el.href}`
                    : `/modules/${el.name.toLowerCase()}`
                }
                className={getAllComponentsClassName(
                  "tap",
                  (isSelect && `select-tap`) || ""
                )}
              >
                <_PText className="tap-name">{el.name}</_PText>
              </_Link>
            );
          })}
      </LayoutNavListWrapper>
    </LayoutNavWrapper>
  );
}

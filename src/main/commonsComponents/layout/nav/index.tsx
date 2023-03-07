import { MutableRefObject, useRef } from "react";
import { LayoutNavListWrapper, LayoutNavWrapper } from "./styles";

import { navList } from "./data";

import CommonsHooksComponents from "../../hooks";
import _Link from "../../units/link/Link";
import _PText from "../../units/text/p";

export default function LayoutNavPage() {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { getRouter, getAllComponentsClassName } = CommonsHooksComponents();
  const router = getRouter();

  // 현재 선택중인 탭
  const selectTap = router.pathname.split("/").at(-1);

  return (
    <LayoutNavWrapper ref={wrapperRef} className="_layout_nav_wrapper_">
      <LayoutNavListWrapper className="_layout_nav_list_">
        {navList
          .slice()
          .sort((a, b) => (a.name > b.name ? 1 : -1)) // 알파벳 순서로 정렬
          .map((el, key) => {
            const isSelect = selectTap === (el.href || el.name.toLowerCase());

            return (
              <_Link
                key={`_layout_modules_list_${key}_`}
                href={
                  el.href
                    ? `/modules/${el.href}`
                    : `/modules/${el.name.toLowerCase()}`
                }
                className={getAllComponentsClassName(
                  "_tap_",
                  (isSelect && `_selectTap_`) || ""
                )}
              >
                <_PText text={el.name} className="_tap_name_" />
              </_Link>
            );
          })}
      </LayoutNavListWrapper>
    </LayoutNavWrapper>
  );
}

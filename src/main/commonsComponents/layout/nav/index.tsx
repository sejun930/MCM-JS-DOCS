import {
  LayoutNavListWrapper,
  LayoutNavWrapper,
  LayoutNavListItems,
  LayoutNav,
  Setting,
} from "./nav.styles";
import { navList, NavListTypes, adminNavList } from "./nav.data";

import { useEffect, useState } from "react";
import NavListPage from "./list";
import NavSearchPage from "./search";

export default function LayoutNavPage({
  isMobileTap,
  module,
  isAdmin,
  openIsOpenSettings,
}: {
  isMobileTap?: boolean;
  module: string;
  isAdmin?: boolean;
  openIsOpenSettings: () => void;
}) {
  // 모듈 검색어
  const [search, setSearch] = useState<string>("");
  // 렌더 여부
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    if (!module) setSearch("");

    setRender(true);
  }, [module]);

  // 검색어 변경하기
  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  // 선택한 탭의 정보
  const selectTapInfo: NavListTypes = (isAdmin ? adminNavList : navList).filter(
    (el: NavListTypes) => el.name === module
  )[0];

  // 선택한 탭을 제외한 나머지 탭들의 정보
  let allTapInfo: Array<NavListTypes> = (
    isAdmin ? adminNavList : navList
  ).filter((el: NavListTypes) => el.name !== module);
  if (search)
    // 검색어가 있을 경우
    allTapInfo = allTapInfo.filter((el: NavListTypes) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <LayoutNavWrapper
      className="nav-wrapper"
      render={render}
      isMobileTap={isMobileTap}
      isAdmin={isAdmin}
    >
      <LayoutNavListWrapper className="nav-list-wrapper">
        <LayoutNav isAdmin={isAdmin}>
          <LayoutNavListItems
            className="nav-list-items"
            isMobileTap={isMobileTap}
            isAdmin={isAdmin}
          >
            {!isAdmin && (
              <NavSearchPage search={search} onChangeSearch={onChangeSearch} />
            )}
            {module && module !== "404" && (
              // 선택된 탭의 정보 렌더하기
              <NavListPage
                list={[selectTapInfo]}
                isSelect={true}
                isAdmin={isAdmin}
              />
            )}
          </LayoutNavListItems>
          {/* 선택된 탭을 제외한 나머지 탭 렌더하기 */}
          <NavListPage
            list={allTapInfo}
            isSelect={false}
            search={search}
            isAdmin={isAdmin}
          />
        </LayoutNav>

        {!isAdmin && (
          <Setting onClickEvent={openIsOpenSettings} className="setting">
            🛠 Setting
          </Setting>
        )}
      </LayoutNavListWrapper>
    </LayoutNavWrapper>
  );
}

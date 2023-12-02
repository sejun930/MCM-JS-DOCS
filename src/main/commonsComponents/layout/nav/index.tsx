import { useEffect, useState } from "react";
import {
  LayoutNavListWrapper,
  LayoutNavWrapper,
  LayoutNavListItems,
  LayoutNav,
} from "./nav.styles";
import {
  navList,
  NavListTypes,
  adminNavList,
  initNavInfoData,
  InitNavInfoDataTypes,
} from "./nav.data";
import { checkedIsFavorite } from "../../functional";

import NavListPage from "./list";
import NavSearchPage from "./search";

export default function LayoutNavPage({
  isMobileTap,
  module,
  isAdmin,
  openIsOpenSettings,
  _favorite,
  onFavoriteChangeEvent,
}: {
  isMobileTap?: boolean;
  module: string;
  isAdmin?: boolean;
  openIsOpenSettings: () => void;
  _favorite: string[];
  onFavoriteChangeEvent: (list: string[]) => void;
}) {
  // 검색어, 렌더 여부, 즐겨찾기 리스트 정보 종합
  const [info, setInfo] = useState<InitNavInfoDataTypes>(initNavInfoData);
  const { search, render, favorite } = info;

  // 최초 리스트 저장
  useEffect(() => {
    const _info = { ...info };

    _info.render = true;

    if (_favorite) {
      _info.favorite = [..._favorite];
      setInfo(_info);
    }
  }, [_favorite, module]);

  // 검색어 변경하기
  const onChangeSearch = (text: string) => {
    setInfo({ ...info, ["search"]: text });
  };

  // 즐겨찾기 리스트 변경하기
  const onChangeFavorite = (list: string[]) => {
    setInfo({ ...info, ["favorite"]: list });
    onFavoriteChangeEvent(list);
  };

  // 선택한 탭의 정보
  const selectTapInfo: NavListTypes = (isAdmin ? adminNavList : navList).filter(
    (el: NavListTypes) => el.name === module
  )[0];

  // 선택한 탭을 제외한 나머지 탭들의 정보
  const extraTaps: Array<NavListTypes> = (
    isAdmin ? adminNavList : navList
  ).filter((el: NavListTypes) => el.name !== module);

  // 노출될 전체 리스트
  let allTapInfo = [...extraTaps];
  // 즐겨찾기용 및 그 외의 리스트
  const filterResult: { favorite: NavListTypes[]; extra: NavListTypes[] } = {
    favorite: [],
    extra: [],
  };

  // 즐겨찾기가 되어 있는 모듈을 우선 노출
  if (favorite && favorite.length) {
    filterResult.favorite = [
      ...extraTaps.filter((el) => checkedIsFavorite(favorite, el.name)),
    ];
    filterResult.extra = [
      ...extraTaps.filter((el) => favorite.every((cu) => cu !== el.name)),
    ];

    // 즐겨찾기 - 나머지 리스트 순서대로 나열
    allTapInfo = [...filterResult.favorite, ...filterResult.extra];
  }

  if (search) {
    // 검색어가 있을 경우
    allTapInfo = allTapInfo.filter((el: NavListTypes) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <LayoutNavWrapper
      id="nav-wrapper"
      render={render}
      isMobileTap={isMobileTap}
      isAdmin={isAdmin}
    >
      <LayoutNavListWrapper id="nav-list-wrapper">
        <LayoutNav isAdmin={isAdmin}>
          <LayoutNavListItems
            className="nav-list-items"
            isMobileTap={isMobileTap}
            isAdmin={isAdmin}
          >
            {!isAdmin && (
              <NavSearchPage
                search={search}
                onChangeSearch={onChangeSearch}
                openIsOpenSettings={openIsOpenSettings}
              />
            )}
            {module && module !== "404" && selectTapInfo && (
              // 선택된 탭의 정보 렌더하기
              <NavListPage
                list={[selectTapInfo]}
                isSelected={true}
                isAdmin={isAdmin}
                favorite={favorite || []}
                changeFavorite={onChangeFavorite}
              />
            )}
          </LayoutNavListItems>
          {/* 선택된 탭을 제외한 나머지 탭 렌더하기 */}
          <NavListPage
            list={allTapInfo}
            isSelected={false}
            search={search}
            isAdmin={isAdmin}
            favorite={favorite || []}
            changeFavorite={onChangeFavorite}
            favoriteFilter={filterResult.favorite || []}
          />
        </LayoutNav>
      </LayoutNavListWrapper>
    </LayoutNavWrapper>
  );
}

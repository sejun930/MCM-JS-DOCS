import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";
import {
  LayoutNavListWrapper,
  LayoutNavWrapper,
  LayoutNavListItems,
} from "./nav.styles";

import { navList, NavListTypes } from "./nav.data";

import NavSearchPage from "./search";
import NavListPage from "./list";

// 디바운싱 저장 변수
let _debounce: ReturnType<typeof setTimeout> | number;
export default function LayoutNavPage() {
  const [module] = useRecoilState(moduleState);

  // 모듈 검색어
  const [search, setSearch] = useState<string>("");
  // 렌더할 나머지 데이터
  const [allList, setAllList] = useState<Array<NavListTypes>>([]);

  useEffect(() => {
    // 선택된 탭을 제외한 나머지 탭들을 저장
    let tempAllList = navList.filter((el) => el.name !== module);
    // 검색어가 있다면 검색어에 해당하는 모듈만 저장
    if (search)
      tempAllList = tempAllList.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase())
      );

    // .sort((a, b) => (a.name > b.name ? 1 : -1));
    setAllList(tempAllList);
  }, [module, search]);

  const changeSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(_debounce);
    _debounce = window.setTimeout(() => {
      const { value } = target;
      setSearch(value.trim());
    }, 300);
  };

  // 선택한 탭의 정보
  const selectTapInfo = navList.filter((el) => el.name === module)[0] || [];

  return (
    <LayoutNavWrapper className="nav-wrapper">
      <LayoutNavListWrapper className="nav-list-wrapper">
        <LayoutNavListItems>
          <NavSearchPage changeSearch={changeSearch} />
          {module && module !== "404" && (
            // 선택된 탭의 정보 렌더하기
            <NavListPage list={[selectTapInfo]} isSelect={true} />
          )}
        </LayoutNavListItems>
        {/* 선택된 탭을 제외한 나머지 탭 렌더하기 */}
        <NavListPage list={allList} isSelect={false} search={search} />
      </LayoutNavListWrapper>
    </LayoutNavWrapper>
  );
}

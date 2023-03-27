import {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const _inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [module] = useRecoilState(moduleState);

  // 모듈 검색어
  const [search, setSearch] = useState<string>("");
  // 렌더 여부
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!module) resetSearch();

    setRender(true);
  }, [module]);

  const changeSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    window.clearTimeout(_debounce);

    _debounce = window.setTimeout(() => {
      const { value } = target;
      setSearch(value.trim());
    }, 300);
  };

  // 검색어 초기화
  const resetSearch = () => {
    setSearch("");
    if (_inputRef.current) _inputRef.current.value = "";
  };

  // 선택한 탭의 정보
  const selectTapInfo: NavListTypes = navList.filter(
    (el: NavListTypes) => el.name === module
  )[0];
  // 선택한 탭을 제외한 나머지 탭들의 정보
  let allTapInfo: Array<NavListTypes> = navList.filter(
    (el: NavListTypes) => el.name !== module
  );
  if (search)
    // 검색어가 있을 경우
    allTapInfo = allTapInfo.filter((el: NavListTypes) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <LayoutNavWrapper className="nav-wrapper" render={render}>
      <LayoutNavListWrapper className="nav-list-wrapper">
        <LayoutNavListItems>
          <NavSearchPage
            changeSearch={changeSearch}
            _inputRef={_inputRef}
            search={search}
            resetSearch={resetSearch}
          />
          {module && module !== "404" && (
            // 선택된 탭의 정보 렌더하기
            <NavListPage list={[selectTapInfo]} isSelect={true} />
          )}
        </LayoutNavListItems>
        {/* 선택된 탭을 제외한 나머지 탭 렌더하기 */}
        <NavListPage list={allTapInfo} isSelect={false} search={search} />
      </LayoutNavListWrapper>
    </LayoutNavWrapper>
  );
}

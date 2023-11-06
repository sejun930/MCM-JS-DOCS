import { EmptyResult, Link, List, ListWrapper } from "./nav.list.styles";
import { NavListTypes } from "../nav.data";
import { _PText, _SpanTextWithHtml } from "mcm-js-commons";

import { imagePreLoad } from "src/main/commonsComponents/functional";
import { removeTag } from "src/main/commonsComponents/functional/code";

import FavoritePage from "src/main/commonsComponents/units/template/form/favorite";

export default function NavListPage({
  list,
  isSelected,
  search,
  isAdmin,
  favorite,
  changeFavorite,
  favoriteFilter,
}: {
  list: Array<NavListTypes>;
  isSelected: boolean;
  search?: string;
  isAdmin?: boolean;
  favorite: string[];
  changeFavorite: (list: string[]) => void;
  favoriteFilter?: NavListTypes[];
}) {
  // Example 이미지 미리 호출하기
  const preLoadExampleImage = (name: string) => () => {
    imagePreLoad([
      `https://s3.ap-northeast-2.amazonaws.com/mcm-js.site/images/modules/${name}-example.gif`,
    ]);
  };

  // 검색어가 있지만 해당되는 모듈이 없고 즐겨찾기는 있는 경우
  let isEmpty = search && !list.length;
  if (search && !list.length && favoriteFilter?.length) {
    list = [...favoriteFilter];
    isEmpty = true;
  }

  return (
    <ListWrapper
      isSelected={isSelected}
      className={`nav-list-wrapper${
        isSelected ? " nav-list-select-wrapper" : ""
      }`}
      isAdmin={isAdmin}
      hasError={list[0] === undefined}
    >
      {(list.length &&
        list.map((el, key) => {
          const _href = `/${(!isAdmin ? "modules/" : "admin/") || ""}${String(
            el?.href || el?.name
          ).toLowerCase()}`;
          let name = el?.remarks || el?.name;

          if (search) {
            const startIdx = name.toLowerCase().indexOf(search.toLowerCase());

            if (startIdx !== -1) {
              const endIdx = startIdx + search.length;
              const _temp = name.substring(startIdx, endIdx);

              name = name.replaceAll(
                _temp,
                `<span class='search-keyword'>${_temp}</span>`
              );
            }
          }

          return (
            <List
              key={`tap-name-${el?.name}-${key}`}
              onMouseEnter={preLoadExampleImage(el?.name || "")}
              isSelected={isSelected}
            >
              {(name && (
                <Link
                  href={_href}
                  className="module-tap"
                  isSelected={isSelected}
                >
                  <_SpanTextWithHtml
                    dangerouslySetInnerHTML={name || "Not Found"}
                  />
                </Link>
              )) || <></>}
              <FavoritePage
                favorite={favorite}
                changeFavorite={changeFavorite}
                module={removeTag(name) || ""}
              />
            </List>
          );
        })) || <></>}

      {isEmpty && (
        <EmptyResult>
          <_PText className="empty-search-result">검색 결과 없음</_PText>
        </EmptyResult>
      )}
    </ListWrapper>
  );
}

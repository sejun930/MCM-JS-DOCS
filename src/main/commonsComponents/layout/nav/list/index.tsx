import styled from "@emotion/styled";

import { NavListTypes } from "../nav.data";
import { _Link, _SpanText, _PText } from "mcm-js-commons";

export default function NavListPage({
  list,
  isSelect,
  search,
}: {
  list: Array<NavListTypes>;
  isSelect: boolean;
  search?: string;
}) {
  return (
    <ListWrapper
      isSelect={isSelect}
      className={`nav-list-wrapper${
        isSelect ? " nav-list-select-wrapper" : ""
      }`}
    >
      {(list.length &&
        list.map((el, key) => {
          const _href = `/modules/${el.href || el.name}`;
          console.log(_href);
          let name = el.name;

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
            <li key={`tap-name-${el.name}-${key}`}>
              <_Link href={_href}>
                <_SpanText dangerouslySetInnerHTML={name}> </_SpanText>
              </_Link>
            </li>
          );
        })) || (
        <li>
          <_PText className="empty-search-result">검색 결과 없음</_PText>
        </li>
      )}
    </ListWrapper>
  );
}

interface StyleTypes {
  isSelect?: boolean;
}

export const ListWrapper = styled.ul`
  padding: 0px 1rem;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 20px 0px;
  position: sticky;
  top: 125px;

  ${(props: StyleTypes) =>
    props.isSelect && {
      padding: "0px",
      paddingTop: "1rem",
    }}

  li {
    .mcm-link-unit {
      display: block;

      ${(props: StyleTypes) =>
        props.isSelect && {
          padding: "0.5rem",
          borderRadius: "10px",
          backgroundColor: "#aa5656",
          color: "white",
          width: "16vw",
        }}
    }
  }

  .empty-search-result {
    padding: 0px;
    font-size: 14px;
    color: #777777;
  }
`;

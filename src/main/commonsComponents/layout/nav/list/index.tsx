import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { NavListTypes } from "../nav.data";
import { _Link, _PText, _SpanTextWithHtml } from "mcm-js-commons";
import { CSSProperties } from "react";

import { imagePreLoad } from "src/main/commonsComponents/functional";

export default function NavListPage({
  list,
  isSelect,
  search,
  isAdmin,
}: {
  list: Array<NavListTypes>;
  isSelect: boolean;
  search?: string;
  isAdmin?: boolean;
}) {
  // Example 이미지 미리 호출하기
  const preLoadExampleImage = (name: string) => () => {
    imagePreLoad([
      `https://s3.ap-northeast-2.amazonaws.com/mcm-js.site/images/modules/${name}-example.gif`,
    ]);
  };

  return (
    <ListWrapper
      isSelect={isSelect}
      className={`nav-list-wrapper${
        isSelect ? " nav-list-select-wrapper" : ""
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
            <li
              key={`tap-name-${el?.name}-${key}`}
              onMouseEnter={preLoadExampleImage(el?.name || "")}
            >
              {name ? (
                <_Link href={_href}>
                  <_SpanTextWithHtml
                    dangerouslySetInnerHTML={name || "Not Found"}
                  />
                </_Link>
              ) : (
                <></>
              )}
            </li>
          );
        })) || (
        <EmptyResult>
          <_PText className="empty-search-result">검색 결과 없음</_PText>
        </EmptyResult>
      )}
    </ListWrapper>
  );
}

interface StyleTypes {
  isSelect?: boolean;
  isAdmin?: boolean;
  hasError?: boolean;
}

export const ListWrapper = styled.ul`
  padding: 20px 1rem;
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

  ${(props) =>
    props.isAdmin && {
      padding: "0px",
    }}

  ${(props) =>
    props.hasError && {
      paddingTop: "0px",
    }}

  li {
    .mcm-link-unit {
      display: block;

      ${(props) => {
        let styles: CSSProperties & { [key: string]: string } = {};

        if (props.isSelect) {
          styles = {
            padding: "0.5rem",
            borderRadius: "10px",
            backgroundColor: "#aa5656",
            color: "white",
            width: "calc(100% + 50px)",
            height: "36px",
          };

          if (props.isAdmin) {
            styles.backgroundColor = "#525FE1";
          }
        }

        return styles;
      }}
    }
  }

  .empty-search-result {
    padding: 0px;
    font-size: 14px;
    color: #777777;
  }

  @media ${breakPoints.mobileLarge} {
    padding: 1rem 0px;

    ${(props) =>
      props.isAdmin && {
        padding: "0px",
      }}
  }
`;

export const EmptyResult = styled.li`
  margin-top: 20px;

  @media ${breakPoints.mobileLarge} {
    margin-top: 0px;
  }
`;

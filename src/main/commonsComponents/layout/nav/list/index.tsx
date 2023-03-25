import styled from "@emotion/styled";

import { NavListTypes } from "../nav.data";
import { _Link, _SpanText } from "mcm-js-commons";

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
    (list.length && (
      <ListWrapper isSelect={isSelect}>
        {list.map((el, key) => {
          const _href = `/modules/${el.href ?? el.name}`;

          return (
            <li key={`tap-name-${el.name}-${key}`}>
              <_Link href={_href}>
                <_SpanText>{el.name}</_SpanText>
              </_Link>
            </li>
          );
        })}
      </ListWrapper>
    )) || <></>
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

  //

  /* li {

  } */
`;

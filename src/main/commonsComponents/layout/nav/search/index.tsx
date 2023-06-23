import styled from "@emotion/styled";
import { _Input } from "mcm-js-commons";

export default function NavSearchPage({
  search,
  onChangeSearch,
}: {
  search: string;
  onChangeSearch: (text: string) => void;
}) {
  return (
    <Wrapper className="nav-search-wrapper">
      <NavSearchFieldset>
        <legend>모듈 검색</legend>
        <_Input
          onChangeEvent={onChangeSearch}
          className="nav-search-input"
          placeHolder="모듈 입력"
          maxLength={10}
          delay={300}
          value={search}
        />
      </NavSearchFieldset>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  height: auto;
  top: 10px;
  z-index: 100;
`;

export const NavSearchFieldset = styled.fieldset`
  border: unset;
  padding: 0;
  margin: 0;

  legend {
    display: none;
  }
`;

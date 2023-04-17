import styled from "@emotion/styled";
import { ChangeEvent, MutableRefObject } from "react";

import { _CloseButton } from "mcm-js-commons";

export default function NavSearchPage({
  onChangeSearch,
  _inputRef,
  search,
  resetSearch,
  isTextArea,
}: {
  onChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  _inputRef: MutableRefObject<HTMLInputElement>;
  search: string;
  resetSearch: () => void;
  isTextArea?: boolean;
}) {
  return (
    <Wrapper className="nav-search-wrapper">
      <form onSubmit={(e) => e.preventDefault()}>
        <NavSearchFieldset>
          <legend>모듈 검색</legend>
          <SerachWrapper>
            <SearchItems>
              <Input
                className="nav-search-input"
                type="text"
                placeholder="모듈 검색"
                maxLength={20}
                onChange={onChangeSearch}
                ref={_inputRef}
                hasSearch={search}
              />
              <ResetBtnWrapper>
                <_CloseButton onClickEvent={resetSearch} />
              </ResetBtnWrapper>
            </SearchItems>
          </SerachWrapper>
        </NavSearchFieldset>
        {/* </Form> */}
      </form>
    </Wrapper>
  );
}

interface StyleTypes {
  hasSearch?: string;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  height: auto;
  top: 10px;
  z-index: 100;
  height: 30px;
`;

export const NavSearchFieldset = styled.fieldset`
  border: unset;

  legend {
    display: none;
  }
`;

export const SerachWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: solid 1px black;
  left: 0;
  top: 0;
`;

export const SearchItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const Input = styled.input`
  min-width: 100%;
  height: 100%;
  border: unset;
  padding-left: 10px;
  font-size: 16px;
  border-radius: 0px;
  transition: all 0.3s;

  ${(props: StyleTypes) =>
    props.hasSearch && {
      minWidth: "80%",
    }}
`;

export const ResetBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 20px;
`;

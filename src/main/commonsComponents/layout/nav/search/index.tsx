import styled from "@emotion/styled";
import { ChangeEvent, FormEvent, MutableRefObject } from "react";

export default function NavSearchPage({
  changeSearch,
  _inputRef,
  search,
}: {
  changeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  _inputRef: MutableRefObject<HTMLInputElement>;
  search: string;
}) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  console.log(search);

  return (
    <Wrapper className="nav-search-wrapper">
      <Form className="nav-search-form" onSubmit={submit}>
        <NavSearchFieldset>
          <legend>모듈 검색</legend>
          <SerachWrapper>
            <SearchItems>
              <Input
                className="nav-search-input"
                type="text"
                placeholder="모듈 검색"
                maxLength={20}
                onChange={changeSearch}
                ref={_inputRef}
                hasSearch={search}
              />
              <ResetBtnWrapper>1</ResetBtnWrapper>
            </SearchItems>
          </SerachWrapper>
        </NavSearchFieldset>
      </Form>
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
`;

export const Form = styled.form`
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
      minWidth: "90%",
    }}
`;

export const ResetBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

// export const CloseBtn = styled.button`
//   /* position: absolute; */
//   /* right: 7px; */
//   width: 10px;
//   height: 10px;
//   cursor: pointer;

//   :after,
//   :before {
//     position: absolute;
//     content: "";
//     width: 10px;
//     height: 1px;
//     background-color: black;
//   }

//   :before {
//     transform: rotate(45deg);
//   }

//   :after {
//     transform: rotate(-45deg);
//   }
// `;

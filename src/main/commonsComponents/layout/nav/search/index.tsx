import styled from "@emotion/styled";

export default function NavSearchPage() {
  return (
    <Wrapper className="nav-search-wrapper">
      <Form className="nav-search-form">
        <NavSearchFieldset>
          <legend>모듈 검색</legend>
          <SerachWrapper>
            <SearchItems>
              <Input type="text" />
            </SearchItems>
          </SerachWrapper>
        </NavSearchFieldset>
      </Form>
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
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: unset;
  padding-left: 10px;
  font-size: 16px;
  border-radius: 0px;
`;

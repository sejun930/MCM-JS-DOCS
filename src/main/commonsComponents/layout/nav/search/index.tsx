import styled from "@emotion/styled";
import { _Input, _Button } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export default function NavSearchPage({
  search,
  onChangeSearch,
  openIsOpenSettings,
}: {
  search: string;
  onChangeSearch: (text: string) => void;
  openIsOpenSettings: () => void;
}) {
  return (
    <Wrapper id="nav-search-wrapper">
      <SettingWrapper>
        <Setting onClickEvent={openIsOpenSettings} className="setting">
          🛠 Setting
        </Setting>
      </SettingWrapper>
      <NavSearchFieldset id="nav-search-filedset">
        <legend>모듈 검색</legend>
        <_Input
          onChangeEvent={onChangeSearch}
          id="nav-search-input"
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
  height: auto;
  z-index: 100;
`;

export const NavSearchFieldset = styled.fieldset`
  border: unset;
  padding: 0;
  margin: 0;

  legend {
    display: none;
  }

  .mcm-input-unit-items {
    height: 36px;
  }
`;

export const SettingWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;

  @media ${breakPoints.mobileLarge} {
    padding: 4px 0px 10px 0px;
  }
`;

export const Setting = styled(_Button)`
  font-size: 14px;
  word-spacing: 4px;
  letter-spacing: -0.02rem;

  @media ${breakPoints.mobileLarge} {
    position: relative;
    padding: 0px;
    text-align: left;
  }
`;

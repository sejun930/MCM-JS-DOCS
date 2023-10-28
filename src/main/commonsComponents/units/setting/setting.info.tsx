import styled from "@emotion/styled";

import { _Link, _Button, _SpanText } from "mcm-js-commons";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { InitSettingInfoType } from "src/commons/store/store.types";

import Toggle from "./toggle";

export default function SettingInfoPage(props: {
  settingInfo: InitSettingInfoType;
  changeSettingsInfo: (key: string, value: boolean) => void;
}) {
  // 셋팅 정보 종합
  const { settingInfo, changeSettingsInfo } = props;

  return (
    <Wrapper>
      <ListWrapper>
        <List>
          <_Link href="/admin/block">관리자 로그인</_Link>
        </List>
        <List>
          <Button
            onClickEvent={() =>
              changeSettingsInfo("openFix", !settingInfo?.openFix || false)
            }
          >
            <_SpanText>모든 코드 열기 고정</_SpanText>
            <Toggle isOn={settingInfo?.openFix || false} />
          </Button>
        </List>
      </ListWrapper>
    </Wrapper>
  );
}

export const Wrapper = styled.article`
  width: 100%;
  height: 100%;
`;

export const ListWrapper = styled.ul`
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px 0px;
`;

export const List = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.25s ease;
  height: 24px;
  font-size: 18px;
  color: gray;

  a {
    height: 100%;
    width: 100%;
  }

  :hover {
    color: black;

    span {
      color: black;
    }

    :after {
      width: 100%;
    }
  }

  :after {
    content: "";
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: black;
    bottom: 0;
    transform: translateY(5px);
    transition: all 0.25s ease;
  }

  @media ${breakPoints.mobileLarge} {
    color: black;
  }
`;

export const Button = styled(_Button)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 18px;
    color: gray;
  }
`;

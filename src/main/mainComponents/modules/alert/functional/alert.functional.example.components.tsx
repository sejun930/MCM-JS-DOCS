import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import MyAlertExample from "../example/alert.example.template";
import { _PText } from "mcm-js-commons";

const AlertFunctionalExampleComponents = ({
  isClear,
}: {
  isClear?: boolean; // 초기화 여부
}) => {
  return (
    <ExampleWrapper>
      <ExampleItems>
        <_PText>Alert 오픈</_PText>
        {/* @ts-ignore */}
        <MyAlertExample
          children="Hello"
          btnText={isClear ? "Open Alert" : `Open with "Test" className Alert`}
          addProps={{
            className: "Test",
            children: isClear ? "Hello" : 'I have "Test" ClassName',
          }}
        />
      </ExampleItems>
      <ExampleItems>
        <_PText>Alert {isClear ? "초기화" : "종료"}</_PText>
        {/* @ts-ignore */}
        <MyAlertExample
          children="Hello"
          btnText={
            isClear ? "Clear All Alert" : 'Close with "Test" className Alert'
          }
          func={isClear ? "clearAlert" : "closeAlert"}
          addProps={{
            children: "",
            className: "Test",
          }}
        />
      </ExampleItems>
    </ExampleWrapper>
  );
};

export const ExampleWrapper = styled.div`
  display: flex;
  gap: 0px 10px;

  @media ${breakPoints.mobileLarge} {
    flex-direction: column;
    gap: 6px 0px;

    button {
      width: 260px;
    }
  }
`;

export const ExampleItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px 0px;
  color: gray;

  @media ${breakPoints.mobileLarge} {
    p {
      width: 75px;
    }

    flex-direction: row;
    align-items: center;
    gap: 0px 10px;
    font-size: 14px;
  }
`;

export default AlertFunctionalExampleComponents;

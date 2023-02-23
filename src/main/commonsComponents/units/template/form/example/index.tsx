import _SubTitleTemplate from "../../title/subTitle";
import styled from "@emotion/styled";

// import ModalBasicExample from "src/main/mainComponents/modules/modal/example/modal.basic.example";
import _Title from "../../../title";
import ModalExampleHomePage from "src/main/mainComponents/modules/modal/example";

export default function _ExampleForm() {
  return (
    <_SubTitleTemplate title="사용 예시">
      <ExampleWrapper>
        <ExampleItems>
          <_Title title="기본 (Basic)" titleLevel="h3" />
          <ExampleResult>
            <ModalExampleHomePage type="basic" />
          </ExampleResult>
        </ExampleItems>
        <ExampleItems>
          <_Title title="애니메이션 적용" titleLevel="h3" />
          <ExampleResult>
            <ModalExampleHomePage type="animation" />
          </ExampleResult>
        </ExampleItems>
        {/* <ExampleItems>
          <_Title title="모달 닫기 버튼 관련" titleLevel="h3" />
          <ExampleResult>
            <ModalExampleHomePage type="animation" />
          </ExampleResult>
        </ExampleItems> */}
      </ExampleWrapper>
    </_SubTitleTemplate>
  );
}

interface StyleTypes {
  offBoard?: boolean;
}

export const ExampleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 80px 50px;
`;

export const ExampleItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;

  h3 {
    font-size: 20px;
  }

  ._button_ {
    padding: 0.7rem 1.5rem;
    border-radius: 10px;
    background-color: #7b2869;
    color: white;
    font-weight: 700;
    font-size: 14px;
  }
`;

export const ExampleResult = styled.div`
  display: flex;
  width: 100%;
  border: solid 1px #dddddd;
  /* height: 180px; */
  margin-top: 15px;
  border-radius: 5px;
  padding: 1rem;

  ${(props: StyleTypes) =>
    props.offBoard && {
      border: "unset",
      height: "auto",
    }}
`;

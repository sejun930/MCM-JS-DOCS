import styled from "@emotion/styled";

// 코드 보기 및 감추기 아이콘 페이지
export default function _ExampleOptionalCodeIconPage({
  showCode,
}: {
  showCode: boolean;
}) {
  return (
    <Wrapper className="_example_code_icon_btn_">
      <LeftTem showCode={showCode}>{`<`}</LeftTem>
      <Fin showCode={showCode}>{`/`}</Fin>
      <RightTem showCode={showCode}>{`>`}</RightTem>
    </Wrapper>
  );
}

interface StyleTypes {
  showCode?: boolean;
}

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  span {
    position: absolute;
    font-size: 16px;
    transition: all 0.2s ease-out;
  }
`;

export const LeftTem = styled.span`
  margin-left: -10px;

  ${(props: StyleTypes) =>
    props.showCode && {
      marginLeft: "-8px",
    }}
`;

export const RightTem = styled.span`
  margin-left: 5px;

  ${(props: StyleTypes) =>
    props.showCode && {
      marginLeft: "4px",
    }}
`;

export const Fin = styled.span`
  transform: translate3d(0px, 0px, 0px);
  ${(props: StyleTypes) =>
    props.showCode && {
      transform: "translate3d(1.5px, -5px, 0px)",
    }}
`;

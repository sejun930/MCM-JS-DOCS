import styled from "@emotion/styled";

// 404 에러 발생시 렌더되는 화면
export default function ErrorRenderPage() {
  return <ErrorWrapper>여기는 잘못된 페이지입니다.</ErrorWrapper>;
}

export const ErrorWrapper = styled.article`
  padding: 1rem;
  /* width: 100%;
  height: 100%; */
`;

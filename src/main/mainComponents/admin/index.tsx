import styled from "@emotion/styled";

import WithAuthAdmin from "src/main/commonsComponents/withAuth";

function AdminHomePage() {
  return <Wrapper>관리자 페이지</Wrapper>;
}

export default WithAuthAdmin(AdminHomePage);

export const Wrapper = styled.div`
  display: flex;
`;

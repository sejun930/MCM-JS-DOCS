import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { adminNavList } from "src/main/commonsComponents/layout/nav/nav.data";
import { _Title } from "mcm-js-commons";

import WithAuthAdmin from "src/main/commonsComponents/withAuth";
import { AdminModulesList } from "./module.list";

function AdminHomePage() {
  const [module] = useRecoilState(moduleState);

  return (
    <Wrapper id="admin-home-wrapper">
      <_Title className="admin-module-title">
        {adminNavList.filter((info) => info.name === module)[0]?.remarks || ""}
      </_Title>
      {module && AdminModulesList[module]}
    </Wrapper>
  );
}
export default WithAuthAdmin(AdminHomePage);

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px 0px;

  .admin-module-title {
    font-size: 40px;
  }

  @media ${breakPoints.mobileLarge} {
    text-align: center;
    gap: 80px 0px;
  }
`;

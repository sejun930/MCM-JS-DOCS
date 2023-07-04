import WithAuthAdmin from "src/main/commonsComponents/withAuth";
import Template from "src/main/commonsComponents/units/template/main";

function AdminHomePage() {
  return <Template>관리자 페이지</Template>;
}

export default WithAuthAdmin(AdminHomePage);

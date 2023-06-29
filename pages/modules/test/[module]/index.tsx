import { Router } from "next/router";

import ModulePage from "src/main/mainComponents/modules";

export default function ModuleDynamicPage(props: { module: string }) {
  let { module } = props;

  if (module)
    module = module[0].toUpperCase() + module.substring(1).toLowerCase();

  return <ModulePage module={module} />;
}

export const getServerSideProps = (context: Router) => {
  // 서버사이드 렌더링 시도시 => out 폴더 생성 안됨 : 빌드 자체가 안됨
  // next.config.js 에서 명령어 추가하기
  const { module } = context.query;

  return {
    props: {
      module,
    },
  };
};

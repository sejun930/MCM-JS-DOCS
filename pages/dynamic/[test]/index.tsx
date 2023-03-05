import { Router, useRouter } from "next/router";

export default function MCMDynamicPageTestPage(props: { test: string }) {
  const router = useRouter();

  return <>{props.test} 페이지 입니다.</>;
}

export const getServerSideProps = (context: Router) => {
  // 서버사이드 렌더링 시도시 => out 폴더 생성 안됨 : 빌드 자체가 안됨
  // next.config.js 에서 명령어 추가하기
  const { test } = context.query;

  return {
    props: {
      test,
    },
  };
};

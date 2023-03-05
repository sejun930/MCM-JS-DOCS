import { useRouter } from "next/router";

export default function MCMDynamicPageTestPage() {
  const router = useRouter();

  return <>{router.query.test} 페이지 입니다.</>;
}

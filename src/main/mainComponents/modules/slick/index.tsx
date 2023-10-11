import { Popular } from "mcm-js-dev";
import { useState } from "react";

export default function PopularExamplePage() {
  // 노출될 리스트들을 state 값에 저장합니다. (권장)
  const [list] = useState([
    <p> 서해안 골뱅이 500g </p>,
    <p> 허니레몬 캔디 450p 1.26kg, 1개 </p>,
    <p> 프로틴 더블 리치 초콜릿 맛, 2.268kg </p>,
    <p> 국내산 논 우렁살 (냉장), 180g, 1개 </p>,
    <p> [원두커피1kg] 갓 볶은 신선한 원두커피 1kg </p>,
  ]);

  return (
    <Popular
      list={list}
      minHeight={{ web: 40, mobile: 50 }}
      changeListEvent={(idx) => {}}
    />
  );
}

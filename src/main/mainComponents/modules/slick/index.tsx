import { Popular } from "mcm-js-dev";
import { useState } from "react";

export default function PopularExamplePage() {
  // 노출될 리스트들을 state 값에 저장합니다. (권장)
  const [list] = useState([
    "서해안 골뱅이 500g",
    "허니레몬 캔디 450p 1.26kg, 1개",
    "프로틴 더블 리치 초콜릿 맛, 2.268kg",
    "국내산 논 우렁살 (냉장), 180g, 1개",
    "[원두커피1kg] 갓 볶은 신선한 원두커피 1kg",
  ]);

  return (
    <Popular
      list={list} // 노출할 리스트를 입력합니다. (필수)
      minHeight={{ web: 40 }} // 모듈의 최소 높이값을 지정합니다. (필수)
    />
  );
}

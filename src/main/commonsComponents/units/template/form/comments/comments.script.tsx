import { useState } from "react";
import CommentsPage from "./comments.container";

export default function CommentsScript() {
  // 스크립트 호출 완료 여부
  const [render, setRender] = useState(false);

  console.log("렌더");
  return <CommentsPage />;
}

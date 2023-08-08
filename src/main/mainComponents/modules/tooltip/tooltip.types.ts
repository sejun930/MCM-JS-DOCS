import { ReactNode } from "react";

// 예시용 컴포넌트들에 적용되는 타입
export interface TooltipExampleCommonsTypes {
  isShow: Array<boolean>;
  tooltipText: string | ReactNode;
  children: string | ReactNode;
}

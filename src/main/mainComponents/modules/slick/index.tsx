import { Tooltip } from "mcm-js";

export default function TooltipExamplePage() {
  return (
    <Tooltip useShowAnimation={true} tooltipText={<img src="이미지 주소" />}>
      <p> Hello </p>
    </Tooltip>
  );
}

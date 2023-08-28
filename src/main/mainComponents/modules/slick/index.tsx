import { Tooltip } from "mcm-js-dev";

export default function TooltipExamplePage() {
  return (
    <Tooltip tooltipText="Already fixed" offHoverEvent={true} open={true}>
      <span> offHoverEvent </span>
    </Tooltip>
  );
}

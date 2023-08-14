import { Tooltip } from "mcm-js";

export default function TooltipExamplePage() {
  return (
    <Tooltip
      tooltipText="New Mobile Style Tooltip"
      tooltipMobileStyles={{
        backgroundColor: "white",
        padding: "20px",
        font: {
          color: "#F86F03",
          size: "20px",
          weight: 500,
        },
        border: {
          color: "#F86F03",
          width: "3px",
          radius: "0px",
        },
      }}
    >
      <p> Open New Mobile Style Tooltip </p>
    </Tooltip>
  );
}

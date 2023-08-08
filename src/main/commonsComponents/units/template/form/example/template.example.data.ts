import MyModalExample from "src/main/mainComponents/modules/modal/example/modal.example.template";
import MyTooltipExample from "src/main/mainComponents/modules/tooltip/example/tooltip.example.template";

export const renderTemplateList: {
  [key: string]: (props: any) => JSX.Element;
} = {
  Modal: MyModalExample,
  Tooltip: MyTooltipExample,
};

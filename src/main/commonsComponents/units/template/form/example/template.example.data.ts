import MyModalExample from "src/main/mainComponents/modules/modal/example/modal.example.template";
import MyTooltipExample from "src/main/mainComponents/modules/tooltip/example/tooltip.example.template";
import MySliderExample from "src/main/mainComponents/modules/slider/example/slider.example.template";
import MyAlertExample from "src/main/mainComponents/modules/alert/example/alert.example.template";

export const renderTemplateList: {
  [key: string]: (props: any) => JSX.Element;
} = {
  Modal: MyModalExample,
  Tooltip: MyTooltipExample,
  Slider: MySliderExample,
  Alert: MyAlertExample,
};

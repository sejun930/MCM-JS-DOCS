import MyModalExample from "src/main/mainComponents/modules/modal/example/modal.example.template";
import MyTooltipExample from "src/main/mainComponents/modules/tooltip/example/tooltip.example.template";
import MySliderExample from "src/main/mainComponents/modules/slider/example/slider.example.template";
import MyAlertExample from "src/main/mainComponents/modules/alert/example/alert.example.template";
import MyPopularExample from "src/main/mainComponents/modules/popular/example/popular.example.template";

export const renderTemplateList: {
  [key: string]: (props: any) => JSX.Element;
} = {
  Modal: MyModalExample,
  Tooltip: MyTooltipExample,
  Slider: MySliderExample,
  // @ts-ignore
  Alert: MyAlertExample,
  Popular: MyPopularExample,
};

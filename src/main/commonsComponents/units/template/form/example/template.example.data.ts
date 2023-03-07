import MyModalExample from "src/main/mainComponents/modules/modal/example/modal.example.template";

export const renderTemplateList: {
  [key: string]: (props: any) => JSX.Element;
} = {
  Modal: MyModalExample,
};

import ModalExampleRenderPage from "src/main/mainComponents/modules/modal/example";

export const renderTemplateList: {
  [key: string]: (props: any) => JSX.Element;
} = {
  Modal: ModalExampleRenderPage,
};

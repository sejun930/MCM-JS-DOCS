import { modalPropsList } from "src/main/mainComponents/modules/modal/props/modal.propsList";

export interface PropsModuleListType {
  name: string;
  default: any;
  type:
    | "Boolean"
    | "String"
    | "Number"
    | "Function"
    | "Object"
    | "[Boolean]"
    | "[String]"
    | "[Number]"
    | "[Object]"
    | "[Function]";
  notice: string;
  isRequired?: boolean;
}

export const propsModuleList: {
  [key: string]: Array<PropsModuleListType>;
} = {
  Modal: modalPropsList,
};

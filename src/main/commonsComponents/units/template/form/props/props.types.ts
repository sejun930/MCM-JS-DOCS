export type PropsCodeTypes = {
  type: "function" | "bool" | "string" | "obj" | "number" | "array" | "custom";
  argu?: any;
};

export interface PropsModuleListType {
  name: string;
  default: any;
  type:
    | "Boolean"
    | "String"
    | "Number"
    | "Function"
    | "Object"
    | "Node"
    | "String | Node"
    | "[Boolean]"
    | "[String]"
    | "[Number]"
    | "[Object]"
    | "[Function]"
    | "[Node]"; // 타입 혼합
  notice: string;
  isRequired?: boolean;
  code: PropsCodeTypes;
  changeCode?: string; // 대체해서 사용될 코드 (있다면 이 코드를 먼저 출력)

  // code: string | Array<string>;
}

type OmitCodeType = Omit<PropsModuleListType, "code">;
export type PropsModuleListResultType = OmitCodeType & {
  code: string;
};
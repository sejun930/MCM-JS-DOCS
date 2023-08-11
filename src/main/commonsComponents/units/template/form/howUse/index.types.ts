// 예시용 코드 리스트
export interface ExampleCodeListStringTypes {
  [key: string]: (a1?: any, a2?: any) => string | Array<string>;
}

// export interface ExampleCodeListWithFunctionTypes {
//   [key: string]: ;
// }

export type ExampleCodeListTypes = ExampleCodeListStringTypes;
// | ExampleCodeListWithFunctionTypes;

// export interface ExampleCodeListTypes {
//   [key: string]: string[];
// }

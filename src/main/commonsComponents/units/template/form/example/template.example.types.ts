import { ModalExampleCommonsTypes } from "src/main/mainComponents/modules/modal/modal.types";
import { ModalPropsType } from "mcm-js/dist/commons/types";

// 예시 컴포넌트의 부가적인 옵션 타입
export interface ExampleContentsInfoTypes {
  idx?: number; // 실행 인덱스 값 지정
  subTitle?: string; // 각각의 예시의 서브 타이틀
  subRemarks?: string; // 각각의 예시의 서브 설명
  buttonName: string; // 실행 버튼에 노출될 이름값
}

// 각각의 페이지의 예시 컴포넌트에 전달될 props 타입
export interface ExampleContentsTypes {
  info: ExampleContentsInfoTypes;
  addProps?: ModalPropsType; // 예시 컴포넌트 실행시 추가적으로 넘길 props 값
  commonsProps?: ModalExampleCommonsTypes; // 컴포넌트 실행하기 위해 필요한 Props 값
  content: string; // 모듈 실행시 함께 렌더될 데이터
  code: null | Array<string>; // 렌더되는 코드 정보
  remakrs: string; // 예시 설명
  isError?: boolean; // 에러 여부
  vers?: number;
}

// 각각의 페이지에서 전달될 props 타입
export interface ExampleIProps {
  title: string; // 예시 타이틀
  contents: Array<ExampleContentsTypes>;
  isFull?: boolean; // 화면을 분할해서 사용하지 않고 block 요소로 전체 사용
  isError?: boolean; // 에러케이스 여부
  isHide?: boolean; // 노출 여부 (true일 경우 숨기기)
}

export interface IProps {
  exampleList: Array<ExampleIProps>;
  initProps: ModalPropsType;
  commonsProps: ModalExampleCommonsTypes;
}

export interface UIProps {
  openList: Array<boolean>;
  changeOpenList: (idx: number, list?: Array<boolean>, all?: boolean) => void;
  isOneOpen: boolean;
  allLen: number;
}

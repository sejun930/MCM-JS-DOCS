import {
  ModalExamplePropsTypes,
  ModalExampleAddTypes,
} from "src/main/mainComponents/modules/modal/modal.types";

// 각각의 페이지의 예시 컴포넌트에 전달될 props 타입
export interface ExampleContentsTypes {
  subTitle?: string; // 각각의 예시의 서브 타이틀
  subRemarks?: string; // 각각의 예시의 서브 설명
  addProps?: ModalExampleAddTypes; // 예시 컴포넌트 실행시 추가적으로 넘길 props 값
  _props?: ModalExamplePropsTypes; // 예시에서 공동으로 사용되는 props 값
  buttonName: string; // 실행 버튼에 노출될 이름값
}

// 각각의 페이지에서 전달될 props 타입
export interface ExampleIProps {
  title: string; // 예시 타이틀
  remakrs: string; // 예시 설명
  contents: Array<ExampleContentsTypes>;
  isFull?: boolean; // 모든 화면을 사용할 건지?
}

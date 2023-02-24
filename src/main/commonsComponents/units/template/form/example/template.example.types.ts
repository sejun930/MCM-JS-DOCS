export interface ExampleContentsTypes {
  subTitle?: string; // 각각의 예시의 서브 타이틀
  subRemarks?: string; // 각각의 예시의 서브 설명
  component: (props: any) => JSX.Element; // 예시 컴포넌트
}

export interface ExampleIProps {
  title: string; // 예시 타이틀
  remakrs: string; // 예시 설명
  exampleContents: Array<ExampleContentsTypes>;
  isFull?: boolean; // 모든 화면을 사용할 건지?
}

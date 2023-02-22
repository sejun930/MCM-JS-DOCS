interface IProps {
  title: string;
}

// 모듈별 사용 예시 데이터
export const ExampleList: { [key: string]: Array<IProps> } = {
  Modal: [
    {
      title: "기본값 (Default)",
    },
    {
      title: "애니메이션 OFF",
    },
  ],
};

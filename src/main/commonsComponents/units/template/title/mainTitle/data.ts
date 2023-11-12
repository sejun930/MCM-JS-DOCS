interface ModuleTypes {
  Modal: string;
  Tooltip: string;
  Slider: string;
  Alert: string;
  Popular: string;
}

type ModuleListTypes = { [key: string]: string } & ModuleTypes;

// 메인 제목에 따라오는 부가설명 리스트
export const moduleRemarksList: ModuleListTypes = {
  Modal: `알림, 실행, 결과 등을 디자인된 UI로 사용자에게 제공할 수 있습니다. <br />
  useState를 사용하거나 함수를 이용해 Modal을 실행하거나 종료할 수 있습니다.
  `,
  Tooltip: `텍스트 및 이미지에 대한 설명을 제공하는데 유용하게 사용될 수 있습니다.`,
  Slider: `여러개의 컴포넌트들을 순차적으로 나열하여 렌더할 때 사용할 수 있습니다.`,
  Alert: `알림, 경고 등의 메세지를 화면 최상위에 노출시킬 수 있습니다. <br />메세지의 컨셉에 맞는 알림으로 각각의 역할을 담당할 수 있습니다.`,
  Popular: `인기 게시글의 제목, 상품명 등의 기본 정보를 사용자에게 순차적으로 보여주기에 적합합니다.`,
};

// 모듈 별 마지막 업데이트 날짜
export const moduleUpdateList: ModuleListTypes = {
  // Modal: "2023.12.05",
  Modal: "2023.10.08",
  Tooltip: "2023.08.20",
  // Tooltip: "2023.10.25",
  Slider: "2023.11.12",
  // Slider: "2023.10.25",
  Alert: "2023.10.11",
  // Alert: "2023.10.25",
  Popular: "2023.11.12",
  // Popular: "2023.10.25",
};

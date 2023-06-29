// 목차의 옵션 리스트 데이터
export const indexOptionalDataList: Array<{
  tooltipText: string | Array<string>; // tooltip 모듈에 함께 사용될 텍스트 내용
  target: string; // state의 어떤 데이터를 기준으로 할 것인지 (props로 전달된 데이터의 이름과 동일해야 함)
  isClose: boolean; // 닫기 용도로만 사용이 되는지?
  emoji?: string | Array<string> | null; // 렌더될 이모지
  clickEvent?: string; // 버튼 클릭 함수 이름
}> = [
  {
    tooltipText: ["목차 고정", "목차 가리기"],
    target: "fix",
    isClose: false,
    emoji: "📌",
    clickEvent: "toggleFix",
  },
  {
    tooltipText: ["최소화", "최대화"],
    target: "isMinimum",
    isClose: false,
    emoji: ["↙", "↗"],
    clickEvent: "toggleMinimum",
  },
  { tooltipText: "목차 닫기", target: "close", isClose: true },
];

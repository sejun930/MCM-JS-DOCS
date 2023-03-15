export interface CodeTypes {
  text: string; // 복사할 텍스트 내용
  showText?: string; // 실제로 보여질 내용, 있다면 text보다 우선으로 보여진다.
  className?: string; // 클래스네임 지정
  onlyClickButton?: boolean; // 복사 버튼을 클릭할 때만 복사 여부 지정 (default : false)
  copiedMessage?: string; // 복사 완료시 출력되는 완료 메세지 (default : "복사되었습니다.")
  type?: "Text" | "Code"; // 복사할 텍스트의 타입 지정 (default : Text)
  // ex) Code를 선택할 경우 자바스크립트 코드를 사용
  isMinimum?: boolean; // 복사 아이콘만 출력 (default : false)
  offCopyAnimation?: boolean; // 복사 애니메이션 끄기 (default : false)
}

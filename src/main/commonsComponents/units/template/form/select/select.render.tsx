import { CSSProperties, MutableRefObject, ReactElement } from "react";
import _SelectForm from "./select.container";

export interface SelectProps {
  show: boolean; // select창 오픈 여부 (true일 경우 오픈)
  closeEvent: () => void; // select창 종료 함수
  className?: string; // 추가 클래스 네임
  styles?: CSSProperties; // 적용될 스타일
  children: Array<ReactElement>; // 렌더될 select 리스트
  offAutoClose?: boolean; // 외부 클릭시 자동 종료 OFF (true일 경우 닫기 버튼을 클릭할 경우에만 종료)
  onMouseOverEvent?: () => {}; // mouseOver Event
  onMouseLeaveEvent?: () => {}; // mouseLeave Event
}

export interface IProps {
  _wrapperRef: MutableRefObject<HTMLDivElement>;
  _listRef: MutableRefObject<HTMLUListElement>;
  closeSelect: () => void;
}

export default function _SelectRenderPage(props: SelectProps) {
  return (props.show && <_SelectForm {...props} />) || <></>;
}

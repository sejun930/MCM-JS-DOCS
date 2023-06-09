import { useRef, MutableRefObject, useEffect } from "react";
import _SelectFormUIPage from "./select.presenter";

import { SelectProps } from "./select.render";

export default function _SelectForm(props: SelectProps) {
  const { show, closeEvent, offAutoClose, autoCloseOffTargetName } = props;
  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _listRef = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    const body = document.body;

    // 전체 크기 구하기
    let height = 0;
    if (_listRef.current) height = _listRef.current.clientHeight + 4;

    if (show && !offAutoClose) {
      // 외부 클릭시 자동 종료 설정
      body.addEventListener("mousedown", handleClickEvent);
    }

    if (_wrapperRef.current) {
      window.setTimeout(() => {
        _wrapperRef.current.style.height = `${height}px`;
      }, 0);
    }

    return () => {
      if (!offAutoClose)
        body.removeEventListener("mousedown", handleClickEvent);
    };
  }, [show]);

  // 외부 클릭시 닫기
  const handleClickEvent = (event: MouseEvent) => {
    let autoCloseAble =
      _wrapperRef.current &&
      !_wrapperRef.current.contains(event.target as Node);

    // 클릭 범위 조절 (해당 id 값을 가지는 element가 있다면 작동 안함)
    if (autoCloseOffTargetName) {
      autoCloseAble =
        autoCloseAble &&
        !document.querySelectorAll(`[data-name="${autoCloseOffTargetName}"]`)
          .length;
    }

    if (autoCloseAble) {
      closeSelect();
    }
  };

  // 닫기
  const closeSelect = () => {
    if (_wrapperRef?.current?.style) _wrapperRef.current.style.height = "0px";

    window.setTimeout(() => {
      closeEvent();
    }, 200);
  };

  return (
    <_SelectFormUIPage
      {...props}
      _wrapperRef={_wrapperRef}
      _listRef={_listRef}
      closeSelect={closeSelect}
    />
  );
}

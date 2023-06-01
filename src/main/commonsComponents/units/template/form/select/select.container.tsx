import { useRef, MutableRefObject, useEffect } from "react";
import _SelectFormUIPage from "./select.presenter";

import { SelectProps } from "./select.render";

// let ableClose = true; // 닫기가 가능한지?
export default function _SelectForm(props: SelectProps) {
  const { show, closeEvent, offAutoClose } = props;
  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _listRef = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    const body = document.body;

    // 전체 크기 구하기
    let height = 0;
    if (_listRef.current) height = _listRef.current.clientHeight + 4;

    if (show && !offAutoClose) {
      // 외부 클릭시 자동 종료 설정
      //   ableClose = false;
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
      //   ableClose = true;
    };
  }, [show]);

  // 외부 클릭시 닫기
  const handleClickEvent = (event: any) => {
    if (_wrapperRef.current && !_wrapperRef.current.contains(event.target)) {
      closeSelect();
    }
  };

  // 닫기
  const closeSelect = () => {
    // ableClose = false;
    if (_wrapperRef?.current?.style) _wrapperRef.current.style.height = "0px";

    window.setTimeout(() => {
      closeEvent();
      //   ableClose = true;
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

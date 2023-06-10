import { useRef, MutableRefObject, useEffect, useState } from "react";
import _SelectFormUIPage from "./select.presenter";

import { SelectProps } from "./select.render";

export default function _SelectForm(props: SelectProps) {
  const { show, closeEvent, offAutoClose, autoCloseOffTargetName, children } =
    props;
  // Select 컴포넌트 최종 렌더 여부
  const [render, setRender] = useState(false);

  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _listRef = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    const body = document.body;

    if (show) {
      setRender(true);

      if (!offAutoClose) {
        // 외부 클릭시 자동 종료 설정
        body.addEventListener("mousedown", handleClickEvent);

        return () => {
          body.removeEventListener("mousedown", handleClickEvent);
        };
      }
    } else {
      closeSelect();
    }
  }, [show]);

  useEffect(() => {
    if (render) {
      // 선택창 전체 크기 구하기
      resizeSelect();
    } else {
      closeSelect();
    }
  }, [render]);

  useEffect(() => {
    if (render && show) resizeSelect();
  }, [children]);

  // 선택창 전체 크기 변경하기
  const resizeSelect = () => {
    if (_listRef.current && _wrapperRef.current) {
      window.setTimeout(() => {
        // 전체 크기 구하기
        _wrapperRef.current.style.height = `${
          _listRef.current.clientHeight + 4
        }px`;
      }, 0);
    }
  };

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
      if (closeEvent) {
        setRender(false);
        closeEvent();
      }
    }, 200);
  };

  return (
    <_SelectFormUIPage
      {...props}
      _wrapperRef={_wrapperRef}
      _listRef={_listRef}
      closeSelect={closeSelect}
      render={render}
    />
  );
}

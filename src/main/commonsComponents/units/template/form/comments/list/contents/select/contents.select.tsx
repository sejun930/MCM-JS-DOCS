import {
  Select,
  SelectItems,
  SelectListWrapper,
  SelectWrapper,
} from "./contents.select.styles";

import CommonsHooksComponents from "../../../../../../../hooks/commonsHooks";

import { _CloseButton, _Button } from "mcm-js-commons";
import { CSSProperties, MutableRefObject, useEffect, useRef } from "react";

import { Modal } from "mcm-js";
import ContentsOptionalPage from "./contents.select.optional";

let ableClose = true;
export default function SelectListOptional({
  list,
  styles,
  contents,
  className,
  closeEvent,
  show,
}: {
  show: boolean;
  list: Array<{ name: string; value: "delete" | "modify" }>;
  contents: string;
  closeEvent: () => void;
  styles?: CSSProperties;
  className?: string;
}) {
  const { getAllComponentsClassName, getUuid } = CommonsHooksComponents();
  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _listRef = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    const body = document.body;

    // 전체 크기 구하기
    let height = 0;
    if (_listRef.current) height = _listRef.current.clientHeight + 4;

    if (show) {
      body.addEventListener("mousedown", handleClickEvent);

      if (_wrapperRef.current) {
        window.setTimeout(() => {
          _wrapperRef.current.style.height = `${height}px`;
        }, 0);
      }
    }

    return () => {
      body.removeEventListener("mousedown", handleClickEvent);
    };
  }, [show]);

  // 외부 클릭시 닫기
  const handleClickEvent = (event: any) => {
    if (_wrapperRef.current && !_wrapperRef.current.contains(event.target)) {
      if (ableClose) closeSelect();
    }
  };

  // 닫기
  const closeSelect = () => {
    ableClose = false;
    _wrapperRef.current.style.height = "0px";

    window.setTimeout(() => {
      closeEvent();
      ableClose = true;
    }, 250);
  };

  // 댓글 삭제하기
  const deleteComments = (type: "delete" | "modify") => () => {
    ableClose = false;

    Modal.open({
      children: <ContentsOptionalPage type={type} contents={contents} />,
      onAfterCloseEvent: () => (ableClose = true),
      modalStyles: {
        border: "double 5px #aa5656",
      },
      modalSize: { width: "400px", height: "400px" },
      closeMent: "닫기",
    });
  };

  return (
    (show && (
      <SelectWrapper
        className={getAllComponentsClassName("mcm-unit-select", className)}
        style={styles}
        ref={_wrapperRef}
      >
        <_CloseButton
          className="select-close-button"
          onClickEvent={closeSelect}
        />
        <SelectItems>
          {list && list.length && (
            <SelectListWrapper ref={_listRef}>
              {list.map((el) => {
                return (
                  <Select key={getUuid()}>
                    <_Button onClickEvent={deleteComments(el.value)}>
                      {el.name}
                    </_Button>
                  </Select>
                );
              })}
            </SelectListWrapper>
          )}
        </SelectItems>
      </SelectWrapper>
    )) || <></>
  );
}

import {
  Select,
  SelectItems,
  SelectListWrapper,
  SelectWrapper,
} from "./contents.select.styles";
import { CSSProperties, MutableRefObject, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { adminLoginInfoState, moduleState } from "src/commons/store";

import CommonsHooksComponents from "../../../../../../../hooks/commonsHooks";
import { getUuid } from "src/main/commonsComponents/functional";
import { _CloseButton, _Button } from "mcm-js-commons";

import ContentsOptionalPage from "./functional/contents.select.functional.container";
import { CommentsAllInfoTypes, InfoTypes } from "../../../comments.types";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Modal } = getLibraries();

let ableClose = true;
export default function SelectListOptional({
  list,
  styles,
  info,
  className,
  closeEvent,
  show,
  fetchCommentsList,
}: {
  show: boolean;
  list: Array<{ name: string; value: "delete" | "modify" }>;
  info: InfoTypes;
  closeEvent: () => void;
  styles?: CSSProperties;
  className?: string;
  fetchCommentsList: (info?: CommentsAllInfoTypes) => void;
}) {
  const { getAllComponentsClassName } = CommonsHooksComponents();
  const _wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const _listRef = useRef() as MutableRefObject<HTMLUListElement>;

  const [adminLoginInfo] = useRecoilState(adminLoginInfoState);
  const [module] = useRecoilState(moduleState);

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
      ableClose = true;
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
    if (_wrapperRef?.current?.style) _wrapperRef.current.style.height = "0px";

    window.setTimeout(() => {
      closeEvent();
      ableClose = true;
    }, 250);
  };

  // 댓글 수정 & 삭제하기
  const deleteComments = (type: "delete" | "modify") => () => {
    ableClose = false;

    Modal.open({
      children: (
        <ContentsOptionalPage
          type={type}
          info={info}
          adminLoginInfo={adminLoginInfo}
          module={module}
          fetchCommentsList={fetchCommentsList}
        />
      ),
      id: "comments-functional-modal",
      // modalSize: { width: "400px", height: "400px" },
      closeMent: "닫기",
      showBGAnimation: true,
      showModalOpenAnimation: true,
      offAutoClose: true,
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
              {list.map((el, idx) => {
                idx = idx + 1;

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

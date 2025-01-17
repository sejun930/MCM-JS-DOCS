import ListContentsInfoUIPage from "./list.contents.presenter";
import {
  MouseEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRecoilState } from "recoil";
import { adminLoginInfoState, moduleState } from "src/commons/store";

import { CommentsAllInfoTypes, InfoTypes } from "../../comments.types";
import ContentsOptionalPage from "src/main/commonsComponents/units/template/form/comments/list/contents/select/functional/contents.select.functional.container";
import { ListContentsSelectType } from "./list.data";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Modal } = getLibraries();

export interface ListContentsIProps {
  info: InfoTypes;
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
  fetchCommentsList: (info?: CommentsAllInfoTypes) => void;
}

const MAX_LINE = 160; // 더 보기가 실행 될 최소 글자수

export default function ListContentsInfoPage(props: ListContentsIProps) {
  const { info, changeInfo, fetchCommentsList } = props;
  const { contents } = info;

  const [adminLoginInfo] = useRecoilState(adminLoginInfoState);
  const [module] = useRecoilState(moduleState);

  // 더 보기 기능 (8줄 이상 넘어갈 경우에만 적용)
  const [subContents, setSubContents] = useState("");
  const [isMore, setIsMore] = useState(false);
  // 더 보기 실행
  const [moreShow, setMoreShow] = useState(false);
  // 선택 리스트 실행 여부
  const [showSelect, setShowSelect] = useState(false);
  // select 여부
  const [hover, setHover] = useState(false);
  // 자동닫기 사용 가능 여부
  // const [ableAutoClose, setAbleAutoClose] = useState(false);

  const Name: string = String(
    Number(new Date()) + Math.floor(Math.random() * (10 - 1) + 1)
  );

  const _wrapperRef = useRef() as MutableRefObject<HTMLLIElement>;

  useEffect(() => {
    // 더보기 여부 결정하기
    let allLen = 0;
    let str = "";

    // 공백 처리하기
    contents.split("<br />").forEach((el, idx) => {
      if (idx && allLen < MAX_LINE) {
        str += "<br />";
        allLen += 20;
      }

      if (allLen < MAX_LINE) {
        str += el;
        allLen += el.length;
      }
    });

    setSubContents(
      str.substring(0, MAX_LINE) + ((allLen >= MAX_LINE && "...") || "")
    );
    setIsMore(allLen >= MAX_LINE);
  }, []);

  // 더 보기 & 간략히 토글
  const toggleMoreShow = (e?: MouseEvent<HTMLButtonElement>) => {
    if (e) e.stopPropagation();
    setMoreShow((prev) => !prev);
  };

  const toggleShowSelect = (bool?: boolean) => {
    if (adminLoginInfo.isTest) return;

    setShowSelect(bool !== undefined ? bool : (prev) => !prev);
    setHover(Boolean(bool));
  };

  // 댓글 삭제하기
  const deleteComments = (type: ListContentsSelectType, name: string) => () => {
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
      name,
      modalSize: { width: "460px", height: "480px" },
      mobileModalSize: { width: "90%", height: "500px" },
      closeMent: "닫기",
      showBGAnimation: true,
      showModalOpenAnimation: true,
      onFixWindow: true,
      offAutoClose: type === "modify",
      modalStyles: {
        wrapper: {
          zIndex: 9999,
        },
      },
      // onAfterCloseEvent: () => {
      //   if (ableAutoClose) setAbleAutoClose(false);
      // },
    });
  };

  return (
    <ListContentsInfoUIPage
      {...props}
      subContents={subContents}
      isMore={isMore}
      toggleMoreShow={toggleMoreShow}
      moreShow={moreShow}
      contents={contents}
      showSelect={showSelect}
      toggleShowSelect={toggleShowSelect}
      deleteComments={deleteComments}
      hover={hover}
      name={Name}
      _wrapperRef={_wrapperRef}
      changeInfo={changeInfo}
      adminLoginInfo={adminLoginInfo}
    />
  );
}

import ListContentsInfoUIPage from "./list.contents.presenter";
import {
  MouseEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { Modal } from "mcm-js";
// const { Modal } = require(Boolean(process.env.NEXT_PUBLIC_DEVELOP)
//   ? "mcm-js-dev"
//   : "mcm-js");
import {
  CategoryTypes,
  CommentsAllInfoTypes,
  InfoTypes,
} from "../../comments.types";
import ContentsOptionalPage from "src/main/commonsComponents/units/template/form/comments/list/contents/select/functional/contents.select.functional.container";

export interface ListContentsIProps {
  info: InfoTypes;
  modifyComments: (comment: InfoTypes, isDelete?: boolean) => Promise<boolean>;
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
}

const MAX_LINE = 160; // 더 보기가 실행 될 최소 글자수

export default function ListContentsInfoPage(props: ListContentsIProps) {
  const { info, modifyComments, changeInfo } = props;
  const { contents } = info;

  const [module] = useRecoilState(moduleState);

  // 더 보기 기능 (8줄 이상 넘어갈 경우에만 적용)
  const [subContents, setSubContents] = useState("");
  const [isMore, setIsMore] = useState(false);
  // 더 보기 실행
  const [moreShow, setMoreShow] = useState(false);
  // 선택 리스트 실행 여부
  const [showSelect, setShowSelect] = useState(false);
  // hover 여부
  const [hover, setHover] = useState(false);

  const Name: string = String(
    Number(new Date()) + Math.floor(Math.random() * (10 - 1) + 1)
  );

  const _wrapperRef = useRef() as MutableRefObject<HTMLLIElement>;

  useEffect(() => {
    let allLen = 0;
    let str = "";

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
    setShowSelect(bool !== undefined ? bool : (prev) => !prev);
    setHover(Boolean(bool));
  };

  // 댓글 삭제하기
  const deleteComments = (type: "delete" | "modify", name: string) => () => {
    Modal.open({
      children: (
        <ContentsOptionalPage
          type={type}
          info={info}
          module={module}
          modifyComments={modifyComments}
        />
      ),
      id: "comments-functional-modal",
      name,
      modalSize: { width: "460px", height: "480px" },
      closeMent: "닫기",
      showBGAnimation: true,
      showModalOpenAnimation: true,
      onFixWindow: true,
      offAutoClose: type === "modify",
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
    />
  );
}

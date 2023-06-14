import { InfoTypes } from "../comments.types";
import CommentsListUIPage from "./comments.list.presenter";

import { categoryInitList } from "../write/comments.write.types";
import CommentsLabel from "./label";
import StarsForm from "../write/stars";

import { CommentsAllInfoTypes } from "../comments.types";
import { _Button, _SpanText } from "mcm-js-commons";
import { MouseEvent, MutableRefObject, useEffect, useRef } from "react";

let search = "";
export default function CommentsListPage({
  commentsInfo,
  modifyComments,
  changeInfo,
}: {
  commentsInfo: CommentsAllInfoTypes;
  modifyComments: (comment: InfoTypes, isDelete?: boolean) => Promise<boolean>;
  changeInfo: (info: CommentsAllInfoTypes) => void;
}) {
  const listRef = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.minHeight = "0px";

      window.setTimeout(() => {
        listRef.current.style.minHeight = listRef.current.scrollHeight + "px";
      }, 0);
    }
  }, [commentsInfo]);

  return (
    <CommentsListUIPage
      commentsInfo={commentsInfo}
      modifyComments={modifyComments}
      changeInfo={changeInfo}
      listRef={listRef}
    />
  );
}

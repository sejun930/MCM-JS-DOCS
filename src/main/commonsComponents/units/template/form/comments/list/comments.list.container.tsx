import { InfoTypes } from "../comments.types";
import CommentsListUIPage from "./comments.list.presenter";

import { categoryInitList } from "../write/comments.write.types";
import CommentsLabel from "./label";
import StarsForm from "../write/stars";

import { CommentsAllInfoTypes } from "../comments.types";
import { _Button, _SpanText } from "mcm-js-commons";
import { MutableRefObject, useEffect, useRef } from "react";

let search = "";
let saveCategory = "all";
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
        const scrollHeight = listRef.current.scrollHeight;
        listRef.current.style.minHeight = `${scrollHeight}px`;

        // 카테고리를 이동한 경우 : 스크롤을 카테고리 리스트 위치로 이동
        if (saveCategory !== commentsInfo.selectCategory) {
          saveCategory = commentsInfo.selectCategory;

          // window 전체 높이
          const windowHeight = document.body.scrollHeight;

          window.scrollTo({ top: windowHeight - scrollHeight - 300 });
        }
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

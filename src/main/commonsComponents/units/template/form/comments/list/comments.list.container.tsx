import { deepCopy } from "src/main/commonsComponents/functional";
import { InfoTypes, CommentsAllInfoTypes } from "../comments.types";
import CommentsListUIPage from "./comments.list.presenter";

import { MutableRefObject, useEffect, useRef } from "react";

let saveCategory = "all";
export default function CommentsListPage(props: {
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
  adminLogin: boolean;
  fetchCommentsList: (info?: CommentsAllInfoTypes, startPage?: number) => void;
}) {
  const { commentsInfo, fetchCommentsList } = props;
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

  const changePage = (page: number) => {
    const _commentsInfo: CommentsAllInfoTypes = deepCopy(commentsInfo);
    _commentsInfo.filter.page = page;

    fetchCommentsList(_commentsInfo, page);
  };

  return (
    <CommentsListUIPage listRef={listRef} {...props} changePage={changePage} />
  );
}

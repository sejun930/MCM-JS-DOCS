import { useState, useEffect, useRef, MutableRefObject, use } from "react";

import {
  getDoc,
  getResult,
  DocumentData,
  QuerySnapshot_DocumentData,
} from "src/commons/libraries/firebase";
import { InfoTypes } from "../write/comments.write.types";
import CommentsListUIPage from "./comments.list.presenter";

export default function CommentsListPage({
  commentsList,
  category,
  changeCategory,
  countList,
}: {
  commentsList: Array<InfoTypes>;
  category: string;
  changeCategory: (category: string) => void;
  countList: { [key: string]: number };
}) {
  return (
    <CommentsListUIPage
      commentsList={commentsList}
      category={category}
      changeCategory={changeCategory}
      countList={countList}
    />
  );
}

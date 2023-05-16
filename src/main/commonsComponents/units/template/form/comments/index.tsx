import { Wrapper } from "../form.commons.styles";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import _SubTitleTemplate from "../../title/subTitle";
import CommentsWritePage from "./write/comments.write.container";
import CommentsListPage from "./list/comments.list.container";

import {
  getDoc,
  getResult,
  DocumentData,
  QuerySnapshot_DocumentData,
} from "src/commons/libraries/firebase";
import { InfoTypes } from "./write/comments.write.types";

// 기존 원본 저장하기
export default function _CommentsUIForm() {
  // 선택한 카테고리
  const [selectCategory, setSelectCategory] = useState<string>("");
  // 노출될 리스트 정보
  const [commentsList, setCommentsList] = useState<Array<InfoTypes>>([]);
  const [module] = useRecoilState(moduleState);

  // 데이터 가져오기
  useEffect(() => {
    fetchCommentsList();
  }, [module]);

  // 댓글 리스트 조회 및 업데이트
  const fetchCommentsList = (category?: string) => {
    if (module) {
      let doc = getDoc("comments", module, "comment") as DocumentData;
      if (category) {
        doc = doc.where("category", "==", category);
      }

      doc
        .get()
        .then((result: QuerySnapshot_DocumentData) => {
          setCommentsList(getResult(result));
        })
        .catch((err: Error) => {
          console.log(`댓글을 정상적으로 불러오지 못했습니다. : ${err}`);
        });
    }
  };

  // 카테고리 선택하기
  const changeCategory = (category: string) => {
    if (selectCategory === category) return;

    setSelectCategory(category);
    fetchCommentsList(category);
  };

  console.log(commentsList);
  return (
    <Wrapper>
      <_SubTitleTemplate
        title="Comments"
        className="comments-subTitle"
        remakrs="해당 모듈에 대한 사용후기 및 개선점 등을 남겨주세요!"
      />
      <CommentsWritePage
        module={module}
        changeCategory={changeCategory}
        fetchCommentsList={fetchCommentsList}
      />
      <CommentsListPage
        commentsList={commentsList}
        category={selectCategory}
        changeCategory={changeCategory}
        module={module}
      />
    </Wrapper>
  );
}

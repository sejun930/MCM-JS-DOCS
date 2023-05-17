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
  Query_DocumentData,
} from "src/commons/libraries/firebase";
import { InfoTypes } from "./write/comments.write.types";

// 현재 선택중인 카테고리 저장
let selectCategory = "";
// 각각의 카테고리의 개수 정보 저장
// let countList: { [key: string]: number } = {};

export default function _CommentsUIForm() {
  // 노출될 리스트 정보
  const [commentsList, setCommentsList] = useState<Array<InfoTypes>>([]);
  const [countList, setCountList] = useState({});
  const [module] = useRecoilState(moduleState);

  // 데이터 가져오기
  useEffect(() => {
    fetchCommentsList();
  }, [module]);

  // 댓글 리스트 조회 및 업데이트
  const fetchCommentsList = (category?: string) => {
    if (module) {
      let doc = getDoc("comments", module, "comment") as Query_DocumentData;
      if (category) {
        doc = doc.where("category", "==", category);
      }
      doc = doc.orderBy("createdAt", "desc");

      doc
        .get()
        .then(async (result: QuerySnapshot_DocumentData) => {
          setCountList(await saveCategoryCount());
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

    selectCategory = category;
    fetchCommentsList(category);
  };

  // 각각의 카테고리 개수 저장하기
  const saveCategoryCount = async () => {
    let _list: { [key: string]: number } = {};
    if (module) {
      const doc = getDoc("comments", module, "count");

      await doc
        .get()
        .then(async (result) => {
          // 비어 있을 경우
          if (result.empty) {
            await doc.add({ category: "bug", count: 0 });
            await doc.add({ category: "question", count: 0 });
            await doc.add({ category: "review", count: 0 });
            _list = { bug: 0, question: 0, review: 0, all: 0 };
          } else {
            // 각각의 카테고리 개수 저장하기
            result.forEach((data) => {
              const _data = data.data();
              _list[_data.category] = _data.count;
            });

            // 전체 개수 구하기
            let allCount = 0;
            for (const key in _list) {
              allCount += _list[key];
            }
            _list["all"] = allCount;
          }
        })

        .catch((error) => {
          console.log(error);
        });
    }
    return _list;
  };

  return (
    <Wrapper>
      <_SubTitleTemplate
        title="Comments"
        className="comments-subTitle"
        remakrs="해당 모듈에 대한 사용후기 및 개선점 등을 남겨주세요!"
      />
      <CommentsWritePage
        module={module}
        category={selectCategory}
        fetchCommentsList={fetchCommentsList}
        saveCategoryCount={saveCategoryCount}
      />
      <CommentsListPage
        commentsList={commentsList}
        category={selectCategory}
        changeCategory={changeCategory}
        countList={countList}
      />
    </Wrapper>
  );
}

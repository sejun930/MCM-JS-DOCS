import { useState, useEffect } from "react";

import { getDoc, DocumentData } from "src/commons/libraries/firebase";
import { InfoTypes, categoryInitList } from "../write/comments.write.types";
import CommentsListUIPage from "./comments.list.presenter";

export default function CommentsListPage({
  module,
  commentsList,
  category,
  changeCategory,
}: {
  module: string;
  commentsList: Array<InfoTypes>;
  category: string;
  changeCategory: (category: string) => void;
}) {
  // 각각의 카테고리의 개수 정보 저장
  const [countList, setCountList] = useState({});

  useEffect(() => {
    if (module) {
      saveCategoryCount();
    }
  }, [module, commentsList]);

  // 각각의 카테고리 개수 저장하기
  const saveCategoryCount = () => {
    let _list: { [key: string]: number } = {};

    let doc = getDoc("comments", module, "count");
    doc
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
        setCountList(_list);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CommentsListUIPage
      commentsList={commentsList}
      category={category}
      changeCategory={changeCategory}
      countList={countList}
    />
  );
}

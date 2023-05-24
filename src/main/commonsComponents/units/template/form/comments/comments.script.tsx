import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  commentsListState,
  fetchCommentsListState,
  countListState,
} from "src/commons/store/comments";

import {
  getDoc,
  Query_DocumentData,
  QuerySnapshot_DocumentData,
  getResult,
} from "src/commons/libraries/firebase";

export default function CommentsScriptPage({
  loadScript,
  module,
  renderPage,
  changeCategory,
}: {
  loadScript: boolean;
  module: string;
  renderPage: () => void;
  changeCategory: (category: string) => void;
}) {
  // 댓글 리스트
  const [, setCommentsList] = useRecoilState(commentsListState);
  // 댓글 리스트 업데이트 함수
  const [, setFetchCommentsList] = useRecoilState(fetchCommentsListState);
  // 카테고리 개수 리스트
  const [, setCountList] = useRecoilState(countListState);

  // 데이터 가져오기
  useEffect(() => {
    _fetchCommentsList();
  }, [module]);

  // 화면 렌더 완료 및 함수 저장하기
  useEffect(() => {
    renderPage();

    // fetchCommentsList 함수 저장하기
    const saveFetchCommentsList = () => {
      return _fetchCommentsList;
    };

    const saveFn = saveFetchCommentsList;
    setFetchCommentsList(saveFn);

    // changeCategory 함수 저장하기
    // const saveChangeCategory = () => {
    //   return _changeCategory;
    // };

    // const saveCategoryFn = saveChangeCategory;
    // setChangeCategory(saveCategoryFn);
  }, [loadScript]);

  // 댓글 리스트 조회 및 카테고리 업데이트
  const _fetchCommentsList = (category?: string) => {
    if (module && loadScript) {
      // 카테고리 변경하기
      changeCategory(category || "");

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

  // 카테고리 변경하기
  //   const _changeCategory = (category: string) => {
  //     if (selectCategory === category) return;

  //     // 카테고리 변경 후
  //     setSelectCategory(category);
  //     // 해당 카테고리에 해당하는 데이터 가져오기
  //     _fetchCommentsList(category);
  //   };

  return <></>;
}

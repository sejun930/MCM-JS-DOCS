import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  commentsListState,
  fetchCommentsListState,
  countListState,
  FetchCommentsListTypes,
  initFetchProps,
} from "src/commons/store/comments";

import {
  getDoc,
  Query_DocumentData,
  getResult,
} from "src/commons/libraries/firebase";
import apis from "src/commons/libraries/commons.apis";

import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

let debouncing: ReturnType<typeof setTimeout> | number;

// 기존의 fetch 정보 저장하기
let saveFetchInfo = { ...initFetchProps };
export default function CommentsScriptPage({
  loadScript,
  module,
  changeCategory,
  toggleRender,
}: {
  loadScript: boolean;
  module: string;
  changeCategory: (category: string) => void;
  toggleRender: (bool: boolean) => void;
}) {
  const { getRouter } = CommonsHooksComponents();
  const router = getRouter();
  // 댓글 리스트
  const [, setCommentsList] = useRecoilState(commentsListState);
  // 댓글 리스트 업데이트 함수
  const [, setFetchCommentsList] = useRecoilState(fetchCommentsListState);
  // 카테고리 개수 리스트
  const [, setCountList] = useRecoilState(countListState);

  // 데이터 가져오기
  useEffect(() => {
    _fetchCommentsList({ category: String(router.query.c) || "all" });
  }, [module]);

  // 화면 렌더 완료 및 함수 저장하기
  useEffect(() => {
    // fetchCommentsList 함수 저장하기
    const saveFetchCommentsList = () => {
      return _fetchCommentsList;
    };

    const saveFn = saveFetchCommentsList;
    setFetchCommentsList(saveFn);
  }, [loadScript]);

  // 댓글 리스트 조회 및 카테고리 업데이트
  const _fetchCommentsList = async (props: FetchCommentsListTypes) => {
    saveFetchInfo = { ...saveFetchInfo, ...props };

    // clearTimeout(debouncing);
    // toggleRender(false);

    console.log(saveFetchInfo);

    if (module && loadScript) {
      // 카테고리 변경하기
      changeCategory(saveFetchInfo.category || "");

      //   let doc = getDoc("comments", module, "comment") as Query_DocumentData;
      //   // 최신순으로 조회
      //   doc = doc.orderBy("createdAt", "desc");
      //   // 삭제되지 않은 댓글만 조회
      //   doc = doc.where("deletedAt", "==", null);
      //   // 카테고리가 존재할 경우
      //   if (saveFetchInfo.category) {
      //     doc = doc.where("category", "==", saveFetchInfo.category);
      //   }
      // 검색어가 존재할 경우
      //   if (saveFetchInfo.search) {
      //     doc = doc
      //       .where("contents", ">=", saveFetchInfo.search)
      //       .where("contents", "<=", saveFetchInfo.search + "\uf8ff");
      //   }
      //   try {
      //     const result = await apis(doc).read();
      //     setCountList(await saveCategoryCount());
      //     // setCommentsList(getResult(result));
      //     // debouncing = window.setTimeout(() => {
      //     //   toggleRender(true);
      //     // }, 0);
      //   } catch (err) {
      //     console.log(`댓글을 정상적으로 불러오지 못했습니다. : ${err}`);
      //   }
    }
  };

  // 각각의 카테고리 개수 저장하기
  const saveCategoryCount = async () => {
    let _list: { [key: string]: number } = {
      bug: 0,
      question: 0,
      review: 0,
      all: 0,
    };
    if (module) {
      const doc = getDoc("comments", module, "count") as Query_DocumentData;

      try {
        const result = await apis(doc).read();
        if (result.empty) {
          // 비어있을 경우 새로 생성하기
        }

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
      } catch (err) {
        console.log(err);
      }

      // .then(async (result) => {
      //   // 비어 있을 경우
      //   //   if (result.empty) {
      //   //     await doc.add({ category: "bug", count: 0 });
      //   //     await doc.add({ category: "question", count: 0 });
      //   //     await doc.add({ category: "review", count: 0 });
      //   //     _list = { bug: 0, question: 0, review: 0, all: 0 };
      //   //   } else {
      //   // 각각의 카테고리 개수 저장하기
      // result.forEach((data) => {
      //   const _data = data.data();
      //   _list[_data.category] = _data.count;
      // });

      //     // 전체 개수 구하기
      //     let allCount = 0;
      //     for (const key in _list) {
      //       allCount += _list[key];
      //     }
      //     _list["all"] = allCount;
      //     //   }
      //   })

      // .catch((error) => {
      //   console.log(error);
      // });
    }
    return _list;
  };

  return <></>;
}

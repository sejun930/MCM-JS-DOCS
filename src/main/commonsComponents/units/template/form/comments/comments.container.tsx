import CommentsUIPage from "./comments.presenter";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import {
  FetchCommentsListTypes,
  initFetchProps,
} from "src/commons/store/comments";
import { InfoTypes } from "./comments.types";

import apis from "src/commons/libraries/commons.apis";
import {
  getDoc,
  getResult,
  Query_DocumentData,
} from "src/commons/libraries/firebase";

// 원본 댓글 리스트 저장
let originCommentsList: Array<InfoTypes> = [];
// 필터 정보 저장
let saveFetchInfo: FetchCommentsListTypes = { ...initFetchProps };
export default function CommentsPage() {
  // 선택된 카테고리
  const [selectCategory, setSelectCategory] = useState<string>("");
  // 카테고리 개별 개수
  const [countList, setCountList] = useState<{ [key: string]: number }>({});
  // 댓글 리스트
  const [commentsList, setCommentsList] = useState<Array<InfoTypes>>([]);

  const [module] = useRecoilState<string>(moduleState);

  useEffect(() => {
    // 최초 댓글 리스트 가져오기
    fetchCommentsList();
  }, [module]);

  // 최초 원본 댓글 리스트 조회
  const fetchCommentsList = async () => {
    if (module) {
      let doc = getDoc("comments", module, "comment") as Query_DocumentData;
      // 최신순으로 조회
      doc = doc.orderBy("createdAt", "desc");
      // 삭제되지 않은 댓글만 조회
      doc = doc.where("deletedAt", "==", null);

      try {
        const result = await apis(doc).read();
        // 카테고리 개수 저장하기
        setCountList(await saveCategoryCount());
        // 원본 댓글리스트 저장하기
        setCommentsList(getResult(result));
        originCommentsList = [...getResult(result)];
      } catch (err) {
        console.log(`댓글을 정상적으로 불러오지 못했습니다. : ${err}`);
      }
    }
  };

  // 필터 적용하기
  const filterCommentsList = (props: FetchCommentsListTypes) => {
    saveFetchInfo = { ...saveFetchInfo, ...props };

    // 카테고리 변경하기
    if (saveFetchInfo.category !== selectCategory)
      setSelectCategory(saveFetchInfo.category || "");

    let _commentsList: Array<InfoTypes> = [...originCommentsList];

    // 카테고리 필터
    if (saveFetchInfo.category) {
      _commentsList = _commentsList.filter(
        (el) => el.category === saveFetchInfo.category
      );
    }

    setCommentsList(_commentsList);
  };

  // 카테고리 개수 저장하기
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
    }
    return _list;
  };

  // Comment DOC 저장하기
  const getCommentDoc = () => {
    return getDoc("comments", module, "comment");
  };

  // 댓글 추가하기
  const addComments = async (comment: InfoTypes): Promise<boolean> => {
    try {
      const addDoc = await getCommentDoc().add(comment);
      const newComment = (await addDoc.get()).data() as InfoTypes;

      if (newComment) {
        // 등록에 성공할 경우
        const _commentsList = [...originCommentsList];
        _commentsList.unshift(newComment);

        originCommentsList = _commentsList;
        setCommentsList(_commentsList);

        // 카테고리 개수 1 증가
        updateCountList("up", newComment.category);
        // 카테고리 변경
        filterCommentsList({ category: newComment.category });

        return true;
      }
    } catch (err) {
      // 댓글 등록 실패
      console.log(`댓글 등록에 실패했습니다. ${err}`);

      return false;
    }
    return false;
  };

  // 댓글 수정하기
  const modifyComments = async (comment: InfoTypes): Promise<boolean> => {
    const _commentsList = [...originCommentsList];
    const idx = _commentsList.findIndex((el) => el.id === comment.id);

    // 수정할 댓글이 있는 경우
    if (idx !== -1) {
      try {
        const modifyDoc = getCommentDoc().doc(comment.id);
        await modifyDoc.update(comment);

        const editData = (await modifyDoc.get()).data();
        if (editData) {
          // 수정이 완료된 경우
          _commentsList[idx] = editData as InfoTypes;

          setCommentsList(_commentsList);
          return true;
        }
      } catch (err) {
        console.log(`댓글 수정에 실패했습니다. ${err}`);
        return false;
      }
    }
    return false;
  };

  // 카테고리 갯수 업데이트
  const updateCountList = async (type: "up" | "down", category: string) => {
    // type : "up" = 1 증가, "down" = 1 감소
    // category : 변경시킬 카테고리 이름

    try {
      let _countList = { ...countList };

      getDoc("comments", module, "count")
        .where("category", "==", category)
        .get()
        .then((result) => {
          result.forEach((data) => {
            const docId = data.id;
            // up일 경우 1개 증가, down일 경우 1개 감소
            const num = type === "up" ? 1 : -1;

            const count = data.data().count + num;

            // 카테고리 카운트 개수 변경하기
            getDoc("comments", module, "count")
              .doc(docId)
              .update({
                category,
                count,
              })
              .then(() => {
                // 카운트 개수 변경 성공
                _countList[category] += num;
                _countList.all += num;

                setCountList(_countList);
              })
              .catch((err) => {
                console.log(`카테고리 개수 변경에 실패했습니다. ${err}`);
              });
          });
        })
        .catch((err) => {
          console.log(`카테고리 조회에 실패했습니다. ${err}`);
        });
    } catch (err) {
      console.log(`카테고리 변경에 에러가 발생했습니다. ${err}`);
    }
  };

  return (
    <CommentsUIPage
      module={module}
      category={selectCategory}
      countList={countList}
      commentsList={commentsList}
      filterCommentsList={filterCommentsList}
      addComments={addComments}
      modifyComments={modifyComments}
    />
  );
}

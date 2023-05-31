import CommentsUIPage from "./comments.presenter";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { InfoTypes } from "./comments.types";
import apis from "src/commons/libraries/commons.apis";
import {
  getDoc,
  getResult,
  Query_DocumentData,
} from "src/commons/libraries/firebase";

import {
  initCommentsInfo,
  CommentsAllInfoTypes,
  CommentsPartialPropsType,
} from "./comments.types";

// 원본 댓글 리스트 저장
let originCommentsList: Array<InfoTypes> = [];
// 데이터 조회중 (중복 실행 방지)
let wating = false;
export default function CommentsPage() {
  // 댓글 전체 정보 (댓글 리스트, 카테고리 등등)
  const [commentsInfo, setCommentsInfo] =
    useState<CommentsAllInfoTypes>(initCommentsInfo);

  const [module] = useRecoilState<string>(moduleState);

  useEffect(() => {
    // 최초 댓글 리스트 가져오기
    fetchCommentsList(commentsInfo);
  }, [module]);

  // 댓글 리스트 조회
  const fetchCommentsList = async (info: CommentsAllInfoTypes) => {
    if (wating) return;
    wating = true;

    if (module) {
      let doc = getDoc("comments", module, "comment") as Query_DocumentData;
      // 최신순으로 조회
      doc = doc.orderBy("createdAt", "desc");
      // 삭제되지 않은 댓글만 조회
      doc = doc.where("deletedAt", "==", null);

      // 선택되어 있는 카테고리가 있다면 해당 카테고리 조회
      if (info.selectCategory !== "all" && info.selectCategory) {
        doc = doc.where("category", "==", info.selectCategory);
      }

      try {
        const result = await apis(doc).read();
        let _commentInfo = { ...info };

        const commentsList = getResult(result);

        // 댓글 리스트 저장하기
        _commentInfo.commentsList = commentsList;
        // 원본 댓글 리스트 저장하기
        // originCommentsList = [...commentsList];

        // 카테고리 개수 저장하기
        _commentInfo.countList = await saveCategoryCount();

        setCommentsInfo(_commentInfo);
        wating = false;
      } catch (err) {
        console.log(`댓글을 정상적으로 불러오지 못했습니다. : ${err}`);
      }
    }
  };

  // 댓글 전체 정보 저장하기 + 필터 적용하기
  const saveCommentsInfo = (info: CommentsPartialPropsType) => {
    // const saveInfoData = { ...commentsInfo, ...info };
    // saveInfoData.commentsList = [...originCommentsList];
    // // 카테고리 변경하기
    // if (
    //   saveInfoData.selectCategory !== "all" &&
    //   commentsInfo.selectCategory !== info.selectCategory
    // ) {
    //   saveInfoData.commentsList = originCommentsList.filter(
    //     (el) => el.category === info.selectCategory
    //   );
    // }
    // setCommentsInfo(saveInfoData);
  };

  // 카테고리 개수 저장하기
  const saveCategoryCount = async () => {
    let _list: { [key: string]: number } = {
      all: 0,
      bug: 0,
      question: 0,
      review: 0,
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
        const _info = { ...commentsInfo };

        // 해당 카테고리 1 증가 결과
        const updateCountResult = await updateCountList(
          "up",
          newComment.category,
          _info
        );

        if (updateCountResult && updateCountResult.category) {
          // 카운트 최신화
          _info.countList[updateCountResult.category] = updateCountResult.count;

          // 카테고리 변경하기
          _info.selectCategory = updateCountResult.category;
        }

        fetchCommentsList(_info);

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
  const modifyComments = async (
    comment: InfoTypes,
    isDelete?: boolean
  ): Promise<boolean> => {
    // comment : 수정 및 삭제될 댓글
    // isDelete : 삭제 여부
    const _commentsList = [...originCommentsList];
    const idx = _commentsList.findIndex((el) => el.id === comment.id);

    const _list = { ...commentsInfo };

    // 수정할 댓글이 있는 경우
    if (idx !== -1) {
      try {
        const modifyDoc = getCommentDoc().doc(comment.id);
        await modifyDoc.update(comment);

        const editData = (await modifyDoc.get()).data() as InfoTypes;

        if (editData) {
          // 수정이 완료된 경우
          if (isDelete) {
            // 삭제일 경우
            _commentsList.splice(idx, 1); // 해당 댓글 제거
          } else {
            // 수정일 경우
            _commentsList[idx] = editData as InfoTypes;
          }

          _list.commentsList = _commentsList;
          originCommentsList = _commentsList;

          // 삭제라면 해당 카테고리 1개 감소
          if (isDelete) updateCountList("down", editData.category, _list);
          else setCommentsInfo(_list);

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
  const updateCountList = async (
    type: "up" | "down",
    category: string,
    list: CommentsAllInfoTypes
  ) => {
    // type : "up" = 1 증가, "down" = 1 감소
    // category : 변경시킬 카테고리 이름
    let _list = { ...list };
    let _countList = { ...list.countList };

    try {
      const updateDoc = await getDoc("comments", module, "count")
        .where("category", "==", category)
        .get();

      if (!updateDoc.empty) {
        const docId = updateDoc.docs[0].id;
        // up일 경우 1개 증가, down일 경우 1개 감소
        const num = type === "up" ? 1 : -1;
        const count = updateDoc.docs[0].data().count + num;

        try {
          await getDoc("comments", module, "count").doc(docId).update({
            count,
          });

          return { category, count };
        } catch (err) {
          console.log(`카테고리 개수 변경에 실패했습니다. ${err}`);
        }
      }
    } catch (err) {
      console.log(`카테고리 변경에 에러가 발생했습니다. ${err}`);
    }
  };

  // 카테고리 변경
  const changeCategory = (category: string) => {
    const info = { ...commentsInfo, ["selectCategory"]: category };
    fetchCommentsList(info);
  };

  return (
    <CommentsUIPage
      commentsInfo={commentsInfo}
      saveCommentsInfo={saveCommentsInfo}
      fetchCommentsList={fetchCommentsList}
      addComments={addComments}
      modifyComments={modifyComments}
      changeCategory={changeCategory}
    />
  );
}

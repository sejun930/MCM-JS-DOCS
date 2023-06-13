import CommentsUIPage from "./comments.presenter";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { CommentsInfoTypes, InfoTypes, initCountList } from "./comments.types";
import apis from "src/commons/libraries/commons.apis";
import {
  CollectionReference_DocumentData,
  getDoc,
  getResult,
  Query_DocumentData,
} from "src/commons/libraries/firebase";

import { initCommentsInfo, CommentsAllInfoTypes } from "./comments.types";
import { DocumentData } from "src/commons/libraries/firebase";

// 데이터 조회중 (중복 실행 방지)
let wating = false;
// 한 번에 가져올 수 있는 댓글 개수 단위
// const limit = 10;
// let startAfter;

export default function CommentsPage() {
  // 댓글 전체 정보 (댓글 리스트, 카테고리 등등)
  const [commentsInfo, setCommentsInfo] =
    useState<CommentsAllInfoTypes>(initCommentsInfo);

  const [module] = useRecoilState<string>(moduleState);

  useEffect(() => {
    // 최초 댓글 리스트 가져오기
    fetchCommentsList(commentsInfo);
  }, [module]);

  // 필터 쿼리 적용하기
  const getFilterQuery = (
    doc: Query_DocumentData,
    info: CommentsAllInfoTypes
  ) => {
    // 선택되어 있는 카테고리가 있다면 해당 카테고리 조회
    if (info.selectCategory !== "all" && info.selectCategory) {
      doc = doc.where("category", "==", info.selectCategory);
    }

    switch (info.selectCategory) {
      case "bug":
        // 카테고리가 버그일 경우
        if (info.filter.list["bug-complete"])
          // 해결 완료만 보기
          doc = doc.where("bugStatus", "==", 2);
        break;

      case "question":
        // 카테고리가 문의일 경우
        if (info.filter.list["question-complete"])
          // 답변 완료만 보기
          doc = doc
            .where("completeAnswer", "!=", null)
            .orderBy("completeAnswer");
        break;

      case "review":
        // 카테고리가 리뷰일 경우
        let ratingArr = [];

        // 선택한 평점들만 모아보기
        for (const rating in info.filter.list) {
          if (info.filter.list[rating]) {
            const _rating = rating.split("-");

            if (_rating[0] === "review") ratingArr.push(Number(_rating[1]));
          }
        }

        if (ratingArr.length) doc = doc.where("rating", "in", ratingArr); // 5점대 보기
        break;
    }

    // 삭제되지 않은 댓글만 조회
    doc = doc.where("deletedAt", "==", null);

    // 과거순 및 최신순으로 조회하기
    doc = doc.orderBy("createdAt", info.filter.list.oddest ? "asc" : "desc");

    return doc;
  };

  // 댓글 리스트 조회
  const fetchCommentsList = async (info?: CommentsAllInfoTypes) => {
    if (wating) return;
    wating = true;

    if (module) {
      const _info = info || commentsInfo;

      const doc = getFilterQuery(getCommentDoc() as Query_DocumentData, _info);

      try {
        const result = await apis(doc).read();
        let _commentInfo = { ..._info };

        // 댓글 리스트 저장하기
        _commentInfo.commentsList = getResult(result);

        // 카테고리 개수 저장하기
        _commentInfo.countList = await saveCategoryCount(_commentInfo);

        setCommentsInfo(_commentInfo);
        wating = false;
      } catch (err) {
        console.log(`댓글을 정상적으로 불러오지 못했습니다. : ${err}`);
      }
    }
  };

  // 카테고리 개수 저장하기
  const saveCategoryCount = async (info: CommentsAllInfoTypes) => {
    let _list: { [key: string]: number } = {
      all: 0,
      bug: 0,
      question: 0,
      review: 0,
    };
    if (module) {
      try {
        const doc = getDoc("comments", module, "count");

        const result = await apis(doc).read();
        if (result.empty) {
          // 비어있을 경우 새로 생성하기
          initCountList.forEach((el) => {
            (doc as CollectionReference_DocumentData).add(el);
          });
        } else {
          result.forEach((data) => {
            const _data = data.data();
            // 모든 개수 카운트하기
            _list[_data.category] = _data.count;

            if (_data.category === "review") {
              // 평점 필터가 있는지 검증
              const isFilter = Array.from(
                new Array(5),
                (_, idx) => 1 + idx
              ).some((num) => info.filter.list[`review-${num}`]);

              if (isFilter) {
                _list.review = 0;

                // 필터가 하나라도 있는 경우
                Array.from(new Array(5), (_, idx) => 1 + idx).forEach((num) => {
                  if (info.filter.list[`review-${num}`]) {
                    _list.review += _data[`review-${num}`];
                  }
                });
              }
            }
          });

          // 전체 개수 구하기
          let allCount = 0;
          for (const key in _list) {
            allCount += _list[key];
          }
          _list["all"] = allCount;
        }
      } catch (err) {
        console.log(err);
      }
    }
    return _list;
  };

  // Comment DOC 받아오기
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
        const updateCountResult = await updateCountList("up", newComment);

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

  // 댓글 정보 수정하기
  const modifyComments = async (
    comment: InfoTypes,
    isDelete?: boolean
  ): Promise<boolean> => {
    try {
      const modifyDoc = getCommentDoc().doc(comment.id);
      await modifyDoc.update(comment);
      const editData = (await modifyDoc.get()).data() as InfoTypes;

      if (editData) {
        // 수정이 완료된 경우

        if (isDelete) {
          // 삭제라면 해당 카테고리 1개 감소
          if (isDelete) updateCountList("down", editData);
        }
        fetchCommentsList();

        return true;
      }
    } catch (err) {
      console.log(`댓글 수정에 실패했습니다. ${err}`);
      return false;
    }
    // }
    return false;
  };

  // 카테고리 갯수 업데이트
  const updateCountList = async (
    updateType: "up" | "down",
    info: InfoTypes
  ) => {
    // updateType : "up" = 1 증가, "down" = 1 감소
    // category : 변경시킬 카테고리 이름

    try {
      const updateDoc = await getDoc("comments", module, "count")
        .where("category", "==", info.category)
        .get();

      if (!updateDoc.empty) {
        const docId = updateDoc.docs[0].id;
        // up일 경우 1개 증가, down일 경우 1개 감소
        const num = updateType === "up" ? 1 : -1;
        const count = updateDoc.docs[0].data().count + num;
        let updateList = { ...updateDoc.docs[0].data(), ["count"]: count };

        try {
          // 카운트 필터 데이터도 업데이트 진행
          if (info.category === "review") {
            // 리뷰일 경우 각각의 평점에 대한 카운트도 저장
            updateList = updateFilterCount(
              updateList,
              "up",
              `review-${info.rating}`
            ) as { count: number };
          }

          await getDoc("comments", module, "count")
            .doc(docId)
            .update(updateList);

          return { category: info.category, count };
        } catch (err2) {
          console.log(`카테고리 개수 변경에 실패했습니다. ${err2}`);
        }
      }
    } catch (err) {
      console.log(`카테고리 변경에 에러가 발생했습니다. ${err}`);
    }
  };

  // 카테고리 각각의 필터 카운트에 대한 업데이트
  const updateFilterCount = (
    updateList: { [key: string]: number },
    updateType: "up" | "down",
    columnName: string
  ) => {
    // updateList : 해당 카테고리의 댓글 정보들
    // updateType : "up" = 1 증가, "down" = 1 감소
    // columnName : 변경할 필터 카테고리 이름
    return {
      ...updateList,
      [columnName]: updateList[columnName] + (updateType === "up" ? 1 : -1),
    };
  };

  // 데이터 정보 변경하기
  const changeInfo = (info: CommentsAllInfoTypes) => {
    const _info = { ...commentsInfo, ...info };

    // 카테고리가 변경될 경우, 필터 리스트 초기화
    if (commentsInfo.selectCategory !== info.selectCategory) {
      _info.filter.list = {};
    }

    fetchCommentsList(_info);
  };

  return (
    <CommentsUIPage
      commentsInfo={commentsInfo}
      addComments={addComments}
      modifyComments={modifyComments}
      changeInfo={changeInfo}
    />
  );
}

import CommentsUIPage from "./comments.presenter";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { InfoTypes, initCountList, CategoryTypes } from "./comments.types";
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
    const { category, rating } = comment;
    try {
      const addDoc = await getCommentDoc().add(comment);
      const newComment = (await addDoc.get()).data() as InfoTypes;

      if (newComment) {
        // 등록에 성공할 경우
        const _info = { ...commentsInfo };

        // 해당 카테고리의 전체 개수 데이터 가져오기
        const updateDoc = await getCommentsCountList(category);

        if (!updateDoc.empty) {
          const result = updateDoc.docs[0].data();
          // 전체 개수(count) 1개 더하기
          const countList: {
            [key: string]: number | CategoryTypes;
          } = {
            ...result,
            ["count"]: result.count + 1,
          };

          // 리뷰 카테고리일 경우 평점별로 카운트 올리기
          if (category === "review") {
            if (countList[`review-${rating}`] !== undefined)
              // 해당 평점 필터 리스트 1개 증가하기 (ex : 1점이라면 review-1 1개 증가)
              countList[`review-${rating}`] =
                Number(countList[`review-${rating}`]) + 1;
          }

          // 리스트 업데이트
          const updateReulst = await updateCountList(
            updateDoc.docs[0].id,
            countList
          );

          if (updateReulst) {
            if (countList && countList.category) {
              // 카운트 최신화
              _info.countList[countList.category] = Number(countList.count);

              // 카테고리 변경하기
              _info.selectCategory = countList.category as CategoryTypes;
            }
          }

          fetchCommentsList(_info);
          return true;
        }

        return false;
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
    const { category, id, rating } = comment;

    try {
      // 댓글 정보 수정하기
      const modifyDoc = getCommentDoc().doc(id);
      // 수정 전의 원본 복사하기
      const originData = (await modifyDoc.get()).data() as InfoTypes;
      // 댓글 수정 요청
      await modifyDoc.update(comment);

      const editData = (await modifyDoc.get()).data() as InfoTypes;
      if (editData) {
        const _info = { ...commentsInfo };

        // 수정이 완료된 경우
        // 해당 카테고리의 전체 개수 데이터 가져오기
        const updateDoc = await getCommentsCountList(category);

        if (!updateDoc.empty) {
          const result = updateDoc.docs[0].data();
          let countList: {
            [key: string]: number | CategoryTypes;
          } = { ...result };

          if (isDelete) {
            // 삭제라면 해당 카테고리 개수 및 필터 개수 업데이트
            // 전체 개수(count) 1개 제거하기
            countList.count = Number(countList.count) - 1;
          }

          // 카테고리가 리뷰일 경우
          if (category === "review") {
            // 어떤 평점 필터를 하나 제거할건지 정한다.
            let targetRating = rating;
            if (!isDelete && rating !== originData.rating) {
              // 수정이면서, 평점을 변경했을 경우에는 기존에 있던 평점을 1개 제거한다.
              targetRating = originData.rating;
            }

            // 해당 필터 평점에서도 1개 제거
            countList[`review-${targetRating}`] =
              Number(countList[`review-${targetRating}`]) - 1;

            if (targetRating !== rating) {
              // 새로 변경한 평점의 필터를 1개 증가시킨다.
              countList[`review-${rating}`] =
                Number(countList[`review-${rating}`]) + 1;
            }
          }

          // 리스트 업데이트
          const updateReulst = await updateCountList(
            updateDoc.docs[0].id,
            countList
          );

          if (updateReulst) {
            _info.countList[category] = Number(countList.count);

            fetchCommentsList(_info);
            return true;
          }
          return false;
        }

        return false;
      }
    } catch (err) {
      console.log(`댓글 수정에 실패했습니다. ${err}`);
      return false;
    }
    // }
    return false;
  };

  // 댓글 개수 리스트 DOC 가져오기
  const getCommentsCountList = async (category: string) => {
    return await getDoc("comments", module, "count")
      .where("category", "==", category)
      .get();
  };

  // 카테고리 갯수 업데이트
  const updateCountList = async (
    docId: string,
    countList: {
      [key: string]: number | CategoryTypes;
    }
  ) => {
    try {
      // 카테고리 개수 업데이트 완료
      await getDoc("comments", module, "count").doc(docId).update(countList);
      return true;
    } catch (err) {
      // 카테고리 개수 업데이트 실패
      console.log(`카테고리 개수 업데이트에 실패했습니다. : ${err}`);
      return false;
    }
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

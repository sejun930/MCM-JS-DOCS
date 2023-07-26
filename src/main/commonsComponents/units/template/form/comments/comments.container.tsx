import CommentsUIPage from "./comments.presenter";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState, adminLoginState } from "src/commons/store";

import apis from "src/commons/libraries/apis/commons.apis";
import blockApis from "src/commons/libraries/apis/block/block.apis";

import {
  CollectionReferenceDocumentData,
  getDoc,
  getResult,
  QueryDocumentData,
} from "src/commons/libraries/firebase";

import {
  InfoTypes,
  initCountList,
  CategoryTypes,
  initCommentsInfo,
  CommentsAllInfoTypes,
} from "./comments.types";
import {
  deepCopy,
  getUserIp,
  moveDocument,
} from "src/main/commonsComponents/functional";
import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";

// 데이터 조회중 (중복 실행 방지)
let wating = false;
export default function CommentsPage() {
  // 댓글 전체 정보 (댓글 리스트, 카테고리 등등)
  const [commentsInfo, setCommentsInfo] = useState<CommentsAllInfoTypes>(
    deepCopy(initCommentsInfo)
  );
  // 댓글 작성, 리스트 페이지 렌더 여부
  const [render, setRender] = useState(false);
  // 데이터 조회중 여부
  const [loading, setLoading] = useState(false);

  const [module] = useRecoilState<string>(moduleState);
  const [adminLogin, setAdminLogin] = useRecoilState<boolean>(adminLoginState);

  useEffect(() => {
    // 최초 댓글 리스트 가져오기
    fetchCommentsList(commentsInfo);
  }, [module]);

  useEffect(() => {
    // 관리자 로그인 체크하기
    checkAccessToken().then((result) => {
      setAdminLogin(result);
    });
  }, [commentsInfo]);

  // 필터 쿼리 적용하기
  const getFilterQuery = ({
    doc,
    info,
    notLimit,
    startPage,
  }: {
    doc: QueryDocumentData;
    info: CommentsAllInfoTypes;
    notLimit?: boolean; // 전체 데이터로 가져오기
    startPage?: number; // 시작용 페이지
  }) => {
    const { selectCategory } = info;

    // 선택되어 있는 카테고리가 있다면 해당 카테고리 조회
    if (selectCategory !== "all" && selectCategory) {
      doc = doc.where("category", "==", selectCategory);
    }

    switch (selectCategory) {
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
          doc = doc.where("answer", "!=", "").orderBy("answer");
        break;
    }

    // 카테고리가 버그 및 리뷰일 경우
    if (selectCategory === "bug" || selectCategory === "review") {
      const numArr = [];

      // 선택한 점수들만 모아보기
      for (const num in info.filter.list) {
        if (info.filter.list[num]) {
          const _rating = num.split("-");

          if (_rating[0] === selectCategory && Number(_rating[1]))
            numArr.push(Number(_rating[1]));
        }
      }

      const column = selectCategory === "review" ? "rating" : "bugLevel";
      // 해당 점수로 필터하기
      if (numArr.length) doc = doc.where(column, "in", numArr);
    }

    // 삭제되지 않은 댓글만 조회
    doc = doc.where("deletedAt", "==", null);

    // 과거순 및 최신순으로 조회하기
    doc = doc.orderBy("createdAt", info.filter.list.oddest ? "asc" : "desc");

    // 페이지 별로 데이터 limit 개씩 노출
    if (!notLimit) doc = doc.limit(info.filter.limit * info.filter.page);

    return doc;
  };

  // 댓글 리스트 조회
  const fetchCommentsList = async (
    info?: CommentsAllInfoTypes,
    startPage?: number // 페이지네이션을 이용해 이동했을 경우
  ) => {
    if (wating || loading) return;
    wating = true;
    setLoading(true);

    if (module) {
      const _info = deepCopy(info || commentsInfo);

      for (const filter in _info.filter.list) {
        if (!_info.countFilterList[filter]) {
          _info.filter.list[filter] = false;
        }
      }
      const doc = getFilterQuery({
        doc: getCommentDoc() as QueryDocumentData,
        info: _info,
        startPage,
      });

      try {
        const result = await apis(
          doc as CollectionReferenceDocumentData
        ).read();
        const _commentInfo = deepCopy(_info) as CommentsAllInfoTypes;

        // 댓글 리스트 저장하기
        _commentInfo.commentsList = getResult(result);

        // 카테고리 개수 저장하기
        const getCountList = await saveCategoryCount(_commentInfo);
        _commentInfo.countList = getCountList._list;

        // 전체 데이터 수 저장하기
        _commentInfo.filter.allData =
          getCountList._list[_commentInfo.selectCategory];

        // 버그 카테고리이면서 필터 중 "완료된 것만 보기"가 적용되어 있을 경우
        if (
          _commentInfo.selectCategory === "bug" &&
          _commentInfo.filter.list["bug-complete"]
        ) {
          const filterBug = Object.entries(_commentInfo.filter.list).filter(
            (el) => {
              const splitResult = el[0].split("-");
              // 카테고리가 bug이면서, bug-level에 해당하는 필터일 경우에만
              return (
                splitResult[0] === "bug" &&
                !Number.isNaN(Number(splitResult[1])) &&
                _commentInfo.filter.list[el[0]]
              );
            }
          );
          if (filterBug.length) {
            // 모든 데이터 조회하기
            const bugDoc = getFilterQuery({
              doc: getCommentDoc() as QueryDocumentData,
              info: _info,
              notLimit: true,
            });

            const allSize = (await bugDoc.get()).size;
            _commentInfo.filter.allData = allSize;
            _commentInfo.countList[_commentInfo.selectCategory] = allSize;

            // 필터가 제외된 전체 데이터 가져오기
            _commentInfo.countList["all"] =
              _commentInfo.countList.review +
              _commentInfo.countList.question +
              allSize;
          }
        }

        // 카테고리 필터 개수 저장하기
        _commentInfo.countFilterList = getCountList.filterCountList;

        // 시작 페이지 저장
        if (startPage) _commentInfo.filter.startPage = startPage;

        // 유저 아이피 조회
        const userIp: string = await getUserIp();

        if (userIp) {
          _commentInfo.userIp = userIp;

          // 조회된 아이피가 차단된 유저인지 검증
          _commentInfo.blockInfo = await blockApis().checkBlock(userIp);

          if (!render) setRender(true);
        }

        if (_commentInfo.filter.page === 1) {
          moveDocument("comments-list-wrapper");
        }

        setCommentsInfo(_commentInfo);
        wating = false;
      } catch (err) {
        console.log(`댓글을 정상적으로 불러오지 못했습니다. : ${err}`);
      }
    }
    setLoading(false);
  };

  // 카테고리 개수 저장하기
  const saveCategoryCount = async (info: CommentsAllInfoTypes) => {
    const _list: { [key: string]: number } = {
      all: 0,
      bug: 0,
      question: 0,
      review: 0,
    };
    let filterCountList: { [key: string]: number } = {};

    if (module) {
      try {
        const doc = getDoc("comments", module, "count");

        const result = await apis(doc).read();
        if (result.empty) {
          // 비어있을 경우 새로 생성하기
          Promise.all(
            initCountList.map(async (el) => {
              await (doc as CollectionReferenceDocumentData).add(el);
            })
          );
        } else {
          result.forEach((data) => {
            const _data = data.data();

            // count와 카테고리만 제외한 나머지 필터 키값만 가져오기
            const { count, category, ...countFilterList } = _data;
            filterCountList = { ...filterCountList, ...countFilterList };

            // 모든 개수 카운트하기
            _list[category] = _data.count;

            if (
              category === "question" &&
              info.filter.list["question-complete"]
            ) {
              // 카테고리가 문의이면서 완료된 항목만 검색할 경우
              _list.question = _data["question-complete"];
            } else if (category === "review" || category === "bug") {
              // 카테고리가 리뷰 또는 버그일 경우

              if (category === "bug" && info.filter.list["bug-complete"]) {
                // 카테고리가 버그이면서 완료된 항목 검색시
                _list[category] = _data["bug-complete"];
              }

              // 점수별로 필터가 있는지 검증
              const isFilter = Array.from(
                new Array(5),
                (_, idx) => 1 + idx
              ).some((num) => info.filter.list[`${category}-${num}`]);

              if (isFilter) {
                _list[category] = 0;

                // 필터가 하나라도 있는 경우
                Array.from(new Array(5), (_, idx) => 1 + idx).forEach((num) => {
                  if (info.filter.list[`${category}-${num}`]) {
                    _list[category] += _data[`${category}-${num}`];
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
          _list.all = allCount;
        }
      } catch (err) {
        console.log(err);
      }
    }

    // 과거순 정렬은 무조건 선택 가능
    filterCountList.oddest = 1;

    return { _list, filterCountList };
  };

  // Comment DOC 받아오기
  const getCommentDoc = () => {
    return getDoc("comments", module, "comment");
  };

  // 댓글 정보 수정하기
  // const modifyComments = async (
  //   comment: InfoTypes,
  //   isDelete?: boolean,
  //   type?: string,
  //   origin?: InfoTypes
  // ): Promise<boolean> => {
  //   const {
  //     category,
  //     id,
  //     rating,
  //     bugLevel,
  //     answer,
  //     bugStatus,
  //     answerCreatedAt,
  //   } = comment;

  //   try {
  //     // 댓글 정보 수정하기
  //     const modifyDoc = getCommentDoc().doc(id);
  //     // 수정 전의 원본 복사하기
  //     const originData = (await modifyDoc.get()).data() as InfoTypes;
  //     // 댓글 수정 요청
  //     await modifyDoc.update(comment);

  //     const editData = (await modifyDoc.get()).data() as InfoTypes;
  //     if (editData) {
  //       const _info = { ...commentsInfo };

  //       // 수정이 완료된 경우
  //       // 해당 카테고리의 전체 개수 데이터 가져오기
  //       const updateDoc = await getCommentsCountList(category);

  //       if (!updateDoc.empty) {
  //         const result = updateDoc.docs[0].data();
  //         const countList: {
  //           [key: string]: number | CategoryTypes;
  //         } = { ...result };

  //         if (isDelete) {
  //           // 삭제라면 해당 카테고리 개수 및 필터 개수 업데이트
  //           // 전체 개수(count) 1개 제거하기
  //           countList.count = Number(countList.count) - 1;

  //           // 카테고리가 리뷰 또는 버그일 경우
  //           if (category === "review" || category === "bug") {
  //             const target = category === "review" ? rating : bugLevel;
  //             // 해당 필터 점수에서도 1개 제거
  //             countList[`${category}-${target}`] =
  //               Number(countList[`${category}-${target}`]) - 1;
  //           }
  //         }

  //         // 카테고리가 리뷰 또는 버그일 경우
  //         if (
  //           category === "review" ||
  //           category === "bug" ||
  //           category === "question"
  //         ) {
  //           // 어떤 점수 필터를 하나 제거할건지 정한다.
  //           let originTargetData = category === "review" ? rating : bugLevel;
  //           // 비교할 원본 데이터
  //           const _originData =
  //             category === "review" ? originData.rating : originData.bugLevel;
  //           // 변경된 데이터
  //           const changeData = originTargetData;

  //           if (!isDelete && changeData !== _originData) {
  //             // 수정이면서, 점수를 변경했을 경우에는 기존에 있던 점수를 1개 제거한다.
  //             originTargetData = _originData;
  //           }

  //           if (originTargetData !== changeData) {
  //             // 해당 필터 점수에서도 1개 제거
  //             countList[`${category}-${originTargetData}`] =
  //               Number(countList[`${category}-${originTargetData}`]) - 1;

  //             // 새로 변경한 점수의 필터를 1개 증가시킨다.
  //             countList[`${category}-${changeData}`] =
  //               Number(countList[`${category}-${changeData}`]) + 1;
  //           }

  //           // 이슈 완료일 경우 필터 변경
  //           if (category === "bug" && bugStatus === 2) {
  //             if (type === "question") {
  //               if (comment.bugStatus !== origin?.bugStatus) {
  //                 // 답변 완료일 경우 필터에서 1개 증가
  //                 countList["bug-complete"] =
  //                   Number(countList["bug-complete"]) + 1;
  //               }
  //             } else if (type === "delete" || type === "block") {
  //               // 삭제, 차단일 경우 필터에서 1개 감소
  //               countList["bug-complete"] =
  //                 Number(countList["bug-complete"]) - 1;
  //             }
  //           } else if (category === "question") {
  //             if (type === "question") {
  //               if (!origin?.answer && !origin?.answerCreatedAt) {
  //                 // 답변이 등록된 경우, 답변 완료 필터 1개 증가
  //                 countList["question-complete"] =
  //                   Number(countList["question-complete"]) + 1;
  //               }
  //             } else if (type === "delete" || type === "block") {
  //               if (answer && answerCreatedAt) {
  //                 // 삭제, 차단일 경우 필터에서 1개 감소
  //                 countList["question-complete"] =
  //                   Number(countList["question-complete"]) - 1;
  //               }
  //             }
  //           }
  //         }

  //         // 리스트 업데이트
  //         const updateReulst = await updateCountList(
  //           updateDoc.docs[0].id,
  //           countList
  //         );

  //         if (updateReulst) {
  //           const { count, category, ...countFilterList } = countList as {
  //             [key: string]: number;
  //           };
  //           _info.countList[category] = Number(countList.count);

  //           _info.countFilterList = {
  //             ..._info.countFilterList,
  //             ...countFilterList,
  //           };

  //           fetchCommentsList(_info);
  //           return true;
  //         }
  //         return false;
  //       }

  //       return false;
  //     }
  //   } catch (err) {
  //     console.log(`댓글 수정에 실패했습니다. ${err}`);
  //     return false;
  //   }
  //   // }
  //   return false;
  // };

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
    _info.filter.page = 1;
    _info.filter.startPage = 0;

    // 카테고리가 변경될 경우, 필터 리스트 초기화
    if (commentsInfo.selectCategory !== info.selectCategory) {
      _info.filter.list = {};
    }

    fetchCommentsList(_info);
  };

  // 다음 데이터 가져오기
  const moreLoad = () => {
    const _info = { ...commentsInfo };

    if (render && !wating) {
      const currentPage = _info.filter.page * _info.filter.limit;

      if (_info.filter.allData > currentPage) {
        _info.filter.page++;

        fetchCommentsList(_info);
      }
    }
  };

  return (
    <CommentsUIPage
      commentsInfo={commentsInfo}
      changeInfo={changeInfo}
      moreLoad={moreLoad}
      adminLogin={adminLogin}
      module={module}
      fetchCommentsList={fetchCommentsList}
      render={render}
      loading={loading}
    />
  );
}

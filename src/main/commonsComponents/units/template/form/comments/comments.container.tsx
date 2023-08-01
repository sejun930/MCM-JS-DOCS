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
  initCountList,
  initCommentsInfo,
  CommentsAllInfoTypes,
} from "./comments.types";
import {
  deepCopy,
  getUserIp,
  moveDocument,
} from "src/main/commonsComponents/functional";
import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import countApis from "src/commons/libraries/apis/comments/count/count.apis";

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
    const { selectCategory, filter } = info;
    const { list, limit, page } = filter;

    // 선택되어 있는 카테고리가 있다면 해당 카테고리 조회
    if (selectCategory !== "all" && selectCategory) {
      doc = doc.where("category", "==", selectCategory);
    }

    switch (selectCategory) {
      case "bug":
        // 카테고리가 버그일 경우
        if (list["bug-complete"])
          // 해결 완료만 보기
          doc = doc.where("bugStatus", "==", 2);
        break;

      case "question":
        // 카테고리가 문의일 경우
        if (list["question-complete"])
          // 답변 완료만 보기
          doc = doc.where("answer", "!=", "").orderBy("answer");
        break;
    }

    // 카테고리가 버그 및 리뷰일 경우
    if (selectCategory === "bug" || selectCategory === "review") {
      const numArr = [];

      // 선택한 점수들만 모아보기
      for (const num in list) {
        if (list[num]) {
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
    doc = doc.orderBy("createdAt", list.oddest ? "asc" : "desc");

    // 페이지 별로 데이터 limit 개씩 노출
    if (!notLimit) doc = doc.limit(limit * page);

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
        if (!_info.filter.list[filter]) {
          _info.filter.list[filter] = false;
        }
      }
      const doc = getFilterQuery({
        doc: getDoc("comments", module, "comment"),
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
        const getCountList = await countApis({ module }).asyncAllCountList(
          _commentInfo
        );
        _commentInfo.countFilterList = getCountList;

        // 전체 데이터 수 저장하기
        _commentInfo.filter.allData =
          _commentInfo.countFilterList[_commentInfo.selectCategory].count;

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
              doc: getDoc("comments", module, "comment"),
              info: _info,
              notLimit: true,
            });

            const allSize = (await bugDoc.get()).size;
            _commentInfo.filter.allData = allSize;
            _commentInfo.countFilterList[_commentInfo.selectCategory].count =
              allSize;

            // 필터가 제외된 전체 데이터 가져오기
            _commentInfo.countFilterList.all.count =
              _commentInfo.countFilterList.review.count +
              _commentInfo.countFilterList.question.count +
              allSize;
          }
        }

        // 시작 페이지 저장
        if (startPage) _commentInfo.filter.startPage = startPage || 1;

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
    return;

    const filterCountList = deepCopy(info.countFilterList);

    if (module) {
      try {
        const doc = getDoc("comments", module, "count");

        const categoryList = await apis(doc).read();
        if (categoryList.empty) {
          // 비어있을 경우 새로 생성하기
          Promise.all(
            initCountList.map(async (el) => {
              await (doc as CollectionReferenceDocumentData).add(el);
            })
          );
        } else {
          categoryList.forEach((data) => {
            const _data = data.data();

            // 각각의 카테고리 정보 가져오기
            filterCountList[_data.category] = {
              ...filterCountList[_data.category],
              ..._data,
            };
            filterCountList[_data.category].id = data.id;

            // count와 카테고리만 제외한 나머지 필터 키값만 가져오기
            const { category } = _data;
            // 현재 선택되어 있는 필터 정보 가져오기
            const { list } = info.filter;

            if (category === "question" && list["question-complete"]) {
              // 카테고리가 문의이면서 완료된 항목만 검색할 경우
              filterCountList[category].count = _data["question-complete"];
            } else if (category === "review" || category === "bug") {
              // 카테고리가 리뷰 또는 버그일 경우

              if (category === "bug" && list["bug-complete"]) {
                // 카테고리가 버그이면서 완료된 항목 검색시
                filterCountList[category].count = _data["bug-complete"];
              }

              // 점수별로 필터가 있는지 검증
              const isFilter = Array.from(
                new Array(5),
                (_, idx) => 1 + idx
              ).some((num) => list[`${category}-${num}`]);

              if (isFilter) {
                // 필터 검증을 위해 전체 개수 초기화
                filterCountList[category].count = 0;

                // 필터가 하나라도 있는 경우
                Array.from(new Array(5), (_, idx) => 1 + idx).forEach((num) => {
                  if (info.filter.list[`${category}-${num}`]) {
                    filterCountList[category].count +=
                      _data[`${category}-${num}`];
                  }
                });
              }
            }
          });
          // 전체 개수 구하기
          filterCountList.all.count = 0;
          for (const category in filterCountList) {
            filterCountList.all.count += filterCountList[category].count;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    return filterCountList;
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

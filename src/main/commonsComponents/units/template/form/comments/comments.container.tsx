import CommentsUIPage from "./comments.presenter";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState, adminLoginState } from "src/commons/store";

import apis from "src/commons/libraries/apis/commons.apis";
import blockApis from "src/commons/libraries/apis/block/block.apis";

import {
  CollectionReferenceDocumentData,
  getResult,
} from "src/commons/libraries/firebase";

import { initCommentsInfo, CommentsAllInfoTypes } from "./comments.types";
import {
  deepCopy,
  getUserIp,
  moveDocument,
} from "src/main/commonsComponents/functional";
import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import countApis from "src/commons/libraries/apis/comments/count/count.apis";
import commentsApis from "src/commons/libraries/apis/comments/comments.apis";

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

  // 댓글 리스트 조회
  const fetchCommentsList = async (
    info?: CommentsAllInfoTypes,
    startPage?: number // 페이지네이션을 이용해 이동했을 경우
  ) => {
    if (wating || loading) return;
    wating = true;
    setLoading(true);

    if (module) {
      const _info = deepCopy(info || commentsInfo) as CommentsAllInfoTypes;
      const { selectCategory, filter } = _info;
      const { list } = filter;

      for (const filterInfo in list) {
        if (!list[filterInfo]) {
          list[filterInfo] = false;
        }
      }

      try {
        const _commentInfo = deepCopy(_info) as CommentsAllInfoTypes;

        // 댓글 리스트 저장하기 (필터 적용된 데이터로 조회)
        _commentInfo.commentsList = getResult(
          await apis(
            (
              await commentsApis({ module, ip: _info.userIp })
            ).getQueryResult({
              category: selectCategory,
              filterList: filter,
            }) as CollectionReferenceDocumentData
          ).read()
        );

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
            const getAllSize = await apis(
              (
                await commentsApis({ module })
              ).getQueryResult({
                category: _commentInfo.selectCategory,
                filterList: _commentInfo.filter,
                notLimit: true,
              }) as CollectionReferenceDocumentData
            ).read();
            const allSize = getAllSize.size;

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
          moveDocument({ id: "comments-list-wrapper" });
        }

        setCommentsInfo(_commentInfo);
        wating = false;
      } catch (err) {
        console.log(`댓글을 정상적으로 불러오지 못했습니다. : ${err}`);
      }
    }
    setLoading(false);
  };

  // 데이터 정보 변경하기
  const changeInfo = (info: CommentsAllInfoTypes) => {
    const _info = { ...commentsInfo, ...info };
    _info.filter.page = 1;
    _info.filter.startPage = 0;

    // 카테고리가 변경될 경우, 필터 리스트 초기화
    if (commentsInfo.selectCategory !== info.selectCategory) {
      const filterList: { [key: string]: boolean } = {};

      // 과거순 필터 유지하기
      if (commentsInfo.filter.list.oddest) filterList.oddest = true;
      _info.filter.list = filterList;
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

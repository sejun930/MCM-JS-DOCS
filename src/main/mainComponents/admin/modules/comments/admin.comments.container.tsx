import AdminCommentsUIPage from "./admin.comments.presenter";
import { useState, useEffect, ChangeEvent } from "react";

import {
  CollectionReferenceDocumentData,
  getDoc,
} from "src/commons/libraries/firebase";
import { InfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import apis from "src/commons/libraries/apis/commons.apis";
import { deepCopy, moveDocument } from "src/main/commonsComponents/functional";

import {
  initCommentsInfo,
  CommentsAllInfoTypes,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { AdminCommentsInitType } from "./admin.comments.types";
import { navList } from "src/main/commonsComponents/layout/nav/nav.data";

let startClickedPage = 1; // 페이지네이션으로 선택한 페이지
export default function AdminCommentsPage() {
  // 페이지 렌더
  const [render, setRender] = useState(false);
  // 페이지 일시정지
  const [isLoading, setIsLoading] = useState(false);
  // 관리자 특수기능창 on/off
  const [oepnSettings, setOpenSettings] = useState(false);

  // 댓글 정보 및 필터 정보 저장
  const [info, setInfo] = useState<AdminCommentsInitType>(
    deepCopy(initCommentsInfo)
  );

  // 댓글 리스트 가져오기
  useEffect(() => {
    const _info = deepCopy(initCommentsInfo) as AdminCommentsInitType;
    // 모듈 지정하기
    _info.selectModule = navList[0].name;
    _info.filter.limit = 20;

    fetchComments(_info);
  }, []);

  // 모듈 변경하기
  const changeSelectModule = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isLoading) return;

    const { value } = e.target;
    if (value) {
      setRender(false);

      const _info = deepCopy(initCommentsInfo);

      _info.selectModule = value;
      _info.selectCategory = "all";

      fetchComments(_info);
    }
  };

  // 댓글 정보 가져오기
  const fetchComments = async (
    info?: CommentsAllInfoTypes,
    isInfinite?: boolean
  ) => {
    // isInfinite: 무한 스크롤로 데이터를 조회할 경우
    if (isLoading) return;

    let _info = { ...(info || deepCopy(initCommentsInfo)) };
    // 댓글 정보 모두 가져오기
    let doc = getDoc("comments", _info.selectModule, "comment").orderBy(
      "createdAt",
      "desc"
    );
    // 삭제된 댓글은 제외
    doc = doc.where("deletedAt", "==", null);

    // 카테고리 별 데이터 조회
    if (_info.selectCategory !== "all")
      doc = doc.where("category", "==", _info.selectCategory);

    let startAt = null; // 페이지네이션 시작점 구하기
    // 전체 데이터 수 조회
    const allData = await apis(doc as CollectionReferenceDocumentData).read();
    if (allData.size) {
      // 전체 데이터의 수 저장하기
      _info.filter.allData = allData.size;

      // 데이터 조회 시작 시점
      startAt = allData.docs[(_info.filter.page - 1) * _info.filter.limit];
      if (isInfinite) {
        startAt = allData.docs[(startClickedPage - 1) * _info.filter.limit];
      }
    }

    // 시작 데이터 정하기
    if (startAt) doc = doc.startAt(startAt);

    // 가져올 데이터의 수 저장하기
    let limit = _info.filter.limit;
    if (isInfinite && _info.filter.page > startClickedPage) {
      limit = limit * (_info.filter.page - startClickedPage + 1);
    }

    // 개수 제한
    doc = doc.limit(limit);

    try {
      // 댓글들 조회
      const commentsList = (await doc.get()).docs;

      if (commentsList) {
        const _commentsList: Array<InfoTypes> = [];

        commentsList.forEach(async (el) => {
          const commentData = { ...el.data() };
          commentData.id = el.id;

          _commentsList.push(commentData as InfoTypes);
        });

        _info.commentsList = _commentsList;

        try {
          // 댓글 개수 조회
          const countDoc = (
            await getDoc("comments", _info.selectModule, "count").get()
          ).docs;
          if (countDoc && countDoc.length) {
            const countList: { [key: string]: number } = { all: 0 };
            const filterCountList: {
              [key: string]: { [key: string]: number };
            } = {};

            countDoc.forEach((el) => {
              const data = el.data();

              countList[data.category] = data.count;
              countList.all += data.count;

              const { category, count, ...filterCount } = data;
              filterCountList[data.category] = filterCount;
            });
            // 카테고리 별 전체 개수 저장
            _info.countList = countList;
            // 카테고리 별 필터별 개수 저장
            _info.countFilterList = filterCountList;
          }
        } catch (err2) {
          alert("댓글 개수 조회에 실패했습니다.");
          console.log(err2);
        }
      }
    } catch (err) {
      alert("댓글 조회에 실패했습니다.");
      console.log(err);
    }

    setInfo(_info);
    setRender(true);
    setIsLoading(false);
  };

  // 변경된 info 내용 저장하기
  const changeInfo = (info: CommentsAllInfoTypes, forcing?: boolean) => {
    if (isLoading && !forcing) return;
    setIsLoading(true);
    fetchComments(info);
  };

  const changeLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  // 현재 관리자 로그인 체크 및 로딩 체크
  const checkLoading = () => {
    checkAccessToken(true);
    if (isLoading) {
      alert("동기화 작업중입니다. 잠시만 기다려주세요.");
      return false;
    }
    return true;
  };

  // 관리자 특수기능창 toggle
  const toggleSettings = (bool: boolean) => () => {
    setOpenSettings((prev) => (bool ? bool : !prev));
  };

  // 페이지 변환하기
  const changePage = (page: number, isInfinite?: boolean) => {
    const _info = { ...info };

    if (isInfinite) {
      // 무한 스크롤과 함께 사용될 경우
      const lastPage = Math.ceil(_info.filter.allData / _info.filter.limit); // 전체 페이지 수 구하기
      if (page > lastPage) {
        return;
      }
    } else {
      startClickedPage = page;
      _info.filter.startPage = page;

      moveDocument("admin-comments-list-wrapper", -100);
    }

    _info.filter.page = page;

    setIsLoading(true);
    fetchComments(_info, isInfinite);
  };

  return (
    <AdminCommentsUIPage
      info={info}
      render={render}
      isLoading={isLoading}
      changeSelectModule={changeSelectModule}
      changeLoading={changeLoading}
      fetchComments={fetchComments}
      changeInfo={changeInfo}
      toggleSettings={toggleSettings}
      oepnSettings={oepnSettings}
      checkLoading={checkLoading}
      changePage={changePage}
    />
  );
}

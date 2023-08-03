import AdminCommentsUIPage from "./admin.comments.presenter";
import { useState, useEffect, ChangeEvent } from "react";
import { _Title } from "mcm-js-commons";

import {
  CollectionReferenceDocumentData,
  getResult,
} from "src/commons/libraries/firebase";
import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";

import apis from "src/commons/libraries/apis/commons.apis";
import { deepCopy, moveDocument } from "src/main/commonsComponents/functional";
import commentsApis from "src/commons/libraries/apis/comments/comments.apis";
import countApis from "src/commons/libraries/apis/comments/count/count.apis";

import {
  initCommentsInfo,
  CommentsAllInfoTypes,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
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
  const [info, setInfo] = useState<CommentsAllInfoTypes>(
    deepCopy(initCommentsInfo)
  );

  // 댓글 리스트 가져오기
  useEffect(() => {
    const _info = deepCopy(initCommentsInfo) as CommentsAllInfoTypes;
    // 모듈 지정하기
    _info.selectModule = navList[0].name;
    _info.filter.limit = 20;

    fetchComments({ info: _info });
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
  const fetchComments = async ({
    info,
    isInfinite,
    alertMsg,
    moveTop,
  }: {
    info?: CommentsAllInfoTypes;
    isInfinite?: boolean;
    alertMsg?: string;
    moveTop?: boolean;
  }) => {
    // 관리자 권한 검증
    if (!checkAccessToken(true)) return;

    // isInfinite: 무한 스크롤로 데이터를 조회할 경우
    if (isLoading) return;

    const _info: CommentsAllInfoTypes = {
      ...(info || deepCopy(initCommentsInfo)),
    };
    const { selectModule, selectCategory, filter } = _info;
    // 페이지네이션 시작점 구하기
    let startAt = null;

    // 전체 데이터 수 조회 (필터 적용, limit 적용 전)
    const allData = await apis(
      (
        await commentsApis({ module: selectModule, isAdmin: true })
      ).getQueryResult({
        category: selectCategory,
        filterList: filter,
        notLimit: true,
      }) as CollectionReferenceDocumentData
    ).read();

    if (allData.size) {
      // 전체 데이터의 수 저장하기
      _info.filter.allData = allData.size;
      // 데이터 조회 시작 시점
      startAt = allData.docs[(_info.filter.page - 1) * _info.filter.limit];
      if (isInfinite) {
        startAt = allData.docs[(startClickedPage - 1) * _info.filter.limit];
      }
    }

    // 가져올 데이터의 제한 수 적용하기
    // if (isInfinite && page > startClickedPage) {
    //   _info.filter.limit = limit * (page - startClickedPage);
    // }

    // 필터가 적용된 댓글 리스트 정보 가져오기 (limit 적용)
    let commentsDoc = (
      await commentsApis({ module: selectModule, isAdmin: true })
    ).getQueryResult({
      category: selectCategory,
      filterList: filter,
    });

    // 페이지네이션 시작점 적용
    if (startAt) commentsDoc = commentsDoc.startAt(startAt);

    try {
      // 필터, limit 적용이 완료된 전체 댓글 리스트 가져오기
      _info.commentsList = getResult(
        await apis(commentsDoc as CollectionReferenceDocumentData).read()
      );

      try {
        // 카테고리 개수 저장하기
        _info.countFilterList = await countApis({
          module: selectModule,
        }).asyncAllCountList(_info);
      } catch (err2) {
        console.log(err2);
        alert("카테고리 개수 조회에 실패했습니다.");
      }
    } catch (err) {
      console.log(err);
      alert("댓글 리스트 조회에 실패했습니다.");
    }

    setInfo(_info);
    setRender(true);
    setIsLoading(false);

    if (alertMsg) alert(alertMsg);
    if (isLoading) setIsLoading(false);
    if (moveTop) moveDocument("admin-comments-list-wrapper", -160);
  };

  const changeLoading = (bool: boolean) => {
    setIsLoading(bool);
  };

  // 현재 관리자 로그인 체크 및 로딩 체크
  const checkLoading = () => {
    if (!checkAccessToken(true)) return false;
    if (isLoading) {
      alert("동기화 작업중입니다. 잠시만 기다려주세요.");
      return false;
    }
    return true;
  };

  // 관리자 특수기능창 toggle
  const toggleSettings = (bool: boolean) => () => {
    setOpenSettings((prev) => bool || !prev);
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
    fetchComments({ info: _info, isInfinite });
  };

  // 필터 변경용 함수
  const changeFilterComments = (info: CommentsAllInfoTypes) => {
    setIsLoading(true);
    info.filter.page = 1;
    info.filter.startPage = 0;

    fetchComments({ info, moveTop: true });
  };

  return (
    (render && (
      <AdminCommentsUIPage
        info={info}
        isLoading={isLoading}
        changeSelectModule={changeSelectModule}
        changeLoading={changeLoading}
        fetchComments={fetchComments}
        toggleSettings={toggleSettings}
        oepnSettings={oepnSettings}
        checkLoading={checkLoading}
        changePage={changePage}
        changeFilterComments={changeFilterComments}
      />
    )) || <_Title>페이지 호출 중...</_Title>
  );
}

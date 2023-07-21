import AdminCommentsUIPage from "./admin.comments.presenter";
import { useState, useEffect, ChangeEvent } from "react";

import {
  AdminCommentsInitType,
  adminCommentsInit,
} from "./admin.comments.types";
import { getDoc } from "src/commons/libraries/firebase";
import { InfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";

export default function AdminCommentsPage() {
  // 페이지 렌더
  const [render, setRender] = useState(false);
  // 페이지 일시정지
  const [isLoading, setIsLoading] = useState(false);

  // 댓글 정보 및 필터 정보 저장
  const [info, setInfo] = useState<AdminCommentsInitType>({
    ...adminCommentsInit,
  });

  // 댓글 리스트 가져오기
  useEffect(() => {
    const _info = { ...adminCommentsInit };
    fetchComments(_info);
  }, []);

  // 모듈 변경하기
  const changeSelectModule = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isLoading) return;

    const { value } = e.target;
    if (value) {
      setRender(false);

      const _info = { ...adminCommentsInit, ["selectModule"]: value };
      _info.selectCategory = "all";

      fetchComments(_info);
    }
  };

  // 댓글 정보 가져오기
  const fetchComments = async (info?: AdminCommentsInitType) => {
    if (isLoading) return;

    let _info = { ...(info || adminCommentsInit) };

    // 댓글 정보 모두 가져오기
    let doc = getDoc("comments", _info.selectModule, "comment").orderBy(
      "createdAt",
      "desc"
    );

    // 카테고리 별 데이터 조회
    if (_info.selectCategory !== "all")
      doc = doc.where("category", "==", _info.selectCategory);

    // 삭제된 댓글은 제외
    doc = doc.where("deletedAt", "==", null);

    // 개수 제한
    doc = doc.limit(10);

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
  };

  // 변경된 info 내용 저장하기
  const changeInfo = (info: AdminCommentsInitType, forcing?: boolean) => {
    if (isLoading && !forcing) return;
    fetchComments(info);
  };

  const changeLoading = (bool: boolean) => {
    setIsLoading(bool);
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
    />
  );
}

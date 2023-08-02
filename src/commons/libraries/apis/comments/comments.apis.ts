import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";
import {
  CollectionReferenceDocumentData,
  QueryDocumentData,
  QuerySnapshotDocumentData,
  getDoc,
  getServerTime,
} from "../../firebase";

import blockApis from "../block/block.apis";
import countApis from "./count/count.apis";

import {
  changeServerText,
  checkSamePassword,
  getBugAutoAnswer,
  getUserIp,
} from "src/main/commonsComponents/functional";
import apis from "../commons.apis";

type ReturnCommentsResultType = { success: boolean; msg: string };

// 댓글 관련 apis
const commentsApis = async ({
  ip,
  docs,
  module,
  isAdmin,
}: {
  ip?: string; // 유저 아이피
  module: string; // 현재 선택된 모듈
  docs?: CollectionReferenceDocumentData;
  isAdmin?: boolean; // 관리자 권한 여부
}) => {
  // 댓글 리스트 docs
  const commentDoc = docs || getDoc("comments", module, "comment");

  const _ip = ip || (await getUserIp());
  // 차단된 유저인지 체크
  const checkBlockUser = await blockApis().checkBlock(_ip);

  // 결과 리턴하기
  const result: ReturnCommentsResultType = {
    success: false,
    msg: "",
  };

  return {
    // 전체 데이터 가져오기
    getComments: async (): Promise<QuerySnapshotDocumentData> => {
      return await apis(commentDoc).read();
    },

    // 댓글 추가하기
    addComments: async ({
      input,
      updateCategory,
    }: {
      input: WriteInfoTypes;
      updateCategory?: boolean; // 카테고리 업데이트 여부
    }): Promise<ReturnCommentsResultType> => {
      if (checkBlockUser.isBlock) {
        // 차단된 유저라면 게시물 작성 금지
        result.msg = "차단된 유저입니다.";
      } else {
        // 작성일이 없다면 새로 생성하기
        if (!input.createdAt) input.createdAt = getServerTime();

        try {
          // 댓글 추가
          const addResult = await commentDoc.add(input);
          result.success = true;

          // 카테고리 개수 추가
          if (addResult.id && updateCategory) {
            try {
              // 해당 카테고리 1개 추가
              const { docId, countList } = await countApis({ module }).add({
                input,
              });
              // 카테고리 업데이트

              if (docId) {
                return await countApis({ module }).update(docId, countList);
              }
            } catch (err2) {
              console.log(err2);
              result.msg = "카테고리 개수 업데이트에 실패했습니다.";
            }
          }
        } catch (err) {
          console.log(err);
          result.msg = "댓글 추가에 실패했습니다.";
        }
      }

      return result;
    },

    // 댓글 삭제하기
    removeComments: async ({
      input,
      password,
      updateCategory,
    }: {
      input: WriteInfoTypes;
      password: string;
      updateCategory?: boolean; // 카테고리 업데이트 여부
    }): Promise<ReturnCommentsResultType> => {
      // 관리자이거나 비밀번호 체크하기 (관리자일 경우 비밀번호 체크를 하지 않음)
      const samePw =
        isAdmin || (await checkSamePassword(input.password, password));

      // 입력한 비밀번호가 일치하는 경우에만 삭제 가능
      if (samePw) {
        // 삭제일 기입하기 (수정 모드에서는 작동 X)
        if (!input.deletedAt) input.deletedAt = getServerTime();

        try {
          // 댓글 삭제하기
          await commentDoc.doc(input.id).update(input);
          result.success = true;

          // 카테고리 업데이트
          if (updateCategory) {
            try {
              // 해당 카테고리에서 1개 제거하기
              const { docId, countList } = await countApis({ module }).remove({
                input,
              });

              if (docId) {
                // 카테고리 최종 업데이트
                return await countApis({ module }).update(docId, countList);
              }
            } catch (err2) {
              console.log(err2);
              result.msg = "카테고리 (삭제)업데이트에 실패했습니다.";
            }
          }
        } catch (err) {
          console.log(err);
          result.msg = "댓글 삭제에 실패했습니다.";
        }
      } else {
        result.msg = "비밀번호가 일치하지 않습니다.";
      }

      return result;
    },

    // 댓글 수정하기 (+ 답변 등록하기)
    modifyComments: async ({
      password,
      originInput,
      changeInput,
      updateCategory,
    }: {
      password: string;
      originInput: WriteInfoTypes; // 수정전 원본 데이터
      changeInput: WriteInfoTypes; // 수정할 데이터
      updateCategory?: boolean;
    }): Promise<ReturnCommentsResultType> => {
      // 관리자이거나 비밀번호 체크하기 (관리자일 경우 비밀번호 체크를 하지 않음)
      const samePw =
        isAdmin || (await checkSamePassword(originInput.password, password));

      if (samePw) {
        try {
          changeInput.modifyAt = getServerTime(); // 수정일 기입

          // 답변 등록용
          if (originInput.answer !== changeInput.answer) {
            // 새로운 답변이 등록될 경우, 답변일 변경
            changeInput.answerCreatedAt = getServerTime();

            if (changeInput.category === "bug") {
              // 이슈 카테고리일 경우
              if (changeInput.bugStatus === 0) {
                // 이슈 레벨이 "확인 대기중"일 경우
                changeInput.bugStatus = 1; // 이슈 처리중으로 변경
              }

              if (!changeInput.answer?.trim()) {
                // 이슈 답장이 없을 경우 자동매크로 답변 등록
                changeInput.answer = getBugAutoAnswer(changeInput.bugStatus);
              }
            } else {
              // 답장이 비어있을 경우
              if (!changeInput.answer?.trim())
                result.msg = "답변을 입력해주세요.";
            }
            changeInput.answer = changeServerText(
              (changeInput?.answer || "").trim()
            );
          }

          // 에러 메세지가 없을 경우 (= 업데이트 가능)
          if (!result.msg) {
            // 수정된 내용 최종 저장
            await commentDoc.doc(originInput.id).update(changeInput);
            result.success = true;

            try {
              if (updateCategory) {
                // 카테고리 업데이트
                const { docId, countList } = await countApis({ module }).modify(
                  {
                    originInput,
                    changeInput,
                  }
                );

                // 카테고리 최종 업데이트
                if (docId)
                  return await countApis({ module }).update(docId, countList);
              }
            } catch (err2) {
              console.log(err2);
              result.msg = "카테고리 (수정)업데이트에 실패했습니다.";
            }
          }
        } catch (err) {
          console.log(err);
          result.msg = "댓글 수정에 실패했습니다.";
        }
      } else {
        // 비밀번호가 일치하지 않을 경우
        result.msg = "비밀번호가 일치하지 않습니다.";
      }

      return result;
    },

    // 필터 정보 적용된 댓글 리스트 가져오기
    getQueryResult: ({
      category,
      filterList,
      notLimit,
    }: {
      category: string;
      filterList: {
        list: { [key: string]: string | number | boolean };
        limit: number;
        page: number;
        startPage: number;
      };
      notLimit?: boolean; // 데이터 개수 제한 없이 전체 데이터 조회
    }) => {
      let _commentDoc = commentDoc as QueryDocumentData;

      const { list, limit, page, startPage } = filterList;

      // 선택되어 있는 카테고리가 있다면 해당 카테고리 조회
      if (category !== "all" && category) {
        _commentDoc = _commentDoc.where("category", "==", category);
      }

      switch (category) {
        case "bug":
          // 카테고리가 버그일 경우
          if (list["bug-complete"])
            // 해결 완료만 보기
            _commentDoc = _commentDoc.where("bugStatus", "==", 2);
          break;

        case "question":
          // 카테고리가 문의일 경우
          if (list["question-complete"])
            // 답변 완료만 보기
            _commentDoc = _commentDoc
              .where("answer", "!=", "")
              .orderBy("answer");
          break;
      }

      // 카테고리가 버그 및 리뷰일 경우
      if (category === "bug" || category === "review") {
        const numArr = [];

        // 선택한 점수들만 모아보기
        for (const num in list) {
          if (list[num]) {
            const _rating = num.split("-");

            if (_rating[0] === category && Number(_rating[1]))
              numArr.push(Number(_rating[1]));
          }
        }

        const column = category === "review" ? "rating" : "bugLevel";
        // 해당 점수로 필터하기
        if (numArr.length)
          _commentDoc = _commentDoc.where(column, "in", numArr);
      }

      // 삭제되지 않은 댓글만 조회
      if (!list.deleted)
        _commentDoc = _commentDoc.where("deletedAt", "==", null);

      // 과거순 및 최신순으로 조회하기
      _commentDoc = _commentDoc.orderBy(
        "createdAt",
        list.oddest ? "asc" : "desc"
      );

      // 페이지 별로 데이터 limit 개씩 노출
      let _page = 1;
      if (!notLimit) {
        if (!startPage) {
          // 페이지네이션이 설정되지 않았을 경우 (= 시작 페이지가 없는 경우)
          _page = page;
        } else {
          // 페이지네이션이 설정되어 있는 경우 (= 시작 페이지가 있는 경우)
          _page = page - startPage + 1;
        }
        _commentDoc = _commentDoc.limit(limit * _page);
      }

      return _commentDoc;
    },
  };
};

export default commentsApis;

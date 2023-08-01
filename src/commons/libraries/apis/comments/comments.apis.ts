import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";
import {
  CollectionReferenceDocumentData,
  QueryDocumentData,
  getDoc,
} from "../../firebase";

import blockApis from "../block/block.apis";
import countApis from "./count/count.apis";

import { getServerTime } from "../../firebase";
import {
  changeServerText,
  checkSamePassword,
  getBugAutoAnswer,
} from "src/main/commonsComponents/functional";

// 댓글 관련 apis
const commentsApis = async ({
  input,
  docs,
  module,
  isAdmin,
}: {
  input: WriteInfoTypes;
  docs?: {
    commentDoc: CollectionReferenceDocumentData;
    countDoc: CollectionReferenceDocumentData;
  };
  module: string;
  isAdmin?: boolean; // 관리자 권한 여부
}) => {
  // 댓글 리스트 docs
  const commentDoc =
    (docs && docs.commentDoc) || getDoc("comments", module, "comment");
  // 댓글 개수 리스트 docs
  const countDoc =
    (docs && docs.countDoc) || getDoc("comments", module, "count");

  // 차단된 유저인지 체크
  const checkBlockUser = await blockApis().checkBlock(input.ip);

  // 결과 리턴하기
  const result: ReturnCommentsResultType = {
    success: false,
    msg: "",
  };

  return {
    // 댓글 추가하기
    addComments: async (
      updateCategory?: boolean // 카테고리 업데이트 여부
    ): Promise<ReturnCommentsResultType> => {
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
      password,
      updateCategory,
    }: {
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
  };
};

export default commentsApis;

type ReturnCommentsResultType = { success: boolean; msg: string };

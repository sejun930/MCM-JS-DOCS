import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";
import { CollectionReferenceDocumentData, getDoc } from "../../firebase";

import blockApis from "../block/block.apis";
import countApis from "./count/count.apis";
import { getServerTime } from "../../firebase";

// 댓글 관련 apis
const commentsApis = ({
  input,
  docs,
  module,
}: {
  input: WriteInfoTypes;
  docs?: {
    commentDoc: CollectionReferenceDocumentData;
    countDoc: CollectionReferenceDocumentData;
  };
  module: string;
}) => {
  // 댓글 리스트 docs
  const commentDoc =
    (docs && docs.commentDoc) || getDoc("comments", module, "comment");
  // 댓글 개수 리스트 docs
  const countDoc =
    (docs && docs.countDoc) || getDoc("comments", module, "count");

  return {
    // 댓글 추가하기
    addComments: async (
      updateCategory?: boolean // 카테고리 업데이트 여부
    ): Promise<{ success: boolean; msg: string }> => {
      const result: { success: boolean; msg: string } = {
        success: false,
        msg: "",
      };

      // 차단된 유저인지 체크
      if (await blockApis().checkBlock(input.ip)) {
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
              const addCountResult = await countApis({ module }).add({ input });
              // 카테고리 업데이트

              return await countApis({ module }).update(
                addCountResult.docId,
                addCountResult.countList
              );
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
    removeComments: () => {},
  };
};

export default commentsApis;

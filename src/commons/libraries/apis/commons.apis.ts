import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";
import {
  QueryDocumentData,
  getDoc,
  getServerTime,
  CollectionReferenceDocumentData,
} from "../firebase";
import { BlockInputTypes, AddBlockInputType } from "./commons.types";

const apis = (doc: QueryDocumentData & CollectionReferenceDocumentData) => {
  return {
    // 데이터 조회
    read: async () => await doc.get(),
    // 유저 차단
    block: async (input: BlockInputTypes) => {
      const _input: BlockInputTypes & AddBlockInputType = { ...input };

      _input.createdAt = getServerTime(); // 차단된 날짜
      _input.canceledAt = null; // 차단 취소일

      try {
        await doc.add(_input);
        return true;
      } catch (err) {
        alert("유저 차단에 실패했습니다.");
        console.log(err);

        return false;
      }
    },
    // 차단 해제
    unblock: async (docId: string) => {
      try {
        await doc.doc(docId).update({
          canceledAt: getServerTime(), // 차단해제 시간 입력 (= 차단 해제)
        });
        return true;
      } catch (err) {
        alert("차단 해제에 실패했습니다.");
        console.log(err);

        return false;
      }
    },
    // 댓글 추가하기
    addComments: async (input: WriteInfoTypes, module: string) => {
      let result = { success: true, msg: "" };

      // 차단된 유저인지 체크
      const checkBlock = (await apis(getDoc("block", "user", "ip")).checkBlock(
        input.ip
      )) as BlockInputTypes;
      if (checkBlock.ip) {
        // 차단된 유저라면 게시물 작성 금지
        result = {
          success: false,
          msg: `차단된 유저입니다.`,
        };
      } else {
        // 작성일이 없다면 새로 생성하기
        if (!input.createdAt) input.createdAt = getServerTime();

        try {
          // 댓글 추가
          await doc.add(input);

          // 카테고리 개수 추가
          const countDoc = getDoc("comments", module, "count");
          const countList = await countDoc
            .where("category", "==", input.category)
            .get();

          if (!countList.empty) {
            let countListResult = countList.docs[0].data();
            countListResult = {
              ...countListResult,
              ["count"]: countListResult.count + 1,
            };

            // 이슈, 리뷰일 경우 각각의 필터 1개 더하기
            if (countListResult.category !== "question") {
              const num =
                input.category === "bug" ? input.bugLevel : input.rating;
              countListResult[`${input.category}-${num}`]++;
            }

            try {
              // 카테고리 개수 업데이트
              await countDoc.doc(countList.docs[0].id).update(countListResult);
            } catch (err2) {
              console.log(err2);
              result = {
                success: false,
                msg: `카테고리 개수 업데이트에 실패했습니다.`,
              };
            }
          }
        } catch (err) {
          console.log(err);
          result = { success: false, msg: `댓글 추가에 실패했습니다.` };
        }
      }

      return result;
    },
    // 차단된 유저인지 검증
    checkBlock: async (userIp: string) => {
      let result = {};
      const isBlock = await doc
        .where("ip", "==", userIp) // 해당 유저의 아이피가 차단된 내역이 있는지 검증
        .where("canceledAt", "==", null) // 차단이 해제되지 않은 유저인지 검증
        .limit(1)
        .get();

      if (!isBlock.empty) result = isBlock.docs[0].data();

      return result; // 비어있다면 차단되지 않은 유저
    },
  };
};

export default apis;

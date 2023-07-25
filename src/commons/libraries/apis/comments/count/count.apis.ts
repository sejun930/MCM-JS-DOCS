import {
  CollectionReferenceDocumentData,
  QueryDocumentData,
  getDoc,
} from "src/commons/libraries/firebase";
import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

// 카운트 관련 apis
const countApis = ({
  countDocs,
  module,
}: {
  countDocs?: CollectionReferenceDocumentData;
  module: string;
}) => {
  let countDoc: QueryDocumentData =
    countDocs || getDoc("comments", module, "count");

  return {
    // 댓글 추가시 카운트 업데이트 (최종 업데이트 X)
    add: async ({
      input,
      //   countList,
      getDocId,
    }: {
      input: WriteInfoTypes;
      //   countList?: CountListType;
      getDocId?: boolean;
    }): Promise<{ countList: CountListType; docId: string }> => {
      const result: { countList: CountListType; docId: string } = {
        countList: {},
        docId: "",
      };
      // 해당 카테고리 조회
      countDoc = countDoc.where("category", "==", input.category);
      const getCountDoc = (await countDoc.get()).docs[0];

      let _countList = getCountDoc.data();
      // 전체 카테고리 개수 1개 추가
      _countList = { ..._countList, ["count"]: _countList.count + 1 };
      // docId 가져오기
      result.docId = getCountDoc.id;

      // 이슈, 리뷰일 경우 각각의 필터 1개 더하기
      if (_countList.category !== "question") {
        const num = input.category === "bug" ? input.bugLevel : input.rating;
        _countList[`${input.category}-${num}`]++;
      }
      result.countList = _countList;

      return result;
    },
    // 댓글 삭제시 카운트 업데이트 (최종 업데이트 X)
    remove: async () => {},
    // 카운트 최종 업데이트
    update: async (
      docId: string,
      countList: CountListType
    ): Promise<{ success: boolean; msg: string }> => {
      const result: { success: boolean; msg: string } = {
        success: false,
        msg: "",
      };

      if (!docId) result.msg = "[docId]가 없습니다.";
      else if (!countList) result.msg = "[countList]가 없습니다.";
      else {
        try {
          // 업데이트 성공
          await (countDoc as CollectionReferenceDocumentData)
            .doc(docId)
            .update(countList);
          result.success = true;
        } catch (err) {
          console.log(err);
          result.msg = "카테고리 업데이트에 실패했습니다.";
        }
      }

      return result;
    },
  };
};

export default countApis;

export type CountListType = { [key: string]: string | number };

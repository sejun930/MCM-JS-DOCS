import {
  CollectionReferenceDocumentData,
  QueryDocumentData,
  QueryDocumentSnapshotDocumentData,
  getDoc,
} from "src/commons/libraries/firebase";
import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

// 카운트 관련 apis
const countApis = ({ module }: { module: string }) => {
  let countDoc: QueryDocumentData = getDoc("comments", module, "count");

  // update를 제외한 결과 객체
  const result: ReturnResultType = {
    countList: {},
    docId: "",
  };

  return {
    // 댓글 추가시 카운트 업데이트 (최종 업데이트 X)
    add: async ({
      input,
      countList, // 외부에서 넘겨주는 카운트 리스트
    }: {
      input: WriteInfoTypes;
      countList?: {
        countList: { [key: string]: string | number };
        docId: string;
      };
    }): Promise<ReturnResultType> => {
      // 해당 카테고리 조회
      const getCountDoc =
        countList || (await countApis({ module }).getCountDoc(input.category));

      let _countList = getCountDoc.countList;

      // 전체 카테고리 개수 1개 추가
      _countList = { ..._countList, ["count"]: _countList.count + 1 };
      // docId 가져오기
      result.docId = getCountDoc.docId;

      // 이슈, 리뷰일 경우 각각의 필터 1개 더하기
      if (_countList.category !== "question") {
        const num = input.category === "bug" ? input.bugLevel : input.rating;
        _countList[`${input.category}-${num}`]++;
      }
      result.countList = _countList;

      return result;
    },
    // 댓글 삭제시 카운트 업데이트 (최종 업데이트 X)
    remove: async ({
      input,
    }: {
      input: WriteInfoTypes;
    }): Promise<ReturnResultType> => {
      // 해당 카테고리 조회
      const getCountDoc = await countApis({ module }).getCountDoc(
        input.category
      );
      let _countList = getCountDoc.countList;

      // 전체 카테고리 개수 1개 제거
      _countList = { ..._countList, ["count"]: _countList.count - 1 };
      // docId 가져오기
      result.docId = getCountDoc.docId;

      const { category } = input;
      // 버그 또는 리뷰 별 접근할 컬럼 이름
      const target = category === "bug" ? "bugLevel" : "rating";

      if (category === "question") {
        // 카테고리가 문의일 경우
        if (input.answer && input.answerCreatedAt) {
          // 답장이 등록되어 있는 경우, "답장 완료(question-complete)" 1개 제거
          _countList["question-complete"]--;
        }
      } else {
        // 카테고리가 버그 또는 리뷰일 경우
        // 해당 점수(버그 레벨 및 평점) 1개 삭제
        _countList[`${category}-${input[target]}`]--;

        if (category === "bug" && input.bugStatus === 2) {
          // 이슈일 때, "해결 완료(bug-complete)"라면 해당 필터도 1개 제거
          _countList["bug-complete"]--;
        }
      }
      result.countList = _countList;

      return result;
    },
    // 댓글 수정시 카운트 업데이트 (최종 업데이트 X)
    modify: async ({
      originInput,
      changeInput,
    }: {
      originInput: WriteInfoTypes;
      changeInput: WriteInfoTypes;
    }): Promise<ReturnResultType> => {
      // 해당 카테고리 조회
      const getCountDoc = await countApis({ module }).getCountDoc(
        originInput.category
      );
      let _countList = getCountDoc.countList;
      result.docId = getCountDoc.docId;

      const { category } = originInput;
      if (category === "question") {
        // 카테고리가 문의일 경우
        if (!originInput.answer && changeInput.answer) {
          // 새로운 답변이 등록된다면, "question-complete" 1개 추가
          _countList["question-complete"]++;
        }
      } else {
        // 이슈 및 리뷰일 경우 변경된 점수로 업데이트
        const target = category === "bug" ? "bugLevel" : "rating";
        if (originInput[target] !== changeInput[target]) {
          // 점수를 변경했을 경우
          _countList[`${category}-${originInput[target]}`]--; // 기존의 점수는 1개 제거
          _countList[`${category}-${changeInput[target]}`]++; // 변경된 점수는 1개 추가
        }

        // 이슈 카테고리에서
        if (category === "bug") {
          // 답변이 완료될 경우
          if (originInput.bugStatus !== 2 && changeInput.bugStatus === 2) {
            _countList["bug-complete"]++;
          }
        }
      }
      result.countList = _countList;

      return result;
    },

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
    // 카운트 Doc 가져오기
    getCountDoc: async (category: string) => {
      const docs = (await countDoc.where("category", "==", category).get())
        .docs[0];
      return {
        countList: docs.data(),
        docId: docs.id,
      };
    },
    // 전체 리스트 가져오기
    getAllCountList: async () => {
      return (await countDoc.get()).docs.reduce(
        (acc: { [category: string]: any }, cur) => {
          const data = cur.data() as { [key: string]: string | number };

          acc[data.category] = data;
          acc[data.category].id = cur.id;
          return acc;
        },
        {}
      );
    },
  };
};

export default countApis;

export type CountListType = { [key: string]: string | number };
export type ReturnResultType = { countList: CountListType; docId: string };

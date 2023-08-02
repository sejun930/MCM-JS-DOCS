import {
  CollectionReferenceDocumentData,
  QueryDocumentData,
  getDoc,
} from "src/commons/libraries/firebase";
import { deepCopy } from "src/main/commonsComponents/functional";
import {
  CommentsAllInfoTypes,
  CountFilterTypes,
  initCountList,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

export type CountListType = { [key: string]: string | number };
export type ReturnResultType = { countList: CountListType; docId: string };

// 카운트 관련 apis
const countApis = ({ module }: { module: string }) => {
  const countDoc: QueryDocumentData = getDoc("comments", module, "count");

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

      _countList = {
        ..._countList,
        ["count"]: _countList.count - 1, // 전체 카테고리 개수 1개 제거
        ["deleted"]: _countList.deleted + 1, // 삭제 카테고리 개수 1개 추가
      };
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
      const _countList = getCountDoc.countList;
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

    // 카테고리 개수 동기화 시키기 (+ 필터 적용하기)
    asyncAllCountList: async (
      info: CommentsAllInfoTypes
    ): Promise<CountFilterTypes> => {
      const filterCountList = deepCopy(info.countFilterList);

      if (module) {
        try {
          // 전체 카테고리 리스트 가져오기
          const categoryList = Object.entries(
            await countApis({ module }).getAllCountList()
          );

          if (!categoryList.length) {
            // 비어있을 경우 새로 생성하기
            const doc = getDoc("comments", module, "count");
            Promise.all(
              initCountList.map(
                async (el) =>
                  await (doc as CollectionReferenceDocumentData).add(el)
              )
            );
          } else {
            // 각각의 카테고리 정보 가져오기
            categoryList.forEach((data) => {
              const [category, categoryInfo] = data;

              // 서버에서 가져온 데이터와 종합하기
              filterCountList[category] = {
                ...filterCountList[category],
                ...categoryInfo,
              };

              // count와 카테고리만 제외한 나머지 필터 키값만 가져오기
              // 현재 선택되어 있는 필터 정보 가져오기
              const { list } = info.filter;

              if (category === "question" && list["question-complete"]) {
                // 카테고리가 문의이면서 완료된 항목만 검색할 경우
                filterCountList[category].count =
                  categoryInfo["question-complete"];
              } else if (category === "review" || category === "bug") {
                // 카테고리가 리뷰 또는 버그일 경우

                if (category === "bug" && list["bug-complete"]) {
                  // 카테고리가 버그이면서 완료된 항목 검색시
                  filterCountList[category].count =
                    categoryInfo["bug-complete"];
                }

                // 점수별로 필터가 있는지 검증
                const isFilter = Array.from(
                  new Array(5),
                  (_, idx) => 1 + idx
                ).some((num) => list[`${category}-${num}`]);

                if (isFilter) {
                  // 필터 검증을 위해 전체 개수 초기화
                  filterCountList[category].count = 0;

                  // 필터가 하나라도 있는 경우
                  Array.from(new Array(5), (_, idx) => 1 + idx).forEach(
                    (num) => {
                      if (info.filter.list[`${category}-${num}`]) {
                        filterCountList[category].count +=
                          categoryInfo[`${category}-${num}`];
                      }
                    }
                  );
                }
              }

              // 삭제된 댓글 포함하기
              if (list.deleted) {
                filterCountList[category].count +=
                  filterCountList[category].deleted;
              }
            });
            // 전체 개수 구하기
            filterCountList.all.count = 0;
            for (const category in filterCountList) {
              filterCountList.all.count += filterCountList[category].count;
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      return filterCountList as CountFilterTypes;
    },
  };
};

export default countApis;

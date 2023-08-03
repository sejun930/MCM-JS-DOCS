import {
  CollectionReferenceDocumentData,
  QueryDocumentData,
  getDoc,
} from "src/commons/libraries/firebase";
import { deepCopy } from "src/main/commonsComponents/functional";
import {
  CommentsAllInfoTypes,
  CountFilterTypes,
  initCommentsInfo,
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
      const num = input[target]; // 해당 이슈 레벨 및 평점

      if (category === "question") {
        // 카테고리가 문의일 경우
        if (input.answer && input.answerCreatedAt) {
          // 답장이 등록되어 있는 경우, "답장 완료(question-complete)" 1개 제거
          _countList["question-complete"]--;
          // 삭제된 답장 완료 1개 추가
          _countList["question-complete-deleted"]++;
        }
      } else {
        // 카테고리가 버그 또는 리뷰일 경우
        // 해당 점수(버그 레벨 및 평점) 1개 삭제
        _countList[`${category}-${num}`]--;
        // 삭제된 평점 개수 1개 추가
        _countList[`${category}-${num}-deleted`]++;

        if (category === "bug") {
          // 카테고리가 이슈일 때
          if (input.bugStatus === 2) {
            // "해결 완료(bug-complete)" 필터 1개 제거
            _countList["bug-complete"]--;
            // "해결 완료(bug-complete)" 삭제 필터 1개 추가
            _countList["bug-complete-deleted"]++;

            // 해당 레벨의 해결 완료 1개 제거
            _countList[`bug-${num}-complete`]--;
            // 해당 레벨의 해결 완료 삭제 1개 증가
            _countList[`bug-${num}-complete-deleted`]++;
          }
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
            // 해당 이슈 레벨의 완료 개수 1개 증가
            _countList[`bug-${originInput.bugLevel}-complete`]++;
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
              const { deleted } = list;

              // 삭제된 댓글도 포함하기
              if (deleted) {
                filterCountList[category].count +=
                  filterCountList[category].deleted;
              }

              if (category === "question") {
                // 카테고리가 문의일 경우
                if (list["question-complete"]) {
                  // 완료된 댓글만 볼 경우
                  filterCountList[category].count =
                    categoryInfo["question-complete"];

                  if (deleted)
                    // 삭제된 댓글도 포함이라면 삭제된 완료된 댓글도 포함하기
                    filterCountList[category].count +=
                      categoryInfo["question-complete-deleted"];
                }
              } else if (category === "review" || category === "bug") {
                // 카테고리가 리뷰 또는 버그일 경우

                // 이슈 및 리뷰는 모든 필터 리스트로 개수 종합
                let allCount = categoryInfo.count;
                //  삭제 보기일 땐 삭제된 개수도 포함하기
                if (deleted) allCount += categoryInfo.deleted;

                if (category === "bug" && list["bug-complete"]) {
                  // 완료된 이슈만 보기 개수 가져오기
                  allCount = categoryInfo["bug-complete"];
                  // 삭제된 완료된 이슈 더하기
                  if (deleted) allCount += categoryInfo["bug-complete-deleted"];
                }

                // 필터 (과거순, 삭제 포함)을 제외한 필터가 하나라도 있는 경우 체크
                const hasFilter = Object.entries(list).some((el) => {
                  const [name, bool] = el;
                  const [target, num] = name.split("-");

                  return (
                    target === category && !Number.isNaN(Number(num)) && bool
                  );
                });

                if (hasFilter) {
                  // 필터가 있다면 0으로 초기화
                  allCount = 0;

                  Array.from(new Array(5), (_, idx) => 1 + idx).forEach(
                    (num) => {
                      if (list[`${category}-${num}`]) {
                        if (category === "bug" && list["bug-complete"]) {
                          // 카테고리가 버그이고, "해결 완료만 보기" 필터가 적용되어 있을 경우
                          // 해결 완료된 해당 점수의 개수만 더한다.
                          allCount += categoryInfo[`bug-${num}-complete`];

                          if (deleted)
                            // 만약 삭제까지 포함된다면, 해결 완료된 댓글 중 삭제된 개수까지 더한다.
                            allCount +=
                              categoryInfo[`bug-${num}-complete-deleted`];
                        } else {
                          // 선택한 필터의 개수만큼 전체 개수에 더하기
                          allCount += categoryInfo[`${category}-${num}`];

                          if (deleted)
                            allCount +=
                              categoryInfo[`${category}-${num}-deleted`];
                        }
                      }
                    }
                  );
                }
                filterCountList[category].count = allCount;
              }
            });
            // 전체 개수, 삭제된 개수 구하기
            filterCountList.all = deepCopy(
              initCommentsInfo.countFilterList.all
            );

            for (const category in filterCountList) {
              filterCountList.all.count += filterCountList[category].count;
              filterCountList.all.deleted += filterCountList[category].deleted;
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

import {
  BlockInfoType,
  FilterType,
} from "src/main/mainComponents/admin/modules/block/block.types";
import {
  CollectionReferenceDocumentData,
  QueryDocumentData,
  getDoc,
  getServerTime,
} from "../../firebase";

import { AddBlockInputType, BlockInputTypes } from "./block.types";
import { BlockInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { getUuid } from "src/main/commonsComponents/functional";

// 차단 관련 apis
const blockApis = () => {
  let blockDocs: QueryDocumentData = getDoc("block", "user", "ip");

  return {
    // 유저 조회
    get: async (filter?: FilterType) => {
      const result: { success: boolean; size: number; list: BlockInfoType[] } =
        {
          success: false,
          size: 0,
          list: [],
        };
      let page = filter?.page || 1;
      let limit = filter?.limit || 10;
      let past = filter?.past || false;

      // 최신순 & 과거순으로 조회
      blockDocs = blockDocs.orderBy("createdAt", past ? "asc" : "desc");

      // 차단된 유저만 보기
      if (filter?.showOnlyBlock) {
        blockDocs = blockDocs.where("canceledAt", "==", null);
      }

      // 전체 데이터 수 가져오기
      try {
        const allDataList = await blockDocs.get();
        result.size = allDataList.size;

        if (allDataList.size) {
          // 데이터 조회 시작 시점
          blockDocs = blockDocs.startAt(allDataList.docs[(page - 1) * limit]);

          try {
            const resultData = await blockDocs
              .limit(limit) // 페이지별 데이터 개수 지정 (기본 : 10개)
              .get();
            result.success = true; // 조회 성공

            const dataList: Array<BlockInfoType> = [];
            resultData.forEach((info) => {
              const _info = info.data() as BlockInfoType;

              const inputId = getUuid();
              _info.id = info.id;
              // checkbox의 inputId 값 추가
              _info.inputId = inputId;
              // 체크 여부 검증
              _info.checked = false;

              dataList.push(_info);
            });
            result.list = dataList;
          } catch (err) {
            console.log(err);
            alert("유저 조회 실패 : " + err);

            return result;
          }
        }
      } catch (err) {
        console.log("전체 데이터 조회에 실패했습니다. : " + err);
        alert("전체 데이터 조회에 실패했습니다. : " + err);

        return result;
      }

      return result;
    },

    // 유저 차단
    block: async (input: BlockInputTypes): Promise<boolean> => {
      const _input: BlockInputTypes & AddBlockInputType = { ...input };

      _input.createdAt = getServerTime(); // 차단된 날짜
      _input.canceledAt = null; // 차단 취소일

      try {
        await (blockDocs as CollectionReferenceDocumentData).add(_input);
        return true;
      } catch (err) {
        alert("유저 차단에 실패했습니다.");
        console.log(err);

        return false;
      }
    },
    // 차단 해제
    unblock: async (docId: string): Promise<boolean> => {
      try {
        await (blockDocs as CollectionReferenceDocumentData).doc(docId).update({
          canceledAt: getServerTime(), // 차단해제 시간 입력 (= 차단 해제)
        });
        return true;
      } catch (err) {
        alert("차단 해제에 실패했습니다.");
        console.log(err);

        return false;
      }
    },
    // 차단된 유저인지 검증
    checkBlock: async (userIp: string): Promise<BlockInfoTypes> => {
      let result = { isBlock: false };
      const isBlock = await blockDocs
        .where("ip", "==", userIp) // 해당 유저의 아이피가 차단된 내역이 있는지 검증
        .where("canceledAt", "==", null) // 차단이 해제되지 않은 유저인지 검증
        .limit(1)
        .get();

      if (!isBlock.empty) {
        // 차단된 유저라면
        result = { ...isBlock.docs[0].data(), ["isBlock"]: true };
      }

      return result; // 비어있다면 차단되지 않은 유저
    },
  };
};

export default blockApis;

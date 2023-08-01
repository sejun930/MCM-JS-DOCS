import { getDoc } from "../../firebase";
import { AddBlockInputType, BlockInputTypes } from "./block.types";
import { BlockInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";

import { getServerTime } from "../../firebase";

// 차단 관련 apis
const blockApis = () => {
  const blockDocs = getDoc("block", "user", "ip");

  return {
    // 유저 차단
    block: async (input: BlockInputTypes): Promise<boolean> => {
      const _input: BlockInputTypes & AddBlockInputType = { ...input };

      _input.createdAt = getServerTime(); // 차단된 날짜
      _input.canceledAt = null; // 차단 취소일

      try {
        await blockDocs.add(_input);
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
        await blockDocs.doc(docId).update({
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

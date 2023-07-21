import { QueryDocumentData, getDoc, getServerTime } from "../firebase";
import { BlockInputTypes, AddBlockInputType } from "./commons.types";

const apis = () => {
  return {
    // 데이터 조회, options를 통해 where, orderby 등 설정 가능
    read: async (doc: QueryDocumentData) => {
      return await doc.get();
    },
    // 유저 차단
    block: async (input: BlockInputTypes) => {
      const doc = getDoc("block", "user", "ip");
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
        await getDoc("block", "user", "ip").doc(docId).update({
          canceledAt: getServerTime(), // 차단해제 시간 입력 (= 차단 해제)
        });
        return true;
      } catch (err) {
        alert("차단 해제에 실패했습니다.");
        console.log(err);

        return false;
      }
    },
  };
};

export default apis;

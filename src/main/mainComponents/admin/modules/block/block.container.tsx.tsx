import { useEffect, useState } from "react";
import { db, getServerTime } from "src/commons/libraries/firebase";

import {
  _PText,
  _Title,
  _Checkbox,
  _PTextWithHtml,
  _Button,
  _Image,
} from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";
import { BlockInfoType, FilterType, filterInit } from "./block.types";

import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import _SelectForm from "src/main/commonsComponents/units/template/form/select/select.container";
import AdminBlockUIPage from "./block.presenter";

let waiting = false;
// 필터 리스트
let filter: FilterType = { ...filterInit };

export default function AdminBlockPage() {
  // 차단된 유저 리스트
  const [blockList, setBlockList] = useState<Array<BlockInfoType>>([]);
  // 필터 on/off
  const [showFilter, setShowFilter] = useState(false);

  // 차단 리스트 가져오기
  const getBlockList = async () => {
    if (!checkAccessToken(true)) {
      alert("인증이 만료되었습니다. 재로그인 해주세요.");
      return false;
    }

    // 과거순 & 최신순 정렬
    const createdAt = filter.past ? "asc" : "desc";
    let _db = db.collection("block").orderBy("createdAt", createdAt);

    // 차단된 유저(차단이 해제되지 않는 유저)만 조회할 경우
    if (filter.showOnlyBlock) {
      _db = _db.where("canceledAt", "==", null);
    }

    // 조회 시작될 데이터 시점
    let startAt = null;
    // 전체 데이터 수 가져오기
    try {
      const allDataList = await _db.get();
      if (allDataList.size) {
        filter.allData = allDataList.size;
        // 데이터 조회 시작 시점
        startAt = allDataList.docs[(filter.page - 1) * filter.limit];
      }
    } catch (err) {
      console.log("전체 데이터 조회에 실패했습니다. : " + err);
      alert("전체 데이터 조회에 실패했습니다. : " + err);
    }
    _db = _db.startAt(startAt);

    _db
      .limit(filter.limit) // 페이지별 데이터 개수 지정 (기본 : 10개)
      .get()
      .then((result) => {
        if (!result.empty) {
          const dataList: Array<BlockInfoType> = [];

          result.forEach((info) => {
            const _info = info.data() as BlockInfoType;

            const inputId = getUuid();
            _info.id = info.id;
            // checkbox의 inputId 값 추가
            _info.inputId = inputId;
            // 체크 여부 검증
            _info.checked = false;

            dataList.push(_info);
          });

          if (dataList && dataList.length) {
            setBlockList(dataList);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert("유저 조회 실패 : " + err);
      });
  };

  useEffect(() => {
    getBlockList();
  }, []);

  // checkbox 선택하기
  const checkBlockInfo = (idx: number) => {
    const _blockList = [...blockList];
    if (_blockList[idx].canceledAt) return;

    if (!_blockList[idx].canceledAt)
      _blockList[idx].checked = !_blockList[idx].checked;

    setBlockList(_blockList);
  };

  // 차단 해제하기
  const cancelBlock = async () => {
    if (waiting) return alert("이벤트가 작동중입니다. 잠시만 기다려주세요.");
    if (!checkAccessToken(true)) {
      alert("인증이 만료되었습니다. 재로그인 해주세요.");
      return false;
    }

    // 선택된 항목 가져오기
    const checkList = blockList.filter((el: BlockInfoType) => el.checked);

    if (!checkList.length) {
      // 선택된 항목이 하나도 없는 경우
      alert("선택된 항목이 없습니다.");
    } else {
      const _db = db.collection("block");

      // 선택된 유저 차단 해제하기
      await Promise.all(
        checkList.map((el) =>
          // 최종 데이터 저장
          _db.doc(el.id).update({
            ...el,
            ["canceledAt"]: getServerTime(), // 차단해제 시간 입력 (= 차단 해제)
          })
        )
      ).then(() => {
        alert("차단 해제가 완료되었습니다.");

        // 새 데이터로 렌더하기
        getBlockList();
      });
    }
  };

  // 필터 on / off
  const toggleShowFilter = (bool?: boolean) => {
    setShowFilter(bool ? bool : (prev) => !prev);
  };

  // 필터가 현재 적용되어 있는지 체크
  const getFilterOn = () => {
    if (filter.showOnlyBlock || filter.past) return true;
    return false;
  };

  // 차단된 유저 & 전체 유저 보기
  const fetchFilter = (category: string) => {
    filter.page = 1;
    filter[category] = !filter[category];

    getBlockList();
  };

  return (
    <AdminBlockUIPage
      filter={filter}
      blockList={blockList}
      showFilter={showFilter}
      toggleShowFilter={toggleShowFilter}
      getFilterOn={getFilterOn}
      fetchFilter={fetchFilter}
      checkBlockInfo={checkBlockInfo}
      cancelBlock={cancelBlock}
    />
  );
}

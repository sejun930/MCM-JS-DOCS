import _ExampleUIPage from "./template.example.presenter";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { versState } from "src/commons/store";

// import { versState } from "src/commons/store";
import { IProps, UIProps } from "./template.example.types";

let isAllOpen = false;
export default function _ExampleForm(props: IProps) {
  const [vers] = useRecoilState(versState);
  // 전체 예시용 코드의 개수
  const [allLen, setAllLen] = useState<number>(0);
  // 코스 on/off 정보
  const [openList, setOpenList] = useState<boolean[]>([]);

  useEffect(() => {
    const _allLen = props.exampleList
      .filter((el) => !el.isError && !el.isHide)
      .reduce((acc, cur) => acc + cur.contents.length, 0);
    setAllLen(_allLen);

    // 모두 열기 상태에서 전환시에 새로운 내용까지 연 상태로 만들기
    let _openList = Array.from(new Array(_allLen), () => false);
    _openList = _openList.map((_, i) =>
      openList[i] === undefined ? isAllOpen : openList[i]
    );

    setOpenList(_openList);
  }, [vers]);

  const changeOpenList = (
    idx: number,
    list?: Array<boolean>,
    all?: boolean
  ) => {
    if (list?.every((el) => el) && all) isAllOpen = true;
    else isAllOpen = false;

    const _list = [...openList];
    if (idx !== -1) _list[idx] = !_list[idx];

    setOpenList(list || _list);
  };

  // 코드가 하나라도 오픈되어 있는지 체크
  const isOneOpen = openList.some((el) => el);

  const _props: IProps & UIProps = {
    ...props,
    openList,
    changeOpenList,
    isOneOpen,
    allLen,
  };

  return <_ExampleUIPage props={{ ..._props }} />;
}

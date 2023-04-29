import _ExampleUIPage from "./template.example.presenter";

import { useState } from "react";

// import { versState } from "src/commons/store";
import { IProps, UIProps } from "./template.example.types";

export default function _ExampleForm(props: IProps) {
  // 전체 예시용 코드의 개수
  const allLen = props.exampleList
    .filter((el) => !el.isError && !el.isHide)
    .reduce((acc, cur) => acc + cur.contents.length, 0);

  // 코스 on/off 정보
  const [openList, setOpenList] = useState(
    Array.from(new Array(allLen), () => false)
  );

  const changeOpenList = (idx: number, list?: Array<boolean>) => {
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

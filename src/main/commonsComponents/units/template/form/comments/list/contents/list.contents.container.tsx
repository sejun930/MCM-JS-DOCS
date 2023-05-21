import ListContentsInfoUIPage from "./list.contents.presenter";

import { InfoTypes } from "../../write/comments.write.types";
import { MutableRefObject, useEffect, useRef, useState } from "react";

export interface ListContentsIProps {
  info: InfoTypes;
  date: string;
  getLabel: (info: InfoTypes) => Array<JSX.Element>;
}

const MAX_LINE = 200; // 더 보기가 실행 될 최소 글자수
export default function ListContentsInfoPage(props: ListContentsIProps) {
  const { contents } = props.info;
  // 더 보기 기능 (8줄 이상 넘어갈 경우에만 적용)
  const [subContents, setSubContents] = useState("");
  const [isMore, setIsMore] = useState(false);
  // 더 보기 실행
  const [moreShow, setMoreShow] = useState(false);

  useEffect(() => {
    let allLen = 0;
    let str = "";

    contents.split("<br />").forEach((el, idx) => {
      if (idx && allLen < MAX_LINE) {
        str += "<br />";
        allLen += 20;
      }

      if (allLen < MAX_LINE) {
        str += el;
        allLen += el.length;
      }
    });

    setSubContents(str.substring(0, MAX_LINE));
    setIsMore(allLen > MAX_LINE);
  }, []);

  const toggleMoreShow = () => {
    setMoreShow((prev) => !prev);
  };

  return (
    <ListContentsInfoUIPage
      {...props}
      subContents={subContents}
      isMore={isMore}
      toggleMoreShow={toggleMoreShow}
      moreShow={moreShow}
      contents={contents}
    />
  );
}

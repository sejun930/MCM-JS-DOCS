import { useState, useEffect } from "react";

import { _CloseButton, _Button } from "mcm-js-commons";
import { IndexIPropsTypes, IndexPagePropsTypes } from "./index.type";

import _IndexUIForm from "./index.presenter";

// 목차 렌더 페이지
let deboucing: ReturnType<typeof setTimeout> | number;
export default function _IndexForm(
  props: IndexIPropsTypes & IndexPagePropsTypes
) {
  const { indexList } = props;

  // 현재 선택되어 있는 목차
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    checkScroll();
  }, [indexList]);

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  });

  // 스크롤 실시간 체크하기
  const checkScroll = () => {
    clearTimeout(deboucing);

    deboucing = window.setTimeout(() => {
      if (indexList.length) {
        indexList.some((info, idx) => {
          const documents = document.getElementById(info.id);

          if (documents) {
            const { top, height } = documents.getBoundingClientRect();
            // 목차의 마지막 위치값 구하기
            const endOffset = top + height;

            if (endOffset > 0) {
              // 현재 목차의 위치 구하기
              if (current !== idx) setCurrent(idx);
              return true;
            }
          }
        });
      }
    }, 15);
  };

  // 해당 목차로 이동하기
  const moveIndex = (id: string) => {
    const documents = document.getElementById(id);

    if (documents) {
      const { top } = documents.getBoundingClientRect();

      // 해당 목차의 시작 위치 구하기
      const destination =
        top + (window.pageYOffset || document.documentElement.scrollTop) - 50;

      window.scrollTo({
        top: destination,
        // behavior: "smooth",
      });
    }
  };

  return <_IndexUIForm {...props} current={current} moveIndex={moveIndex} />;
}

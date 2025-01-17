import { useState, useEffect } from "react";

import { IndexIPropsTypes, IndexPagePropsTypes } from "./index.type";
import { moveDocument } from "../../functional";

import _IndexUIForm from "./index.presenter";

// 목차 렌더 페이지
let deboucing: ReturnType<typeof setTimeout> | number;
// 해당 목차가 아직 렌더되지 않았을 경우 해당 목차가 렌더될 때까지 재요청하는 변수
let infiniteRequestDocument: number | ReturnType<typeof setInterval>;
export default function _IndexForm(
  props: IndexIPropsTypes & IndexPagePropsTypes
) {
  const { indexList, changeLoading, isLoading } = props;
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

  // 버전이 변경될 경우
  // useEffect(() => {
  //   if (indexList[current] && indexList[current].id) {
  //     document.body.classList.add("hide");
  //     console.log(current, indexList[current]);

  //     window.setTimeout(() => {
  //       moveIndex(indexList[current].id);
  //       document.body.classList.remove("hide");
  //     }, 200);
  //   }
  // }, [vers]);

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
    if (isLoading) return;
    // 해당 목차 위치로 스크롤 이동
    moveDocument({ id, bonus: -50 });
    clearInterval(infiniteRequestDocument);

    // 댓글 목차를 선택했을 경우
    if (id === "comments-form") {
      const checkDoc = document.getElementsByClassName("comments-list-render");
      if (!checkDoc.length) {
        changeLoading(true);

        // 댓글 목차가 렌더 될때까지 무한하게 스크롤 이동
        infiniteRequestDocument = setInterval(() => {
          const doc = document.getElementsByClassName("comments-list-render");
          if (doc.length) {
            moveDocument({ id, bonus: -50 });
            clearInterval(infiniteRequestDocument);
            changeLoading(false);
          }
        }, 1000);
      }
    }
  };

  return (
    <_IndexUIForm
      {...props}
      current={current}
      moveIndex={moveIndex}
      isLoading={isLoading}
    />
  );
}

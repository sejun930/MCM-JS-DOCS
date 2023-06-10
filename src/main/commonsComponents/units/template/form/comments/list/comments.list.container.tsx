import { InfoTypes } from "../comments.types";
import CommentsListUIPage from "./comments.list.presenter";

import { categoryInitList } from "../write/comments.write.types";
import CommentsLabel from "./label";
import StarsForm from "../write/stars";

import { CommentsAllInfoTypes } from "../comments.types";
import { _Button, _SpanText } from "mcm-js-commons";
import { MouseEvent, MutableRefObject, useEffect, useRef } from "react";

let search = "";
export default function CommentsListPage({
  commentsInfo,
  modifyComments,
  changeInfo,
}: {
  commentsInfo: CommentsAllInfoTypes;
  modifyComments: (comment: InfoTypes, isDelete?: boolean) => Promise<boolean>;
  changeInfo: (info: CommentsAllInfoTypes) => void;
}) {
  const listRef = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.minHeight = "0px";

      window.setTimeout(() => {
        listRef.current.style.minHeight = listRef.current.scrollHeight + "px";
      }, 0);
    }
  }, [commentsInfo]);

  // 카테고리 변경하기
  const changeCategory =
    (info: CommentsAllInfoTypes) => (e?: MouseEvent<HTMLButtonElement>) => {
      if (e) e.stopPropagation();

      changeInfo(info);
    };

  // 각각의 카테고리에 맞는 라벨 및 평점 출력
  const getLabel = (info: InfoTypes): Array<JSX.Element> => {
    let result = [];

    // 전체 카테고리일 경우, 각각의 카테고리 명 출력
    if (commentsInfo.selectCategory === "all") {
      const _info = { ...commentsInfo, ["selectCategory"]: info.category };

      result.push(
        <_Button onClickEvent={changeCategory(_info)} buttonType="button">
          <CommentsLabel
            children={<_SpanText>{categoryInitList[info.category]}</_SpanText>}
          />
        </_Button>
      );
    }

    if (info.category === "review") {
      // 리뷰일 경우 평점 추가
      result.push(<StarsForm isView category="review" rating={info.rating} />);
    } else if (info.category === "bug") {
      // 버그일 경우 처리 결과
      const bugStatus: { [key: number]: string } = {
        0: "확인 대기 중",
        1: "버그 수리 중",
        2: "해결 완료",
      };
      result.push(
        <CommentsLabel
          children={<_SpanText>{bugStatus[info.bugStatus || 0]}</_SpanText>}
          className={`bug-label-${info.bugStatus || 0}`}
        />
      );
    } else if (info.category === "question") {
      // 문의일 경우
      result.push(
        <CommentsLabel
          children={
            <_SpanText>
              {info.completeAnswer ? "답변 완료" : "답변 대기 중"}
            </_SpanText>
          }
          className={`question-label-${info.completeAnswer ? 1 : 0}`}
        />
      );
    }

    return result;
  };

  return (
    <CommentsListUIPage
      commentsInfo={commentsInfo}
      getLabel={getLabel}
      modifyComments={modifyComments}
      changeInfo={changeInfo}
      listRef={listRef}
    />
  );
}

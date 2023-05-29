import { InfoTypes } from "../comments.types";
import CommentsListUIPage from "./comments.list.presenter";

import { FetchCommentsListTypes } from "src/commons/store/comments";

import { categoryInitList } from "../write/comments.write.types";
import CommentsLabel from "./label";
import StarsForm from "../write/stars";

import { _Button, _SpanText } from "mcm-js-commons";

let search = "";
export default function CommentsListPage({
  category,
  changeCategory,
  countList,
  commentsList,
  filterCommentsList,
  modifyComments,
}: {
  category: string;
  changeCategory: (category: string) => void;
  countList: { [key: string]: number };
  commentsList: Array<InfoTypes>;
  filterCommentsList: (props: FetchCommentsListTypes) => void;
  modifyComments: (comment: InfoTypes) => void;
}) {
  const categoryName: { [key: string]: string } = categoryInitList
    .filter((el) => el.value)
    .reduce((acc: { [key: string]: string }, cur) => {
      acc[cur.value] = cur.name;
      return acc;
    }, {});

  // 각각의 카테고리에 맞는 라벨 및 평점 출력
  const getLabel = (info: InfoTypes): Array<JSX.Element> => {
    let result = [];

    // console.log(category, info.category);
    // 전체 카테고리일 경우, 각각의 카테고리 명 출력
    if (!category) {
      result.push(
        <_Button
          onClickEvent={() => filterCommentsList({ category: info.category })}
          buttonType="button"
        >
          <CommentsLabel
            children={<_SpanText>{categoryName[info.category]}</_SpanText>}
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
              {info.complateAnswer ? "답변 완료" : "답변 대기 중"}
            </_SpanText>
          }
          className={`question-label-${Number(info.complateAnswer || false)}`}
        />
      );
    }

    return result;
  };

  return (
    <CommentsListUIPage
      commentsList={commentsList}
      category={category}
      changeCategory={changeCategory}
      countList={countList}
      getLabel={getLabel}
      filterCommentsList={filterCommentsList}
      modifyComments={modifyComments}
    />
  );
}

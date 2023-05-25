import { InfoTypes } from "../write/comments.write.types";
import CommentsListUIPage from "./comments.list.presenter";

import { useRecoilState } from "recoil";
import {
  commentsListState,
  countListState,
  fetchCommentsListState,
} from "src/commons/store/comments";

import { categoryInitList } from "../write/comments.write.types";
import CommentsLabel from "./label";
import StarsForm from "../write/stars";

import { _Button, _SpanText } from "mcm-js-commons";

export default function CommentsListPage({
  category,
  render,
}: {
  category: string;
  render: boolean;
}) {
  const [commentsList] = useRecoilState(commentsListState);
  const [countList] = useRecoilState(countListState);
  const [fetchCommentsList] = useRecoilState(fetchCommentsListState);

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
          onClickEvent={() => fetchCommentsList(info.category)}
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
      changeCategory={fetchCommentsList}
      countList={countList}
      getLabel={getLabel}
      render={render}
    />
  );
}

import _SubTitleTemplate from "../../title/subTitle";
import { Wrapper } from "../form.commons.styles";

import CommentsListPage from "./list/comments.list.container";
import CommentsWritePage from "./write/comments.write.container";

import { InfoTypes } from "./comments.types";
import { FetchCommentsListTypes } from "src/commons/store/comments";
export default function CommentsUIPage({
  module,
  category,
  changeCategory,
  countList,
  commentsList,
  filterCommentsList,
  addComments,
  modifyComments,
}: {
  module: string;
  category: string;
  changeCategory: (category: string) => void;
  countList: { [key: string]: number };
  commentsList: Array<InfoTypes>;
  filterCommentsList: (props: FetchCommentsListTypes) => void;
  addComments: (data: InfoTypes) => Promise<boolean>;
  modifyComments: (comment: InfoTypes) => void;
}) {
  return (
    <Wrapper>
      <_SubTitleTemplate
        title="Comments"
        className="comments-subTitle"
        remakrs="해당 모듈에 대한 사용후기 및 개선점 등을 남겨주세요!"
      />
      <CommentsWritePage module={module} addComments={addComments} />
      <CommentsListPage
        category={category}
        changeCategory={changeCategory}
        countList={countList}
        commentsList={commentsList}
        filterCommentsList={filterCommentsList}
        modifyComments={modifyComments}
      />
    </Wrapper>
  );
}

import _SubTitleTemplate from "../../title/subTitle";
import { Wrapper } from "../form.commons.styles";

import CommentsListPage from "./list/comments.list.container";
import CommentsWritePage from "./write/comments.write.container";

export default function CommentsUIPage({
  module,
  selectCategory,
  render,
}: {
  module: string;
  selectCategory: string;
  render: boolean;
}) {
  return (
    <Wrapper>
      <_SubTitleTemplate
        title="Comments"
        className="comments-subTitle"
        remakrs="해당 모듈에 대한 사용후기 및 개선점 등을 남겨주세요!"
      />
      <CommentsWritePage module={module} />
      <CommentsListPage category={selectCategory} render={true} />
    </Wrapper>
  );
}

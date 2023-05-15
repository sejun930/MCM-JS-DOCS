import { Wrapper } from "../form.commons.styles";
import _SubTitleTemplate from "../../title/subTitle";

import CommentsWritePage from "./write/comments.write.container";

export default function _CommentsUIForm({ module }: { module: string }) {
  return (
    <Wrapper>
      <_SubTitleTemplate
        title="Comments"
        className="comments-subTitle"
        remakrs="해당 모듈에 대한 사용후기 및 개선점 등을 남겨주세요!"
      />
      <CommentsWritePage module={module} />
    </Wrapper>
  );
}

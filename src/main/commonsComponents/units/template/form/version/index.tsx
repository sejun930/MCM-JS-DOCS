import { Wrapper } from "../form.commons.styles";

import _SubTitleTemplate from "../../title/subTitle";

// 모듈들의 버전을 확인하는 폼 페이지
export default function _VersionForm() {
  return (
    <Wrapper>
      <_SubTitleTemplate
        title="Version"
        className="version-subTitle"
        remakrs="모듈의 최신 업데이트 내역들을 읽어보세요."
      />
    </Wrapper>
  );
}

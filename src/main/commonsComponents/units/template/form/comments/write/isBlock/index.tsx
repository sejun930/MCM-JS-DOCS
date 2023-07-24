import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";
import { BlockInfoTypes } from "../../comments.types";

import { _PText, _SpanText, _PTextWithHtml } from "mcm-js-commons";
import { getDateForm } from "src/main/commonsComponents/functional";
import { categoryInitList } from "../comments.write.types";

// 차단된 유저에게만 렌더되는 페이지
export default function IsBlockPage({
  blockInfo,
}: {
  blockInfo: BlockInfoTypes;
}) {
  const { ip, module, category, createdAt, contents } = blockInfo;

  return (
    <BlockNoticeWrapper>
      <_PText>
        현재 접속된 아이피 <b>({ip})</b>는 아래와 같은 사유로 차단되어 댓글
        등록이 불가능합니다.
      </_PText>

      <BlockExampleWrapper>
        <BlockOptionalWrapper>
          <_SpanText>
            {module} ({categoryInitList[category || "all"]})
          </_SpanText>

          {createdAt && (
            <_SpanText>
              차단일자 |{" "}
              {getDateForm({
                firebaseTimer: createdAt,
                getDate: true,
              })}
            </_SpanText>
          )}
        </BlockOptionalWrapper>
        <_PTextWithHtml
          dangerouslySetInnerHTML={contents || ""}
          className="block-example-contents"
        />
      </BlockExampleWrapper>
    </BlockNoticeWrapper>
  );
}

export const BlockNoticeWrapper = styled.div`
  min-height: 100px;
  background-color: #dddddd;
  border-radius: 10px;
  padding: 16px;

  p {
    font-size: 14px;
    letter-spacing: -0.02rem;
    color: gray;
  }
`;

export const BlockExampleWrapper = styled.div`
  margin-top: 20px;

  .block-example-contents {
    background-color: white;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    max-height: 160px;
    overflow: auto;
  }
`;

export const BlockOptionalWrapper = styled.div`
  display: flex;
  gap: 0px 20px;

  span {
    font-size: 12px;
  }

  @media ${breakPoints.mobileSmall} {
    flex-direction: column;
    gap: 6px 0px;
  }
`;

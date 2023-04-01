import {
  DetailInfoWrapper,
  DetailTitle,
  DetailTitleInfo,
  DetailWrapper,
  EmptySelect,
  Wrapper,
} from "./tree.datail.styles";
import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";

import { _PText, _SpanText, _PTextWithHtml, _Button } from "mcm-js-commons";
import { TreeIProps } from "..";

export default function ModuleTreeDetailPage({
  treeList,
  select,
  selectTree,
}: TreeIProps) {
  // 현재 선택된 정보 가져오기
  const detailInfo = treeList[select];

  let parentsInfo: Partial<TreeModuleListTypes> = {};
  let parentIdx = -1;

  if (treeList.length && detailInfo?.depth) {
    const filterArr = treeList.slice(0, select + 1).filter((el, i) => {
      if (detailInfo?.depth - 1 === el.depth) {
        parentIdx = i;
        return true;
      }
      return false;
    });

    if (filterArr.at(-1)?.class) {
      parentsInfo = filterArr?.at(-1) || {};
    }
  }

  return (
    <Wrapper>
      {!detailInfo ? (
        <EmptySelect>
          <_PText>태그에 마우스를 올려보세요.</_PText>
        </EmptySelect>
      ) : (
        <DetailWrapper>
          <DetailInfoWrapper>
            <DetailTitleInfo>
              <DetailTitle>
                <_SpanText>Tag Type</_SpanText>
                <code
                  dangerouslySetInnerHTML={{
                    __html: `<<b class='darkBlue'>${detailInfo.tag}</b>>`,
                  }}
                />
              </DetailTitle>
              <DetailTitle>
                <_SpanText>ClassName</_SpanText>
                <code
                  dangerouslySetInnerHTML={{
                    __html: `<b class='lightOrange'>${detailInfo.class}</b>`,
                  }}
                />
              </DetailTitle>
            </DetailTitleInfo>
            <_PTextWithHtml
              className="detail-info-role"
              dangerouslySetInnerHTML={detailInfo?.role || "-"}
            />
          </DetailInfoWrapper>
          <_PText className="my-parents">
            상위 태그 :
            {(parentsInfo.class && (
              <_Button onClickEvent={() => selectTree(parentIdx)}>
                <code
                  dangerouslySetInnerHTML={{
                    __html: `<<b class="darkBlue">${parentsInfo.tag}</b> <span class='skyblue'>class=</span><span class='lightOrange' style="font-weight : 700">"${parentsInfo.class}"</span> />`,
                  }}
                />
              </_Button>
            )) ||
              " - "}
          </_PText>
        </DetailWrapper>
      )}
    </Wrapper>
  );
}

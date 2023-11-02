import {
  Wrapper,
  DetailInfoWrapper,
  DetailTitle,
  DetailTitleInfo,
  DetailRole,
  DetailWrapper,
  ParentsWrapper,
  EmptySelect,
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
  let parentIdx = 0;

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
    <Wrapper className="tree-detail-wrapper">
      {!detailInfo ? (
        <EmptySelect className="tree-detail-empty-select">
          <_PText>태그를 클릭해보세요.</_PText>
        </EmptySelect>
      ) : (
        <DetailWrapper className="tree-detail-contents-wrapper">
          <DetailInfoWrapper className="tree-detail-contents-info-wrapper">
            <DetailTitleInfo className="tree-detail-title-wrapper">
              <DetailTitle className="tree-detail-tag-type">
                <_SpanText>Tag Type</_SpanText>
                <code
                  dangerouslySetInnerHTML={{
                    __html: `<<b class='darkBlue'>${detailInfo.tag}</b>>`,
                  }}
                />
              </DetailTitle>
              <DetailTitle className="tree-detail-tag-className">
                <_SpanText>ClassName</_SpanText>
                <code
                  dangerouslySetInnerHTML={{
                    __html: `<b class='lightOrange'>${detailInfo.class}</b>`,
                  }}
                />
              </DetailTitle>
            </DetailTitleInfo>
            <DetailRole className="tree-detail-role-wrapper">
              <_PTextWithHtml
                className="tree-detail-info-role"
                dangerouslySetInnerHTML={detailInfo?.role || "-"}
              />
            </DetailRole>
          </DetailInfoWrapper>
          <ParentsWrapper>
            <_Button
              onClickEvent={() => selectTree(parentIdx)}
              className="tree-detail-button"
            >
              <_PText className="my-parents">
                상위 태그 :
                {(parentsInfo.class && (
                  <code
                    dangerouslySetInnerHTML={{
                      __html: `<<b class="darkBlue">${parentsInfo.tag}</b> <span class='skyblue'>class=</span><span class='lightOrange' style="font-weight : 700">"${parentsInfo.class}"</span> />`,
                    }}
                  />
                )) ||
                  " - "}
              </_PText>
            </_Button>
          </ParentsWrapper>
        </DetailWrapper>
      )}
    </Wrapper>
  );
}

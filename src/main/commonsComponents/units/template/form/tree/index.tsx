import { Wrapper, TreeWrapper, TreeInfoWrapper } from "./tree.styles";

import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";
import _SubTitleTemplate from "../../title/subTitle";
import ModuleTreeListPage from "./list";
import { useState } from "react";

// 폴더 구조 예시용 폼
export default function _TreeForm({
  treeList,
}: {
  treeList: Array<TreeModuleListTypes>;
}) {
  // 선택한 데이터
  const [select, setSelect] = useState<number>(-1);

  // 마우스 올렸을 경우 해당 데이터 선택하기
  const selectTree = (num: number) => () => {
    console.log(num);
    setSelect(num);
  };

  return (
    <Wrapper>
      <_SubTitleTemplate
        title="모듈 구조"
        className="tree-subTitle"
        remakrs="모듈의 구조 안의 각각의 태그들이 어떤 역할을 하고 있는지 마우스를 올려 확인해보세요."
      />
      <TreeWrapper>
        <ModuleTreeListPage treeList={treeList} selectTree={selectTree} />
        <TreeInfoWrapper> </TreeInfoWrapper>
      </TreeWrapper>
    </Wrapper>
  );
}

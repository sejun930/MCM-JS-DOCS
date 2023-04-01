import { useState } from "react";
import { Wrapper, TreeWrapper } from "./tree.styles";

import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";
import _SubTitleTemplate from "../../title/subTitle";
import ModuleTreeListPage from "./list";
import ModuleTreeDetailPage from "./detail";

// 폴더 구조 예시용 폼
export default function _TreeForm({
  treeList,
}: {
  treeList: Array<TreeModuleListTypes>;
}) {
  // 선택한 데이터
  const [select, setSelect] = useState<number>(0);

  // 마우스 올렸을 경우 해당 데이터 선택하기
  const selectTree = (num: number) => {
    setSelect(num);
  };

  return (
    <Wrapper onMouseLeave={() => selectTree(-1)}>
      <_SubTitleTemplate
        title="모듈 구조"
        className="tree-subTitle"
        remakrs="모듈의 구조 안의 각각의 태그들이 어떤 역할을 하고 있는지 마우스를 올려 확인해보세요."
      />
      <TreeWrapper onMouseLeave={() => selectTree(-1)}>
        <ModuleTreeListPage
          treeList={treeList}
          selectTree={selectTree}
          select={select}
        />
        <ModuleTreeDetailPage
          treeList={treeList}
          selectTree={selectTree}
          select={select}
        />
      </TreeWrapper>
    </Wrapper>
  );
}

export interface TreeIProps {
  treeList: Array<TreeModuleListTypes>;
  selectTree: (num: number) => void;
  select: number;
}

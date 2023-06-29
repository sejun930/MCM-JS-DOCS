import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";

import { Wrapper } from "../form.commons.styles";

import {
  TreeModuleListTypes,
  treeModuleList,
} from "src/commons/data/tree/tree.commons.data";

import _SubTitleTemplate from "../../title/subTitle";
import ModuleTreeListPage from "./list";
import ModuleTreeDetailPage from "./detail";

// 폴더 구조 예시용 폼
export default function _TreeForm() {
  // 선택한 데이터
  const [select, setSelect] = useState<number>(0);
  const [module] = useRecoilState(moduleState);

  const list = treeModuleList[module] || [];

  // 마우스 올렸을 경우 해당 데이터 선택하기
  const selectTree = (num: number) => {
    setSelect(num === select ? -1 : num);
  };

  return (
    <Wrapper id="tree-form">
      <_SubTitleTemplate
        title="Module Tree"
        className="tree-subTitle"
        remakrs="모듈의 구조 안의 각각의 태그들이 어떤 역할을 하고 있는지 태그를 클릭해보세요."
      />
      <TreeWrapper>
        {list && (
          <>
            <ModuleTreeListPage
              treeList={list}
              selectTree={selectTree}
              select={select}
            />
            <ModuleTreeDetailPage
              treeList={list}
              selectTree={selectTree}
              select={select}
            />
          </>
        )}
      </TreeWrapper>
    </Wrapper>
  );
}

export interface TreeIProps {
  treeList: Array<TreeModuleListTypes>;
  selectTree: (num: number) => void;
  select: number;
}

export const TreeWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  border: solid 1px #777777;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  position: relative;

  @media ${breakPoints.mobileLarge} {
    height: auto;
    flex-direction: column;
  }
`;

import styled from "@emotion/styled";

import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";

export default function ModuleTreeListPage({
  treeList,
}: {
  treeList: Array<TreeModuleListTypes>;
}) {
  const getList = () => {
    return treeList.reduce((acc, cur) => {
      return (acc += `<li>- ${cur.tag} : ${cur.class} </li>`);
    }, "");
  };

  return (
    <TreeListWrapper>
      <TreeListItems
        dangerouslySetInnerHTML={{ __html: getList() }}
      ></TreeListItems>
    </TreeListWrapper>
  );
}

export const TreeListWrapper = styled.div`
  width: 60%;
  height: 100%;
  background-color: #eeeeee;
  border-radius: 8px 0px 0px 8px;
  overflow: auto;
`;

export const TreeListItems = styled.ul`
  padding: 1rem;
`;

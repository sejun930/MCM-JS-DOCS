import styled from "@emotion/styled";

import _Copy from "src/main/commonsComponents/units/copy";
import { TreeModuleListTypes } from "src/commons/data/tree/tree.commons.data";

export default function ModuleTreeListPage({
  treeList,
  selectTree,
}: {
  treeList: Array<TreeModuleListTypes>;
  selectTree: (num: number) => void;
}) {
  const getList = () => {
    return treeList.reduce((acc, cur, i) => {
      let str = `<code style="--left : ${cur.depth}" onclick=${selectTree(1)}>`;
      str += `${
        (cur.depth && "<span>∟</span> ") || ""
      }<<span class='darkBlue'>${
        cur.tag
      } <span class='skyblue'>class=</span><span class='lightOrange'>"${
        cur.class
      }"</span></span>>`;

      str += `</code>`;

      return acc + str;
    }, "");
  };

  console.log(getList());

  return (
    <TreeListWrapper>
      <_Copy type="Code" text={getList()} className="tree-list" copyDisable />
      {/* <TreeListItems dangerouslySetInnerHTML={{ __html: getList() }} /> */}
    </TreeListWrapper>
  );
}

export const TreeListWrapper = styled.div`
  width: 60%;
  height: 100%;
  background-color: #eeeeee;
  border-radius: 8px 0px 0px 8px;
  overflow: auto;

  .tree-list {
    border-radius: 5px 0px 0px 5px;
    cursor: default;

    .copy-text {
      height: 100%;
      width: 100%;

      .copy-code-list {
        width: fit-content;

        .copy-code {
          display: block;
          cursor: pointer;

          code {
            display: block;
            --left: 0;
            padding-left: calc(var(--left) * 20px);

            :hover {
              background-color: white;
            }
          }
        }
      }
    }
  }
`;

export const TreeListItems = styled.ul`
  padding: 1rem;
`;

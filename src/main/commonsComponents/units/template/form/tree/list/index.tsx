import { TreeListWrapper } from "./list.styles";

import _Copy from "src/main/commonsComponents/units/copy";
import { TreeIProps } from "..";

declare const window: typeof globalThis & {
  selectTree: (i: number) => void;
};

export default function ModuleTreeListPage({
  treeList,
  selectTree,
  select,
}: TreeIProps) {
  const getList = (): string => {
    return treeList.reduce((acc, cur, i): string => {
      if (typeof window !== "undefined")
        window.selectTree = function (i: number) {
          selectTree(i);
        };

      let str: string = `<code style="--left : ${
        cur.depth
      }" onclick="selectTree(${i})"}
        class="${(select === i && "select-tree") || ""}"
      >`;
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

  return (
    <TreeListWrapper className="tree-list-wrapper">
      <_Copy type="Code" text={getList()} className="tree-list" copyDisable />
      {/* <TreeListItems dangerouslySetInnerHTML={{ __html: getList() }} /> */}
    </TreeListWrapper>
  );
}

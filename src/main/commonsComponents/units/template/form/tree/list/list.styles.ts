import styled from "@emotion/styled";

export const TreeListWrapper = styled.div`
  width: 60%;
  height: 100%;
  background-color: #eeeeee;
  border-radius: 8px 0px 0px 8px;
  overflow: auto;

  .tree-list {
    border-radius: 5px 0px 0px 5px;
    cursor: default;
    border-right: solid 2px black;

    .copy-text {
      height: 100%;
      width: 100%;
      display: block;

      .copy-code-list {
        min-width: fit-content;

        .copy-code {
          display: block;
          transition: all 0.2s;
          width: 100%;

          /* width: fit-content; */

          .select-tree {
            background-color: white;
          }

          code {
            cursor: pointer;
            display: block;
            width: 100%;
            height: 30px;
            --left: 0;
            padding-left: calc((var(--left) * 20px) + 10px);
          }
        }
      }
    }
  }
`;

export const TreeListItems = styled.ul`
  padding: 1rem;
`;

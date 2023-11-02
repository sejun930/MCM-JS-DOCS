import styled from "@emotion/styled";
import { breakPoints } from "mcm-js-commons/dist/responsive";

export const TreeListWrapper = styled.div`
  width: 60%;
  height: 100%;
  background-color: #eeeeee;
  border-radius: 8px 0px 0px 8px;
  overflow: auto;

  .tree-list {
    padding-right: 0px;
    border-radius: 5px 0px 0px 5px;
    cursor: default;

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
            border-radius: 6px;
          }

          code {
            cursor: pointer;
            display: block;
            width: 100%;
            height: 30px;
            --left: 0;
            padding-left: calc((var(--left) * 20px) + 10px);
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  @media ${breakPoints.mobileLarge} {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0px 0px;

    .tree-list {
      border-radius: 5px 5px 0px 0px;
      padding-right: 0px;

      .copy-text {
        .copy-code-list {
          .copy-code {
            .select-tree {
              display: flex;
              align-items: center;
            }

            code {
              padding-left: calc((var(--left) * 12px) + 0px);
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

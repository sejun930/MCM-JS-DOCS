import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

interface StyleTypes {
  alreadyDeleted?: boolean;
}

export const ListDetailWrapper = styled.li`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  border-bottom: solid 1px gray;
`;

export const ListHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .label-wrapper {
    flex-direction: row;
    gap: 0px 10px;
    align-items: center;
  }
`;

export const ListOptionalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0px 10px;

  .date {
    font-size: 12px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0px 10px;
`;

export const RemoveButton = styled(_Button)`
  font-size: 12px;

  ${(props: StyleTypes) =>
    props.alreadyDeleted && {
      cursor: "default",
      fontWeight: 700,
      color: "#aa5656",
    }}
`;

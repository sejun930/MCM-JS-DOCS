import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

import { breakPoints } from "mcm-js-commons/dist/responsive";

interface StyleTypes {
  alreadyDeleted?: boolean;
}

export const ListDetailWrapper = styled.li`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  border-bottom: solid 1px gray;

  @media ${breakPoints.mobileLarge} {
    padding: 30px 0px;
    position: relative;
  }
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

  @media ${breakPoints.mobileLarge} {
    .user-ip {
      position: absolute;
      top: 0;
      left: 0;
      right: unset;
    }
  }

  @media ${breakPoints.mobileSmall} {
    flex-direction: column;
    gap: 6px 0px;
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

  @media ${breakPoints.mobileSmall} {
    position: absolute;
    bottom: 30px;
    right: 0;
  }
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

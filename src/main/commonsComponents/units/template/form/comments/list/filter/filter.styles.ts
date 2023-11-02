import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

interface StyleTypes {
  isSelected?: boolean;
  isEmpty?: boolean;
  disable?: boolean;
}

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 12px;
  position: relative;

  .mcm-unit-select {
    top: 30px;
    width: 160px;
  }
`;

export const FilterItems = styled.div`
  display: flex;
`;

export const FilterButton = styled(_Button)`
  display: flex;
  align-items: flex-end;
  background-image: url("/images/commons/icons/filter-off.png");
  background-size: cover;
  width: 20px;
  height: 20px;

  &.open {
    background-image: url("/images/commons/icons/filter-click.png");
  }
  &.on {
    background-image: url("/images/commons/icons/filter-on.png");
  }

  ${(props: StyleTypes) =>
    props.disable && {
      cursor: "not-allowed",
    }}
`;

export const FilterList = styled(_Button)`
  ${(props) =>
    props.isEmpty && {
      cursor: "not-allowed",
      color: "gray",
    }}

  ${(props: StyleTypes) =>
    props.isSelected && {
      backgroundColor: "#00C4FF",
      color: "white",
      fontWeight: 700,
    }}
`;

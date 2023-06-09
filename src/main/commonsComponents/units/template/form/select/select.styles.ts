import styled from "@emotion/styled";

interface StyleTypes {
  isHover?: boolean;
}

export const SelectWrapper = styled.div`
  display: flex;
  position: absolute;
  border: solid 2px black;
  border-radius: 10px;
  background-color: white;
  z-index: 10;
  width: 120px;
  height: 0px;
  transition: all 0.3s;
  right: 0;

  .mcm-unit-select-close-button {
    position: absolute;
    right: 0;
    overflow: hidden;
    transform: translate3d(5px, -5px, 0px);
    background-color: white;
    border: solid 2px black;
    border-radius: 100%;
    z-index: 100;

    ::after,
    ::before {
      width: 70%;
    }
  }

  &.close-animation {
    height: 0px !important;
  }
`;

export const SelectItems = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const SelectListWrapper = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 6px;
`;

export const Select = styled.li`
  button {
    width: 100%;
    text-align: left;
    padding: 6px;
    border-radius: 5px;

    ${(props: StyleTypes) =>
      props.isHover && {
        backgroundColor: " #eee3cb",
      }}
  }
`;

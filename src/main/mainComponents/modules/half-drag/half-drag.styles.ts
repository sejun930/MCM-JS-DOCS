import styled from "@emotion/styled";

interface StyleTypes {
  isStartingHalfScroll?: boolean;
}

export const HalfDragWrapper = styled.section`
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;

  ${(props: StyleTypes) =>
    props.isStartingHalfScroll && {
      userSelect: "none",
      pointerEvents: "none",
    }}

  ._halfDrag_leftPage_, ._halfDrag_rightPage_ {
    width: calc(50%);
  }
`;

export const HalfDragComponentsWrapper = styled.div``;

export const HalfDragControllerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  height: 100%;
  background-color: #b2b2b2;
  cursor: ew-resize;
  z-index: 1;

  :hover {
    ._scroll_bar_ {
      opacity: 0.45;
    }
  }

  ${(props: StyleTypes) =>
    props.isStartingHalfScroll && {
      opacity: 0.45,
    }}
`;

export const ScorllBar = styled.button`
  position: relative;
  width: 100%;
  height: 30px;
  cursor: ew-resize;
  display: flex;
  padding: 0px;
  align-items: center;
  justify-content: center;
  border: unset;
  gap: 0px 2px;
  user-select: none;
  pointer-events: none;

  p {
    margin: 0px;
    height: 8px;
  }

  img {
    width: 20px;
  }
`;

import { useState } from "react";
import styled from "@emotion/styled";

import { _Button, _Image } from "mcm-js-commons";
import { CommentsAllInfoTypes } from "../../comments.types";

export default function CommentsFilterPage({
  commentsInfo,
}: {
  commentsInfo: CommentsAllInfoTypes;
}) {
  console.log(commentsInfo);
  // 필터창 오픈 여부
  const [open, setOpen] = useState(false);

  const getFilterImage = (): string => {
    let src = "/images/commons/icons/filter-";

    // 필터 오픈 전 / 후
    src += open ? "click" : "off";

    src += ".png";
    return src;
  };

  // 필터창 오픈 및 닫기
  const toggleFilter = (bool?: boolean) => {
    setOpen(bool || !open);
  };

  return (
    <FilterWrapper>
      <_Button onClickEvent={() => toggleFilter()}>
        <_Image src={getFilterImage()} className="filter-image" />
      </_Button>
      <FilterItems>22</FilterItems>
    </FilterWrapper>
  );
}

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .filter-image {
    width: 20px;
  }
`;

export const FilterItems = styled.ul`
  position: absolute;
  width: 120px;
  border: solid 2px black;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  z-index: 100;
  transform: translate3d(-100px, 40px, 0px);
`;

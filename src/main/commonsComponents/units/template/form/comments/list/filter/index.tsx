import { useState } from "react";
import styled from "@emotion/styled";

import { _Button, _Image } from "mcm-js-commons";
import { CommentsAllInfoTypes } from "../../comments.types";

import _SelectForm from "../../../select/select.container";
import { filterInitList, InitTypes } from "./filter.init";

export default function CommentsFilterPage({
  commentsInfo,
  changeInfo,
}: {
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
}) {
  // 필터창 오픈 여부
  const [open, setOpen] = useState(false);
  // 필터 리스트
  const [filterList, setFilterList] = useState<Array<InitTypes>>([
    ...filterInitList,
  ]);

  // 필터 현재 이미지 렌더
  const getFilterImage = (): string => {
    let src = "/images/commons/icons/filter-";

    // 필터 오픈 전 / 후
    src += open ? "click" : "off";

    src += ".png";
    return src;
  };

  // 필터창 오픈 및 닫기
  const toggleFilter = (bool?: boolean) => {
    setOpen(bool ? bool : (prev) => !prev);
  };

  // 필터 정보 변경하기
  const changeFilter = (info: InitTypes) => () => {
    const _commentsInfo = { ...commentsInfo };

    _commentsInfo.filter.list[info.target] =
      _commentsInfo.filter.list[info.target] !== undefined
        ? !_commentsInfo.filter.list[info.target]
        : true;

    changeInfo(_commentsInfo);
  };

  return (
    <FilterWrapper>
      <FilterButton onClickEvent={() => toggleFilter(true)}>
        <_Image src={getFilterImage()} className="filter-image" />
      </FilterButton>
      <_SelectForm
        show={open}
        closeEvent={() => toggleFilter(false)}
        offAutoClose
      >
        {filterList.map((el) => {
          const isSelected = commentsInfo.filter.list[el.target] || false;

          return (
            <FilterList
              onClickEvent={changeFilter(el)}
              key={`comments-filter-list-${el.name}`}
              isSelected={isSelected}
            >
              {(isSelected && "✔") || ""} {el.name}
            </FilterList>
          );
        })}
      </_SelectForm>
    </FilterWrapper>
  );
}

interface StyleTypes {
  isSelected?: boolean;
}

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .mcm-unit-select {
    top: 30px;
    width: 160px;
  }
`;

export const FilterButton = styled(_Button)`
  display: flex;
  align-items: flex-end;

  .filter-image {
    width: 18px;
  }
`;

export const FilterList = styled(_Button)`
  ${(props: StyleTypes) =>
    props.isSelected && {
      backgroundColor: "#00C4FF",
      color: "white",
      fontWeight: 700,
    }}
`;

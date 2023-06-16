import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { _Button, _Image, _CloseButton } from "mcm-js-commons";
import { CommentsAllInfoTypes } from "../../comments.types";

import _SelectForm from "../../../select/select.container";
import { filterInitList, InitTypes, categoryFilterList } from "./filter.init";

let waiting = false; // 선택에 대한 딜레이 지정
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

  useEffect(() => {
    // 카테고리가 변경될 경우 필터 변경하기
    let _filterList = [...filterInitList];

    if (commentsInfo.commentsList.length) {
      if (categoryFilterList[commentsInfo.selectCategory]) {
        // 해당 카테고리에서만 사용 가능한 필터가 존재할 경우
        // 기존의 필터리스트에 추가
        _filterList = [
          ..._filterList,
          ...categoryFilterList[commentsInfo.selectCategory],
        ];
      }

      // 노출될 수 있는 필터 리스트
      const ableFilterList = _filterList.reduce(
        (acc: { [key: string]: boolean }, cur) => {
          acc[cur.target] = true;
          return acc;
        },
        {}
      );

      // 현재 노출될 필터가 아니라면 모두 비활성화
      for (const list in commentsInfo.filter.list) {
        if (!ableFilterList[list] || ableFilterList[list] === undefined) {
          commentsInfo.filter.list[list] = false;
        }
      }

      setFilterList(_filterList);
    } else {
      // setFilterList([]);
      window.setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  }, [commentsInfo.selectCategory]);

  // 필터 현재 이미지 렌더
  const getFilterImage = (): string => {
    let src = "/images/commons/icons/filter-";

    // 필터 오픈 전 / 후
    let icon = open ? "click" : "off";

    // 필터가 설정되어 있는지 체크
    const filterList = commentsInfo.filter.list;
    for (const list in filterList) {
      if (filterList[list]) {
        icon = "on";
        break;
      }
    }

    return src + icon + ".png";
  };

  // 필터창 오픈 및 닫기
  const toggleFilter = (bool?: boolean) => {
    if (commentsInfo.commentsList.length)
      setOpen(bool !== undefined ? bool : (prev) => !prev);
  };

  // 필터 정보 변경하기
  const changeFilter = (info: InitTypes, isEmpty: boolean) => () => {
    if (isEmpty || waiting) return;
    waiting = true;

    commentsInfo.filter.list[info.target] =
      commentsInfo.filter.list[info.target] !== undefined
        ? !commentsInfo.filter.list[info.target]
        : true;

    changeInfo(commentsInfo);
    window.setTimeout(() => {
      waiting = false;
    }, 0);
  };

  // 모든 필터 리셋하기
  const renderResetButton = () => {
    let able = false;

    // 필터가 하나라도 적용되어 있는지 체크
    for (const list in commentsInfo.filter.list) {
      if (commentsInfo.filter.list[list]) {
        able = true;
        break;
      }
    }

    // 모든 필터 리셋하기
    const reset = () => {
      const _commentsInfo = { ...commentsInfo };
      _commentsInfo.filter.list = {};

      changeInfo(_commentsInfo);
    };

    return able ? <_CloseButton onClickEvent={reset} /> : <></>;
  };

  return (
    <FilterWrapper>
      {renderResetButton()}
      <FilterItems>
        <FilterButton
          onClickEvent={() => toggleFilter()}
          className="filter-button"
          disable={!commentsInfo.commentsList.length}
        >
          <_Image src={getFilterImage()} className="filter-image" />
        </FilterButton>
        <_SelectForm
          show={open}
          closeEvent={() => toggleFilter(false)}
          offAutoClose
          className="filter-select"
        >
          {filterList.map((el) => {
            const isSelected = commentsInfo.filter.list[el.target] || false;
            // 필터의 개수가 0개인지 검증
            const isEmpty = !commentsInfo.countFilterList[el.target];

            return (
              <FilterList
                onClickEvent={changeFilter(el, isEmpty)}
                key={`comments-filter-list-${el.name}`}
                isSelected={isSelected}
                isEmpty={isEmpty}
              >
                {(isSelected && "✔") || ""} {el.name}{" "}
                {el.target !== "oddest" &&
                  `(${commentsInfo.countFilterList[el.target]})`}
              </FilterList>
            );
          })}
        </_SelectForm>
      </FilterItems>
    </FilterWrapper>
  );
}

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

  .filter-image {
    width: 18px;
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

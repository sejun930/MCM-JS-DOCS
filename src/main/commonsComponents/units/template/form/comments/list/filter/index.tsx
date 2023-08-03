import {
  FilterButton,
  FilterItems,
  FilterList,
  FilterWrapper,
} from "./filter.styles";
import { useEffect, useState } from "react";

import { _Image, _CloseButton } from "mcm-js-commons";
import { CommentsAllInfoTypes } from "../../comments.types";

import _SelectForm from "../../../select/select.container";
import { filterInitList, InitTypes, categoryFilterList } from "./filter.init";

let waiting = false; // 선택에 대한 딜레이 지정
export default function CommentsFilterPage({
  commentsInfo,
  changeInfo,
  isAdmin,
}: {
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
  isAdmin?: boolean;
}) {
  const { selectCategory, commentsList, countFilterList, filter } =
    commentsInfo;

  // 필터창 오픈 여부
  const [open, setOpen] = useState(false);
  // 필터 리스트
  const [filterList, setFilterList] = useState<Array<InitTypes>>([
    ...filterInitList,
  ]);

  // 필터 비활성화 여부
  let isDisable = !commentsList.length; // 조회된 데이터가 하나도 없는 경우
  if (Object.values(commentsInfo.filter.list).some((el) => el)) {
    // 필터가 현재 하나라도 적용되어 있는 경우
    isDisable = false;
  }
  if (
    // 관리자이면서 삭제된 댓글이 하나라도 있는 경우
    (isAdmin &&
      commentsInfo.countFilterList[commentsInfo.selectCategory].deleted) ||
    commentsInfo.filter.list.deleted
  )
    isDisable = false;

  useEffect(() => {
    // 카테고리가 변경될 경우 필터 변경하기
    let _filterList = [...filterInitList];

    if (!isDisable) {
      if (categoryFilterList[selectCategory]) {
        // 해당 카테고리에서만 사용 가능한 필터가 존재할 경우
        // 기존의 필터리스트에 추가
        _filterList = [..._filterList, ...categoryFilterList[selectCategory]];
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
      for (const list in filter.list) {
        if (!ableFilterList[list] || ableFilterList[list] === undefined) {
          filter.list[list] = false;
        }
      }

      // 관리자가 아니라면, 관리자 권한이 없는 필터는 제거
      if (!isAdmin) {
        _filterList = _filterList.filter((el) => !el.isShowAdmin);
      }

      setFilterList(_filterList);
    } else {
      // setFilterList([]);
      window.setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  }, [selectCategory]);

  // 필터 현재 이미지 렌더
  const getFilterImage = (): string => {
    const src = "/images/commons/icons/filter-";

    // 필터 오픈 전 / 후
    let icon = open ? "click" : "off";

    // 필터가 설정되어 있는지 체크
    const filterList = filter.list;
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
    if (!isDisable) setOpen(bool !== undefined ? bool : (prev) => !prev);
  };

  // 필터 정보 변경하기
  const changeFilter = (info: InitTypes, isEmpty: boolean) => () => {
    if (isEmpty || waiting) return;
    waiting = true;

    const _commentsInfo = { ...commentsInfo };
    _commentsInfo.filter.list[info.target] =
      _commentsInfo.filter.list[info.target] !== undefined
        ? !_commentsInfo.filter.list[info.target]
        : true;

    changeInfo(_commentsInfo);
    window.setTimeout(() => {
      waiting = false;
    }, 0);
  };

  // 모든 필터 리셋하기
  const renderResetButton = () => {
    let able = false;

    // 필터가 하나라도 적용되어 있는지 체크
    for (const list in filter.list) {
      if (filter.list[list]) {
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
          disable={isDisable}
        >
          <_Image src={getFilterImage()} className="filter-image" />
        </FilterButton>
        <_SelectForm
          show={open}
          closeEvent={() => toggleFilter(false)}
          className="filter-select"
        >
          {filterList.map((el) => {
            const isSelected = filter.list[el.target] || false;
            // @ts-ignore
            const count = countFilterList[selectCategory][el.target] || "";

            // 필터의 개수가 0개인지 검증
            let isEmpty = count === 0 || (count === "" && !el.searchFilterList);
            if (isAdmin && filter.list.deleted) {
              isEmpty = false;
            }

            return (
              <FilterList
                onClickEvent={changeFilter(el, isEmpty)}
                key={`comments-filter-list-${el.name}`}
                isSelected={isSelected}
                isEmpty={isEmpty}
              >
                {(isSelected && "✔") || ""} {el.name}{" "}
                {count && !el.isHide && `(${count})`}
              </FilterList>
            );
          })}
        </_SelectForm>
      </FilterItems>
    </FilterWrapper>
  );
}

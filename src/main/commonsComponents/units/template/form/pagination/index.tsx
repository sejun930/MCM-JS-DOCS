import {
  Page,
  PageJumpWrapper,
  PageListWrapper,
  PagiNationWrapper,
} from "./pagination.styles";

import { memo } from "react";
import { _Error } from "mcm-js-commons";
import { IProps, pageInfoInit } from "./pagination.types";

import { getUuid } from "src/main/commonsComponents/functional";
import CommonsHooksComponents from "src/main/commonsComponents/hooks/commonsHooks";

// 페이지네이션 form
const _PagiNationForm = (props: IProps) => {
  const { getAllComponentsClassName } = CommonsHooksComponents();
  let waiting = false; // 중복 클릭 방지

  const {
    allData,
    currentPage,
    limit,
    changePageEvent,
    limitPage,
    startPage,
    disable,
    className,
  } = props;

  // 페이지 정보
  const pageInfoList = { ...pageInfoInit };

  // 한 블럭당 보여질 페이지 수 지정
  if (limitPage) {
    pageInfoList.pageLimit = limitPage;
  }

  // 전체 페이지 개수 구하기
  pageInfoList.allPage = Math.ceil(allData / limit);

  // 페이지 시작점 구하기
  const getStartPage = (page: number) => {
    pageInfoList.startPage =
      (Math.ceil(page / pageInfoList.pageLimit) - 1) * pageInfoList.pageLimit +
      1;
  };
  getStartPage(currentPage);

  // 렌더될 페이지 리스트
  const pageList = Array.from(
    new Array(pageInfoList.pageLimit),
    (_, i) => pageInfoList.startPage + i
  ).filter((page) => page <= pageInfoList.allPage);

  // 앞으로 이동 & 처음으로 이동 사용여부 구하기
  if (pageInfoList.startPage !== 1) {
    // 가장 첫 페이지가 아닐 경우
    pageInfoList.prev = true;
  }

  // 뒤로 이동 & 끝으로 이동 사용여부 구하기
  if (pageInfoList.startPage + pageInfoList.pageLimit <= pageInfoList.allPage) {
    pageInfoList.next = true;
  }

  // 페이지 이동하기
  const clickChangePage = (num: number, isSelected: boolean) => {
    // 이미 선택된 페이지이거나, 페이지 이동중이라면 함수를 종료하여 재실행 방지
    if (waiting || isSelected) return;
    waiting = true;

    changePageEvent(num);
  };

  // 페이지 처음, 이전, 다음, 끝으로 점프하기
  const jumpPage = (type: "first" | "prev" | "next" | "end") => {
    if (disable) return alert("동기화 작업중입니다.");
    let num = currentPage;

    if (type === "first") {
      // 처음 페이지로 이동
      num = 1;
    } else if (type === "prev") {
      // 이전 페이지로 이동
      num = pageInfoList.startPage - 1;
    } else if (type === "next") {
      // 다음 페이지로 이동
      num = pageInfoList.startPage + pageInfoList.pageLimit;
    } else if (type === "end") {
      // 끝 페이지로 이동
      num = pageInfoList.allPage;
    }

    clickChangePage(num, false);
  };

  return (
    <_Error
      propsList={props}
      requiredList={["allData", "currentPage", "limit", "changePageEvent"]}
    >
      <PagiNationWrapper
        className={getAllComponentsClassName(
          "mcm-pagination-wrapper",
          className
        )}
        role="mcm-pagination"
        disable={disable}
      >
        {pageInfoList.prev && (
          <PageJumpWrapper>
            <Page onClickEvent={() => jumpPage("first")} buttonType="button">
              처음
            </Page>
            <Page onClickEvent={() => jumpPage("prev")} buttonType="button">
              이전
            </Page>
          </PageJumpWrapper>
        )}
        <PageListWrapper>
          {pageList.map((page) => {
            const isSelected = page === currentPage;

            return (
              <Page
                className="page"
                onClickEvent={() => clickChangePage(page, isSelected)}
                key={`pagination-page-${getUuid()}`}
                isSelected={isSelected}
                isStartPage={page === startPage}
                buttonType="button"
              >
                {page}
              </Page>
            );
          })}
        </PageListWrapper>

        {pageInfoList.next && (
          <PageJumpWrapper>
            <Page onClickEvent={() => jumpPage("next")} buttonType="button">
              다음
            </Page>
            <Page onClickEvent={() => jumpPage("end")} buttonType="button">
              끝
            </Page>
          </PageJumpWrapper>
        )}
      </PagiNationWrapper>
    </_Error>
  );
};

export default memo(_PagiNationForm);

import {
  BlockListItems,
  BlockListWrapper,
  FilterItems,
  FilterWrapper,
  OptionalWrapper,
  Tr,
  Wrapper,
  LoadingData,
  EmptyList,
} from "./block.styles";

import { _PText, _Button, _Image, _Checkbox, _SpanText } from "mcm-js-commons";
import { getUuid } from "src/main/commonsComponents/functional";
import { getDateForm } from "src/main/commonsComponents/functional/date";
import { IProps } from "./block.types";

import _SelectForm from "src/main/commonsComponents/units/template/form/select/select.container";
import _PagiNationForm from "src/main/commonsComponents/units/template/form/pagination";

export default function AdminBlockUIPage(props: IProps) {
  const {
    filter,
    blockList,
    showFilter,
    toggleShowFilter,
    fetchFilter,
    checkBlockInfo,
    getFilterOn,
    cancelBlock,
    changePage,
    isLoading,
    adminLoginInfo,
    render,
  } = props;

  return (
    <Wrapper id="admin-block-wrapper">
      <BlockListWrapper>
        {isLoading && (
          <LoadingData id="admin-block-loading">
            <_SpanText className="loading-data">데이터 로딩 중</_SpanText>
          </LoadingData>
        )}
        <OptionalWrapper id="admin-block-optional-wrapper" render={render}>
          <_PText>- 총 {filter.allData}명의 차단된 유저가 있습니다.</_PText>

          <FilterWrapper>
            <FilterItems>
              <_Button onClickEvent={() => toggleShowFilter(true)}>
                <_Image
                  src={`/images/commons/icons/filter-${
                    getFilterOn() ? "on" : "off"
                  }.png`}
                  className="filter-icon"
                />
              </_Button>
              <_SelectForm
                show={showFilter}
                closeEvent={() => toggleShowFilter(false)}
                className="block-filter-list"
              >
                <_Button
                  onClickEvent={() => fetchFilter("showOnlyBlock")}
                  className={`show-block-user-btn ${
                    (filter.showOnlyBlock && "selected") || undefined
                  }`}
                >
                  차단중인 유저만 보기
                </_Button>
                <_Button
                  onClickEvent={() => fetchFilter("past")}
                  className={`show-past-user-btn ${
                    (filter.past && "selected") || undefined
                  }`}
                >
                  과거순으로 보기
                </_Button>
              </_SelectForm>
            </FilterItems>

            {!adminLoginInfo.isTest && (
              <_Button
                onClickEvent={cancelBlock}
                className="remove-block-user-btn"
              >
                선택 차단 해제
              </_Button>
            )}
          </FilterWrapper>
        </OptionalWrapper>
        <BlockListItems isLoading={isLoading || false} render={render}>
          <thead>
            <Tr>
              <td className="block-select"></td>
              <td className="block-ip">아이피</td>
              <td className="block-contents">차단 사유</td>
              <td className="block-date">차단일</td>
              <td className="block-cancel">차단 해제일</td>
            </Tr>
          </thead>

          <tbody>
            {blockList.length ? (
              blockList.map((info, idx) => {
                // 이미 차단이 해제된 유저인지 체크
                const alreadyCancel =
                  info.canceledAt !== null && info.canceledAt !== undefined;
                // 선택한 유저인지 체크
                const isChecked = alreadyCancel ? false : info.checked || false;

                return (
                  <Tr
                    key={getUuid()}
                    style={{ border: (idx === 0 && "none") || "" }}
                    onClick={() => checkBlockInfo(idx)}
                    isTbody={true}
                    alreadyCancel={alreadyCancel}
                  >
                    <td className="block-select">
                      <_Checkbox
                        inputId={info.inputId}
                        onChangeEvent={() => checkBlockInfo(idx)}
                        isChecked={isChecked}
                        readOnly={alreadyCancel}
                      />
                    </td>
                    <td className="block-ip">
                      <b>{info.ip}</b>
                    </td>
                    <td className="block-contents">
                      <p
                        className="block-contents-info"
                        dangerouslySetInnerHTML={{ __html: info.contents }}
                      ></p>
                    </td>
                    <td className="block-date">
                      {info.createdAt &&
                        getDateForm({
                          firebaseTimer: info.createdAt,
                          getDate: true,
                        })}{" "}
                      <span>(차단일)</span>
                    </td>
                    <td className="block-cancel">
                      {info.canceledAt
                        ? getDateForm({
                            firebaseTimer: info.canceledAt,
                            getDate: true,
                          })
                        : "-"}{" "}
                      {(info.canceledAt && <span>(차단 해제일)</span>) || ""}
                    </td>
                  </Tr>
                );
              })
            ) : (
              <Tr className="empty-filter-tr">
                <EmptyList className="empty-filter-td">
                  <_SpanText>조회된 유저가 없습니다.</_SpanText>
                </EmptyList>
              </Tr>
            )}
          </tbody>
        </BlockListItems>

        {(blockList.length && (
          <_PagiNationForm
            currentPage={filter.page}
            allData={filter.allData}
            limit={filter.limit}
            changePageEvent={changePage}
          />
        )) ||
          undefined}
      </BlockListWrapper>
      {/* )} */}
    </Wrapper>
  );
}

import {
  Items,
  LoadingWrapper,
  ModuleSelector,
  ModuleSelectWrapper,
  Wrapper,
  AdminFunctionalWrapper,
  PaginationWrapper,
  PaginationItems,
  CategoryFilterWrapper,
  CommentsOptionWrapper,
} from "./admin.comments.styles";
import { _Title, _Button, _Image } from "mcm-js-commons";

import { navList } from "src/main/commonsComponents/layout/nav/nav.data";
import {
  AdminCommentsPropsType,
  FunctionPropsTypes,
} from "./admin.comments.types";

import ExtendsFunction from "./function/extends";
import SyncComments from "./function/sync";
import AdminCommentsCategoryPage from "./category/admin.comments.category";
import AdminCommentsListPage from "./list/admin.comments.list";

import _InfinityScroll from "src/main/commonsComponents/units/template/form/infinity";
import _SelectForm from "src/main/commonsComponents/units/template/form/select/select.container";
import Pagination from "src/main/commonsComponents/units/template/form/pagination";
import CommentsFilterPage from "src/main/commonsComponents/units/template/form/comments/list/filter";

export default function AdminCommentsUIPage({
  info,
  isLoading,
  changeSelectModule,
  changeLoading,
  fetchComments,
  toggleSettings,
  oepnSettings,
  checkLoading,
  changePage,
  changeFilterComments,
}: AdminCommentsPropsType) {
  // 관리자 기능 props 객체
  const functionProps: FunctionPropsTypes = {
    module: info.selectModule,
    changeLoading,
    info,
    fetchComments,
    checkLoading,
  };

  return (
    <_InfinityScroll
      moreLoad={() =>
        !isLoading ? changePage(info.filter.page + 1, true) : undefined
      }
    >
      <Wrapper>
        {(isLoading && (
          <LoadingWrapper>
            <_Title className="loading-title">동기화 작업중입니다.</_Title>
          </LoadingWrapper>
        )) || <></>}
        <Items isLoading={isLoading || false}>
          <CommentsOptionWrapper>
            <ModuleSelectWrapper>
              <ModuleSelector
                onChange={changeSelectModule}
                defaultValue={info.selectModule}
              >
                {navList &&
                  navList.length &&
                  navList.map((module, idx) => (
                    <option
                      key={`admin-module-${module.name}-${idx}`}
                      disabled={module.name === info.selectModule}
                    >
                      {module.name}
                    </option>
                  ))}
              </ModuleSelector>
              <AdminFunctionalWrapper>
                <_Button onClickEvent={toggleSettings(true)}>
                  <_Image
                    src={`/images/commons/icons/settings${
                      (oepnSettings && "-on") || ""
                    }.png`}
                    className="settings-icon"
                  />
                </_Button>
                <_SelectForm
                  show={oepnSettings}
                  closeEvent={toggleSettings(false)}
                  className="admin-function-select"
                >
                  <ExtendsFunction {...functionProps} />
                  <SyncComments {...functionProps} />
                </_SelectForm>
              </AdminFunctionalWrapper>
            </ModuleSelectWrapper>
            <CategoryFilterWrapper>
              <AdminCommentsCategoryPage
                info={info}
                changeLoading={changeLoading}
                fetchComments={fetchComments}
              />
              <CommentsFilterPage
                commentsInfo={info}
                changeInfo={changeFilterComments}
                isAdmin
              />
            </CategoryFilterWrapper>
          </CommentsOptionWrapper>

          <AdminCommentsListPage
            info={info}
            changeLoading={changeLoading}
            fetchComments={fetchComments}
          />
        </Items>
        {(info.commentsList.length && (
          <PaginationWrapper>
            <PaginationItems>
              <Pagination
                allData={info.filter.allData}
                currentPage={info.filter.page}
                limit={info.filter.limit}
                changePageEvent={changePage}
                startPage={info.filter.startPage}
                disable={isLoading}
              />
            </PaginationItems>
          </PaginationWrapper>
        )) || <></>}
      </Wrapper>
    </_InfinityScroll>
  );
}

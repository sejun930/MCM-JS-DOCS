import {
  Items,
  LoadingWrapper,
  ModuleSelector,
  ModuleSelectWrapper,
  Wrapper,
} from "./admin.comments.styles";
import { _Title } from "mcm-js-commons";

import { navList } from "src/main/commonsComponents/layout/nav/nav.data";
import { AdminCommentsPropsType } from "./admin.comments.types";

import UpdateComments from "./update";
import AdminCommentsCategoryPage from "./category/admin.comments.category";
import AdminCommentsListPage from "./list";

export default function AdminCommentsUIPage({
  info,
  isLoading,
  changeSelectModule,
  render,
  changeLoading,
  fetchComments,
  changeInfo,
}: AdminCommentsPropsType) {
  return (
    <Wrapper>
      {(isLoading && (
        <LoadingWrapper>
          <_Title className="loading-title">동기화 작업중입니다.</_Title>
        </LoadingWrapper>
      )) || <></>}
      <Items isLoading={isLoading || false}>
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
          <UpdateComments
            module={info.selectModule}
            loading={isLoading}
            changeLoading={changeLoading}
            info={info}
            fetchComments={fetchComments}
          />
        </ModuleSelectWrapper>
        <AdminCommentsCategoryPage
          info={info}
          changeInfo={changeInfo}
          render={render}
        />

        <AdminCommentsListPage info={info} changeLoading={changeLoading} />
      </Items>
    </Wrapper>
  );
}

import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

import { categoryListArray } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";
import { CommentsAllInfoTypes } from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { FetchCommentsTypes } from "../admin.comments.types";

const categoryList = [...categoryListArray];
export default function AdminCommentsCategoryPage({
  info,
  fetchComments,
  changeLoading,
}: {
  info: CommentsAllInfoTypes;
  changeLoading: (bool: boolean) => void;
} & FetchCommentsTypes) {
  const { countFilterList, selectCategory, selectModule } = info;

  // 카테고리 변경하기
  const changeCategory = (category: string) => {
    const _info = { ...info, ["selectCategory"]: category };
    _info.filter.page = 1;
    _info.filter.startPage = 0;

    const filterList: { [key: string]: boolean } = {};
    // 과거순 보기 유지
    if (_info.filter.list.oddest) filterList.oddest = true;
    // 삭제된 댓글 보기 유지
    if (_info.filter.list.deleted) filterList.deleted = true;
    _info.filter.list = filterList;

    changeLoading(true);
    fetchComments({ info: _info, moveTop: true });
  };

  return (
    <CategoryWrapper>
      <CategoryListContents>
        {categoryList &&
          categoryList.map((category, idx) => {
            const data = Object.entries(category)[0];
            const isSelected = selectCategory === data[0];

            // 해당 카테고리의 전체 데이터 수
            let categoryLen = countFilterList[data[0]].count || 0;
            if (categoryLen > 999) categoryLen = 999;

            return (
              <CategoryBtn
                onClickEvent={() =>
                  (!isSelected && categoryLen && changeCategory(data[0])) ||
                  undefined
                }
                key={`admin-comments-${selectModule}-category-${data[0]}-${data[1]}-${idx}`}
                isSelected={isSelected}
                isEmpty={categoryLen === 0}
              >
                {data[1]} ({categoryLen})
              </CategoryBtn>
            );
          })}
      </CategoryListContents>
    </CategoryWrapper>
  );
}

interface StyleTypes {
  isSelected?: boolean;
  isEmpty?: boolean;
}

export const CategoryWrapper = styled.div`
  display: flex;
  height: 20px;
`;

export const CategoryListContents = styled.div`
  display: flex;
  gap: 0px 32px;
`;

export const CategoryBtn = styled(_Button)`
  font-size: 14px;
  color: gray;
  transition: all 0.2s ease;

  ${(props: StyleTypes) =>
    props.isSelected && {
      cursor: "default",
      color: "#525FE1 !important",
      fontWeight: 700,
    }}

  ${(props) =>
    props.isEmpty && {
      cursor: "not-allowed",
      color: "#cccccc",
    }}
`;

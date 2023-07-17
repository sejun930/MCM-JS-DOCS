import styled from "@emotion/styled";
import { _Button } from "mcm-js-commons";

import { categoryListArray } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";
import { AdminCommentsInitType } from "../admin.comments.types";

const categoryList = [...categoryListArray];
export default function AdminCommentsCategoryPage({
  info,
  changeInfo,
  render,
}: {
  info: AdminCommentsInitType;
  changeInfo: (info: AdminCommentsInitType) => void;
  render: boolean;
}) {
  // 카테고리 변경하기
  const changeCategory = (category: string) => {
    const _info = { ...info, ["selectCategory"]: category };
    changeInfo(_info);
  };

  return (
    <CategoryWrapper render={render}>
      <CategoryListContents>
        {categoryList &&
          categoryList.map((category, idx) => {
            const data = Object.entries(category)[0];
            const isSelected = info.selectCategory === data[0];

            // 해당 카테고리의 전체 데이터 수
            let categoryLen = info.count[data[0]] || 0;
            if (categoryLen > 999) categoryLen = 999;

            return (
              <CategoryBtn
                onClickEvent={() =>
                  (!isSelected && changeCategory(data[0])) || undefined
                }
                key={`admin-comments-${info.selectModule}-category-${data[0]}-${data[1]}-${idx}`}
                isSelected={isSelected}
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
  render?: boolean;
}

export const CategoryWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  height: 20px;
  width: 100%;
  opacity: 0;

  ${(props: StyleTypes) =>
    props.render && {
      opacity: 1,
    }}
`;

export const CategoryListContents = styled.div`
  display: flex;
  gap: 0px 32px;
`;

export const CategoryBtn = styled(_Button)`
  font-size: 16px;
  color: gray;
  transition: all 0.2s ease;

  ${(props: StyleTypes) =>
    props.isSelected && {
      cursor: "default",
      color: "#525FE1",
      fontWeight: 700,
    }}
`;

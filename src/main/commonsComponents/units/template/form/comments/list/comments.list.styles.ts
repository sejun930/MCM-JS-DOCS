import styled from "@emotion/styled";

interface StyleTypes {
  render?: boolean;
  selected?: boolean;
}

export const CommentsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  gap: 50px 0px;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CategoryItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 0px 26px;
  height: 24px;
  border-left: solid 3px gray;
  padding-left: 16px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Category = styled.li`
  .cmm-button-unit {
    transition: all 0.3s;
    font-size: 14px;
    color: #666666;

    ${(props: StyleTypes) =>
      props.selected && {
        color: "#aa5656",
        cursor: "default",
        fontWeight: 700,
      }}
  }
`;

export const EmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  background-color: #cccccc;
  border-radius: 10px;
  padding: 36px 0px;
  cursor: not-allowed;

  .empty-list {
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.04rem;
    color: #656565;
  }
`;

export const CommentListItems = styled.ul`
  display: flex;
  flex-direction: column;

  /* ${(props: StyleTypes) =>
    !props.render && {
      filter: "blur(5px)",
      transition: "all 0.4s ease",
    }}

  .leng {
    font-size: 14px;
  } */
`;

export const LoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  border: double 3px #0a4d68;
  align-items: center;
  justify-content: center;
`;

import styled from "@emotion/styled";
import { _Input } from "mcm-js-commons";

import { FormEvent, MutableRefObject, useRef } from "react";
import { useRecoilState } from "recoil";
import { fetchCommentsListState } from "src/commons/store/comments";

let search = ""; // 검색어 저장
export default function CommentsSearchPage() {
  const [fetchCommentsList] = useRecoilState(fetchCommentsListState);
  const _inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  // 검색어 변경하기
  const changeSearch = (text: string) => {
    search = text.trim();
  };

  // 검색 적용하기
  const submitSearch = (e: FormEvent) => {
    e.preventDefault();

    console.log(search);
    fetchCommentsList({ search });
  };

  return (
    <Form onSubmit={submitSearch}>
      <_Input
        placeHolder="댓글 검색"
        onChangeEvent={changeSearch}
        className="search-comments"
        inputClassName="search-comments-input"
        maxLength={10}
        onSubmitEvent={() => {}}
        inputRef={_inputRef}
      />
    </Form>
  );
}

export const Form = styled.form`
  .search-comments {
    height: 30px;
    .search-comments-input {
      width: 120px;
    }
  }
`;

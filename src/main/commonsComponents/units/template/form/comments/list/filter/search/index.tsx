import styled from "@emotion/styled";
import { _Input } from "mcm-js-commons";

import { FormEvent, MutableRefObject, useRef } from "react";
import { CommentsAllInfoTypes } from "../../../comments.types";

let search = ""; // 검색어 저장
let change = false; // 변경여부 확인 (변경될 때만 검색)
export default function CommentsSearchPage({
  commentsInfo,
  changeInfo,
}: {
  commentsInfo: CommentsAllInfoTypes;
  changeInfo: (info: CommentsAllInfoTypes) => void;
}) {
  const _inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  // 검색어 변경하기
  const changeSearch = (text: string) => {
    search = text.trim();
    change = true;
  };

  // 검색 적용하기
  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    clickSearch();
    // fetchCommentsList({ search });
  };

  // 검색
  const clickSearch = () => {
    if (!change) return;

    const info = {
      ...commentsInfo,
      ["filter"]: {
        ...commentsInfo.filter,
        search,
        page: 1,
      },
    };

    changeInfo(info);
    change = false;
  };

  return (
    <Form onSubmit={submitSearch}>
      <_Input
        placeHolder="댓글 검색"
        onChangeEvent={changeSearch}
        className="search-comments"
        inputClassName="search-comments-input"
        maxLength={10}
        onSubmitEvent={clickSearch}
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

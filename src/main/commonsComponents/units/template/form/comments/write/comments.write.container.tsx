import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import CommentsWriteUIPage from "./comments.write.presenter";

import ErrorModalForm from "../error";
import { Modal } from "mcm-js";

import { CategoryTypes } from "./comments.write.types";

let categoryList = [
  { name: "카테고리 선택", value: "" },
  { name: "버그 신고", value: "bug" },
  { name: "문의", value: "question" },
  { name: "리뷰", value: "review" },
];

// 댓글 내용 저장
const info: { [key: string]: string | number } = {
  password: "",
  contents: "",
  rating: 0,
};

export default function CommentsWritePage() {
  // 카테고리 선택
  const [category, setCategory] = useState<CategoryTypes>("");
  // 카테고리 ref
  const categoryRef = useRef() as MutableRefObject<HTMLSelectElement>;
  // contents ref
  const contentsRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  // password ref
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  // const [info, setInfo] = useState({ password: "", contents: "", rating: 0 });

  // 카테고리 변경하기
  const selectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!category) categoryList = categoryList.slice(1);

    if (value === "bug" || value === "review" || value === "question")
      setCategory(value);
  };

  // 정보 변경하기
  const changeInfo =
    (value: string | number) => (name: "contents" | "password" | "rating") => {
      if (info[name] !== undefined) {
        info[name] = value;
      }

      if (name === "password") {
        // 첫 문자열이 빈 문자열을 입력할 경우
        if (!String(info[name]).length) {
          // input 빈칸으로 만들기
          if (passwordRef.current) passwordRef.current.value = "";
        }
      }
    };

  // 댓글 작성하기
  const write = () => {
    let errorMessage; // 모달에 출력할 에러메세지
    const errorEvent = {
      contents: contentsRef.current.focus,
      password: passwordRef.current.focus,
    };
    let errorType = "";

    if (!category) {
      // 카테고리를 선택하지 않은 경우
      errorMessage = "카테고리를 선택해주세요.";
    } else {
      // 카테고리를 선택한 경우
      if (!info.contents) {
        // 댓글 내용을 입력하지 않은 경우
        errorMessage = "댓글 내용을 작성해주세요.";
        errorType = "contents";

        // if (contentsRef.current) afterEvent = ;
      } else if (!info.password) {
        // 비밀번호를 입력하지 않은 경우
        errorMessage = "비밀번호를 입력해주세요.";
        errorType = "password";

        // if (passwordRef.current) afterEvent = passwordRef.current.focus;
      } else if (category === "review") {
        if (!info.rating) {
          errorMessage = "평점을 선택해주세요.";
        }
      }
    }

    const afterEvent = () => {
      if (errorType === "contents") contentsRef.current.focus();
      else if (errorType === "password") passwordRef.current.focus();
    };

    if (errorMessage) {
      Modal.open({
        children: ErrorModalForm({
          errorMessage,
          errorEvent: afterEvent,
        }),
        showBGAnimation: true,
        showModalOpenAnimation: true,
        modalSize: { height: "200px" },
        className: "error-modal",
        onAfterCloseEvent: afterEvent,
      });
    }
  };

  return (
    <CommentsWriteUIPage
      category={category}
      selectCategory={selectCategory}
      categoryList={categoryList}
      changeInfo={changeInfo}
      write={write}
      categoryRef={categoryRef}
      contentsRef={contentsRef}
      passwordRef={passwordRef}
    />
  );
}

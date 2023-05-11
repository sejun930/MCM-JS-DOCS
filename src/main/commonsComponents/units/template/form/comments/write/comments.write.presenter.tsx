import { ChangeEvent, MutableRefObject } from "react";
import styled from "@emotion/styled";

import { _Input, _SpanText } from "mcm-js-commons";
import { CategoryTypes } from "./comments.write.types";

export default function CommentsWriteUIPage({
  category,
  selectCategory,
  categoryList,
  changeInfo,
  write,
  categoryRef,
  contentsRef,
  passwordRef,
}: {
  category: CategoryTypes;
  selectCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  categoryList: Array<{ name: string; value: string }>;
  changeInfo: (value: string) => (name: "contents" | "password") => void;
  write: () => void;
  categoryRef: MutableRefObject<HTMLSelectElement>;
  contentsRef: MutableRefObject<HTMLTextAreaElement>;
  passwordRef: MutableRefObject<HTMLInputElement>;
}) {
  return (
    <Form>
      <fieldset>
        <legend>댓글 작성</legend>
      </fieldset>
      <WriteWrapper>
        <OptionWrapper>
          <SelectCategory
            onChange={selectCategory}
            category={category}
            defaultValue={""}
            ref={categoryRef}
          >
            {categoryList.map((category) => (
              <option
                key={`comment-category-${category.value}`}
                value={category.value}
                disabled={!category.value}
              >
                - {category.name}
              </option>
            ))}
          </SelectCategory>

          {category === "review" && (
            <OptionItems className="rating-wrapper">평점</OptionItems>
          )}
          <OptionItems>
            <_Input
              onChangeEvent={(value) => changeInfo(value)("password")}
              className="password-input"
              inputType="password"
              placeHolder="비밀번호 입력"
              inputRef={passwordRef}
            />
          </OptionItems>
        </OptionWrapper>

        <_Input
          onChangeEvent={(value) => changeInfo(value)("contents")}
          className="contents-input"
          isTextArea
          onSubmitEvent={write}
          inputRef={contentsRef}
          maxLength={300}
        />
      </WriteWrapper>
      {/* <OptionWrapper>
        <OptionItems>
          <_SpanText>비밀번호 </_SpanText>
          <_Input
            inputType="password"
            maxLength={10}
          />
        </OptionItems>
      </OptionWrapper> */}
    </Form>
  );
}

interface StyleTypes {
  category?: CategoryTypes;
}

export const Form = styled.form`
  margin-top: 20px;
  fieldset {
    display: none;
  }
`;

export const WriteWrapper = styled.article`
  display: flex;
  border: double 6px black;

  .mcm-input-unit-wrapper {
    width: 100%;

    .mcm-input-unit-items {
      border: unset;

      .contents-input {
        min-height: 180px;
        max-height: 300px;
        padding: 10px;
        font-size: 16px;
      }
    }
  }
`;

export const SelectCategory = styled.select`
  font-weight: 700;
  width: 100%;
  /* min-height: 60%; */
  height: 100%;
  cursor: pointer;
  border: unset;
  font-size: 16px;

  ${(props: StyleTypes) =>
    !props.category && {
      color: "#777777",
      fontWeight: "400",
    }}

  option {
    text-align-last: center;
    cursor: pointer;
    font-size: 14px;
  }
`;

export const OptionWrapper = styled.div`
  min-width: 160px;
  max-width: 160px;
  display: flex;
  flex-direction: column;
  border-right: solid 2px black;

  @keyframes TOGGLE_RATING_WRAPPER {
    from {
      min-height: 0px;
    }
    to {
      min-height: 40px;
    }
  }

  .rating-wrapper {
    animation: TOGGLE_RATING_WRAPPER 0.2s;
  }
  /* border: solid 1px black; */
`;

export const OptionItems = styled.div`
  display: flex;
  align-items: center;
  border-top: dotted 1px black;
  min-height: 40px;

  /* padding: 8px; */

  .mcm-input-unit-wrapper {
    height: 100%;
    .mcm-input-unit-items {
      border: unset;

      .password-input {
        /* border-top: solid 1px black; */
        font-size: 14px;
        height: 100%;
      }
    }
  }
`;

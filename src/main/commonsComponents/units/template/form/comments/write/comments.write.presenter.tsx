import { ChangeEvent, MutableRefObject } from "react";
import { CSSProperties } from "styled-components";
import styled from "@emotion/styled";

import { _Input, _SpanText } from "mcm-js-commons";
import { CategoryTypes } from "./comments.write.types";
import StarsForm from "./stars";

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
  changeInfo: (
    value: string | number
  ) => (name: "contents" | "password" | "rating") => void;
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

          <OptionItems
            className="rating-wrapper"
            isRating={true}
            show={category === "review"}
          >
            <StarsForm
              changeEvent={(rating: number) => {
                changeInfo(rating)("rating");
              }}
              category={category}
            />
          </OptionItems>
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
  isRating?: boolean;
  show?: boolean;
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
        padding: 15px;
        padding-top: 20px;
        font-size: 16px;
      }
    }
  }
`;

export const SelectCategory = styled.select`
  font-weight: 700;
  width: 100%;
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
`;

export const OptionItems = styled.div`
  display: flex;
  align-items: center;
  border-top: dotted 1px black;
  min-height: 40px;
  overflow: hidden;

  ${(props: StyleTypes) => {
    const styles: { [key: string]: string } & CSSProperties = {};

    if (props.isRating) {
      styles.transition = "all 0.3s";
      styles.minHeight = "0px";
      styles.maxHeight = "0px";
    }

    if (props.show) {
      styles.minHeight = "40px";
      styles.maxHeight = "40px";
    }

    return styles;
  }}

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

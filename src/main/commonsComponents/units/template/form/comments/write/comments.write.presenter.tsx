import {
  Form,
  OptionItems,
  OptionWrapper,
  SelectCategory,
  WriteWrapper,
} from "./comments.write.styles";
import { FormEvent, MutableRefObject } from "react";

import { _Input, _SpanText } from "mcm-js-commons";
import { InfoTypes } from "./comments.write.types";
import StarsForm from "./stars";

export default function CommentsWriteUIPage({
  categoryList,
  changeInfo,
  info,
  write,
  categoryRef,
  contentsRef,
  passwordRef,
}: {
  categoryList: Array<{ name: string; value: string }>;
  changeInfo: (value: string | number) => (name: string) => void;
  info: InfoTypes;
  write: (e?: FormEvent<Element>) => void;
  categoryRef: MutableRefObject<HTMLSelectElement>;
  contentsRef: MutableRefObject<HTMLTextAreaElement>;
  passwordRef: MutableRefObject<HTMLInputElement>;
}) {
  return (
    <Form onSubmit={write}>
      <fieldset>
        <legend>댓글 작성</legend>
      </fieldset>
      <WriteWrapper>
        <OptionWrapper>
          <SelectCategory
            onChange={(e) => changeInfo(String(e.target.value))("category")}
            category={info.category}
            value={info.category}
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
            show={info.category === "review"}
          >
            <StarsForm
              rating={info.rating}
              changeEvent={(rating: number) => {
                changeInfo(rating)("rating");
              }}
              category={info.category}
            />
          </OptionItems>
          <OptionItems>
            <_Input
              onChangeEvent={(value) => changeInfo(value)("password")}
              className="password-input"
              inputType="password"
              placeHolder="비밀번호 입력"
              inputRef={passwordRef}
              value={info.password}
              delay={200}
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
          delay={200}
          value={info.contents}
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

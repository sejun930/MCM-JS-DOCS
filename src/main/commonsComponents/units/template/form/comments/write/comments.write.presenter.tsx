import {
  Form,
  OptionItems,
  OptionWrapper,
  SelectCategory,
  WriteWrapper,
} from "./comments.write.styles";
import { FormEvent, MutableRefObject } from "react";

import { _Input, _SpanText } from "mcm-js-commons";
import { WriteInfoTypes } from "./comments.write.types";
import StarsForm from "./stars";

const placeList: { [key: string]: string } = {
  bug: `모듈 사용시 발생하는 버그 이슈등을 자세하게 알려주세요.
빠른 시간내에 확인 후 처리해드리겠습니다.
`,
  question: `모듈에 대한 사용법 및 궁금한 점을 문의해주세요.
빠른 시간내에 확인 후 답변해드리겠습니다.  
`,
  review: `모듈을 사용한 후기를 솔직하게 입력해주세요.
솔직한 평가가 저에겐 큰 도움이 됩니다.  
`,
};
const defaultPlace =
  "욕설 및 비방을 목적으로 하는 댓글은 예고없이 삭제 및 차단될 수 있습니다.";

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
  info: WriteInfoTypes;
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
              inputClassName="password-input"
              inputType="password"
              placeHolder="비밀번호 입력"
              inputRef={passwordRef}
              value={info.password}
              delay={200}
              maxLength={20}
            />
          </OptionItems>
        </OptionWrapper>

        <_Input
          onChangeEvent={(value) => changeInfo(value)("contents")}
          inputClassName="contents-input"
          isTextArea
          onSubmitEvent={write}
          inputRef={contentsRef}
          maxLength={500}
          delay={200}
          value={info.contents}
          placeHolder={`${
            placeList[info.category] || "카테고리를 먼저 선택해주세요."
          }
${info.category && defaultPlace}`}
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

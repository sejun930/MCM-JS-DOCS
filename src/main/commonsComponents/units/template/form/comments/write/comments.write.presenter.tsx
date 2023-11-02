import {
  Form,
  OptionItems,
  OptionWrapper,
  SelectCategory,
  WriteWrapper,
  SubmitWrapper,
  WriteButton,
} from "./comments.write.styles";

import { _Input } from "mcm-js-commons";
import { IPropsTypes } from "./comments.write.types";

import StarsForm from "./stars";
import PrivacyPage from "./privacy";
import IsBlockPage from "./isBlock";

const placeList: { [key: string]: string } = {
  bug: `모듈 사용시 발생하는 버그 이슈등을 자세하게 알려주세요.
빠른 시간내에 확인 후 처리해드리겠습니다.

주의 : 이슈 확인 및 해결된 댓글은 수정이 불가능합니다.
`,
  question: `모듈에 대한 사용법 및 궁금한 점을 문의해주세요.
빠른 시간내에 확인 후 답변해드리겠습니다.

주의 : 답변이 등록된 댓글은 수정이 불가능합니다.
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
  input,
  write,
  categoryRef,
  contentsRef,
  passwordRef,
  openPrivacy,
  checkWriteAble,
  blockInfo,
}: IPropsTypes) {
  return (
    <Form onSubmit={write}>
      {(blockInfo.ip && <IsBlockPage blockInfo={blockInfo} />) || (
        <>
          <fieldset>
            <legend>댓글 작성</legend>
          </fieldset>
          <WriteWrapper className="comments-write-wrapper">
            <OptionWrapper className="comments-write-option-wrapper">
              <SelectCategory
                onChange={(e) => changeInfo(String(e.target.value))("category")}
                category={input.category}
                value={input.category}
                ref={categoryRef}
              >
                {categoryList.map((category) => {
                  const [value, name] = Object.entries(category)[0];
                  return (
                    <option
                      key={`comment-category-${name}-${value}`}
                      value={value}
                      disabled={value === "all"}
                    >
                      - {name}
                    </option>
                  );
                })}
              </SelectCategory>

              <OptionItems
                className="rating-wrapper"
                isRating={true}
                show={input.category === "review" || input.category === "bug"}
              >
                {(input.category === "review" || input.category === "bug") && (
                  <StarsForm
                    rating={
                      input.category === "bug" ? input.bugLevel : input.rating
                    }
                    changeEvent={(value: number) => {
                      changeInfo(value)(
                        input.category === "bug" ? "bugLevel" : "rating"
                      );
                    }}
                    category={input.category}
                    isBugMode={input.category === "bug"}
                  />
                )}
              </OptionItems>

              <OptionItems className="comments-password-wrapper">
                <_Input
                  onChangeEvent={(value) => changeInfo(value)("password")}
                  inputClassName="password-input"
                  inputType="password"
                  placeHolder="비밀번호 입력"
                  inputRef={passwordRef}
                  value={input.password}
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
              value={input.contents}
              placeHolder={`${
                placeList[input.category] ||
                `카테고리를 먼저 선택해주세요.
            `
              }
${input.category && defaultPlace}`}
            />
          </WriteWrapper>
          <SubmitWrapper className="comments-submit-wrapper">
            {/* 개인정보 수집 동의 */}
            <PrivacyPage
              changeInfo={changeInfo}
              info={input}
              openPrivacy={openPrivacy}
            />
            <WriteButton
              onClickEvent={write}
              className="write-comments-button"
              isAble={checkWriteAble().able}
            >
              📝 댓글 등록
            </WriteButton>
          </SubmitWrapper>
        </>
      )}
    </Form>
  );
}

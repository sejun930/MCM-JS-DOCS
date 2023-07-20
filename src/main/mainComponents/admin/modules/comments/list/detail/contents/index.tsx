import {
  Contents,
  ContentsBtn,
  ContentsItems,
  ContentsWrapper,
  OptionWrapper,
  OptionList,
  OptionBtn,
} from "./admin.comments.contents.styles";
import { MouseEvent, MutableRefObject, useRef } from "react";
import { Tooltip } from "mcm-js";

import { _Input, _SpanText, _Button } from "mcm-js-commons";
import {
  CommentsAllInfoTypes,
  InfoTypes,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { AdminCommentsInitType } from "../../../admin.comments.types";
import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

import { getServerTime, getDoc } from "src/commons/libraries/firebase";
import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import { getDateForm } from "src/main/commonsComponents/functional";

import { AdminBugStatusSelectList } from "src/main/commonsComponents/units/template/form/comments/list/contents/select/functional/contents.select.functional.data";

export default function AdminCommentsContentsPage({
  info,
  changeLoading,
  commentsInfo,
  updateFilterCount,
}: {
  info: InfoTypes;
  changeLoading: (bool: boolean) => void;
  commentsInfo: CommentsAllInfoTypes & AdminCommentsInitType;
  updateFilterCount: (info: InfoTypes) => Promise<boolean>;
}) {
  let answer = "";
  let bugStatus = info.bugStatus || 0;
  // 기존의 답변 저장
  if (info.answer) answer = info.answer.split("<br />").join("\n");

  const contentsRef = useRef() as MutableRefObject<HTMLParagraphElement>;
  const textRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  // 내용 더보기 토글 함수
  const toggleMoreShow = () => {
    const ref = contentsRef.current;

    if (ref && ref.classList) {
      if (ref.classList.contains("open")) {
        // 더보기 닫기
        ref.classList.remove("open");
      } else {
        // 더보기 설정
        ref.classList.add("open");
      }
    }
  };

  // 답변 수정하기
  const changeAnswer = async () => {
    // 관리자 로그인 체크
    checkAccessToken(true);

    if (!answer.trim()) {
      // 답변이 비어있을 경우
      alert("답변을 입력해주세요.");
      if (textRef && textRef.current) textRef.current.focus();
    } else {
      changeLoading(true);
      const _info: WriteInfoTypes = { ...(info as WriteInfoTypes) };
      _info.answer = answer;
      _info.answerCreatedAt = getServerTime();

      // 답변 업데이트
      try {
        console.log(_info);
        await getDoc("comments", commentsInfo.selectModule, "comment")
          .doc(_info.id)
          .update(_info);

        try {
          // 개수 업데이트 후 최종 종료
          if (await updateFilterCount(_info as InfoTypes)) {
            changeLoading(false);
            alert("답변이 업데이트 되었습니다.");
          }
        } catch (err2) {
          alert("댓글 개수 업데이트에 실패했습니다.");
          console.log(err2);
        }
      } catch (err) {
        alert("답변 등록에 실패했습니다.");
        console.log(err);
      }
    }
  };

  const renderOptionList = () => {
    const getOptionList = () => {
      // 이슈일 때만 선택지 렌더
      if (info.category === "bug") {
        // 버그 레벨 선택하기
        const selectBugLevel =
          (num: number) => (e?: MouseEvent<HTMLButtonElement>) => {
            if (num > info.bugStatus && num !== info.bugStatus) {
              bugStatus = num;

              if (e?.currentTarget) {
                // 모든 선택 제거
                const target = e?.currentTarget;
                // 선택 여부 확인
                const selectList =
                  target.parentElement?.getElementsByClassName("select");

                // 선택 제거
                if (selectList && selectList.length) {
                  Array.from(selectList).forEach((node) =>
                    node.classList.remove("select")
                  );
                }

                // 선택 체크
                target.classList.add("select");
              }
            }
          };

        return AdminBugStatusSelectList.map((el, level) => {
          let className = "option-btn";

          // 이미 선택되어 있는지
          if (bugStatus === level) className += " select";
          // 선택할 수 없는지
          else if (bugStatus > level) className += " disable";

          return (
            <OptionBtn
              key={`admin-comments-optional-button-${info.id}-${el.name}-${level}`}
              onClickEvent={(e?: MouseEvent<HTMLButtonElement>) =>
                selectBugLevel(level)(e)
              }
              buttonType="button"
              className={className}
            >
              {el.name}
            </OptionBtn>
          );
        });
      } else {
        return <></>;
      }
    };

    return <OptionList>{getOptionList()}</OptionList>;
  };

  return (
    <ContentsWrapper>
      <ContentsItems>
        <ContentsBtn onClickEvent={toggleMoreShow}>
          <Contents
            className="contents"
            dangerouslySetInnerHTML={info.contents}
            _ref={contentsRef}
          />
        </ContentsBtn>
        <_Input
          className="answer-teatarea-wrapper"
          inputClassName="answer-textarea"
          onChangeEvent={(text: string) => (answer = text)}
          onSubmitEvent={changeAnswer}
          isTextArea
          placeHolder="답변 입력"
          value={answer}
          inputRef={textRef}
        />
      </ContentsItems>
      <OptionWrapper>
        {renderOptionList()}
        {info.answerCreatedAt && (
          <Tooltip tooltipText="답변 작성일" useShowAnimation>
            <_SpanText className="answer-date">
              {getDateForm({
                firebaseTimer: info.answerCreatedAt,
                getDate: true,
              })}
            </_SpanText>
          </Tooltip>
        )}
      </OptionWrapper>
    </ContentsWrapper>
  );
}

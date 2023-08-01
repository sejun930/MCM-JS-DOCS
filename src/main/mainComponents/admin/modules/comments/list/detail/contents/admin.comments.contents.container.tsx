import { OptionList, OptionBtn } from "./admin.comments.contents.styles";
import { MouseEvent, MutableRefObject, useRef } from "react";
import AdminCommentsContentsUIPage from "./admin.comments.contents.presenter";

import { _Input, _SpanText, _Button } from "mcm-js-commons";
import {
  CommentsAllInfoTypes,
  InfoTypes,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { AdminCommentsInitType } from "../../../admin.comments.types";
import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import { changeClientText } from "src/main/commonsComponents/functional";

import { AdminBugStatusSelectList } from "src/main/commonsComponents/units/template/form/comments/list/contents/select/functional/contents.select.functional.data";
import commentsApis from "src/commons/libraries/apis/comments/comments.apis";

export default function AdminCommentsContentsPage({
  info,
  changeLoading,
  commentsInfo,
  fetchComments,
  isAlreadyDeleted,
}: {
  info: InfoTypes;
  changeLoading: (bool: boolean) => void;
  commentsInfo: CommentsAllInfoTypes & AdminCommentsInitType;
  fetchComments: (info?: AdminCommentsInitType) => void;
  isAlreadyDeleted: boolean;
}) {
  let answer = "";
  let bugStatus = info.bugStatus || 0;
  // 기존의 답변 저장
  if (info.answer) answer = changeClientText(info.answer);

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
    if (!checkAccessToken(true)) return;
    if (isAlreadyDeleted)
      return alert("삭제된 댓글에는 답변을 등록할 수 없습니다.");

    const _info: WriteInfoTypes = { ...(info as WriteInfoTypes) };
    _info.answer = answer;
    _info.bugStatus = bugStatus;

    changeLoading(true);

    // 답변 업데이트
    try {
      const updateResult = await (
        await commentsApis({
          module: commentsInfo.selectModule,
          input: _info,
          isAdmin: true,
        })
      ).modifyComments({
        password: "",
        originInput: info as WriteInfoTypes,
        changeInput: _info,
        updateCategory: true,
      });

      if (updateResult.msg) {
        // 업데이트에 실패할 경우
        alert(updateResult.msg);
        if (updateResult.msg === "답변을 입력해주세요.")
          textRef.current.focus();
      } else {
        // 업데이트에 성공한 경우
        fetchComments(commentsInfo);
        alert("답변이 업데이트 되었습니다.");
      }
    } catch (err) {
      console.log(err);
      alert("답변 업데이트에 실패했습니다.");
    }

    changeLoading(false);
  };

  const renderOptionList = () => {
    let _AdminBugStatusSelectList = [...AdminBugStatusSelectList].slice(
      info.bugStatus
    );
    if (isAlreadyDeleted)
      _AdminBugStatusSelectList = _AdminBugStatusSelectList.slice(
        info.bugStatus,
        info.bugStatus + 1
      );

    const getOptionList = () => {
      // 이슈일 때만 선택지 렌더
      if (info.category === "bug") {
        // 버그 레벨 선택하기
        const selectBugLevel =
          (num: number) => (e?: MouseEvent<HTMLButtonElement>) => {
            // if (num > info.bugStatus && num !== info.bugStatus) {
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
          };

        return _AdminBugStatusSelectList.map((el, level) => {
          level += info.bugStatus;
          let className = "option-btn";

          if (!isAlreadyDeleted) {
            // 이미 선택되어 있는지
            if (bugStatus === level) className += " select";
            // 선택할 수 없는지
            else if (bugStatus > level) className += " disable";
          } else className += " select";

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

  // 답변 내용 변경하기
  const saveAnswer = (text: string) => {
    answer = text;
  };

  return (
    <AdminCommentsContentsUIPage
      info={info}
      toggleMoreShow={toggleMoreShow}
      contentsRef={contentsRef}
      changeAnswer={changeAnswer}
      saveAnswer={saveAnswer}
      textRef={textRef}
      isAlreadyDeleted={isAlreadyDeleted}
      renderOptionList={renderOptionList}
      answer={answer}
    />
  );
}

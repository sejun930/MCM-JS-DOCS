import ContentsSelectFunctionalUIPage from "./contents.select.functional.presenter";
import { Message } from "./contents.select.functional.styles";

import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { Modal } from "mcm-js";
import { _SpanText } from "mcm-js-commons";

import { WriteInfoTypes } from "../../../../write/comments.write.types";
import { CommentsAllInfoTypes, InfoTypes } from "../../../../comments.types";
import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import { changeServerText } from "src/main/commonsComponents/functional";

import blockApis from "src/commons/libraries/apis/block/block.apis";
import ModalResultForm from "../../../../../modal/modal.result";

import {
  ListContentsSelectType,
  ContentsSelectTypeName,
} from "../../list.data";
import commentsApis from "src/commons/libraries/apis/comments/comments.apis";
import { exchangeKey } from "./contents.select.functional.data";

let password = ""; // 패스워드 저장
let _contents = ""; // 댓글 내용 저장
let rating = 0; // 평점 내용 저장
let bugLevel = 0; // 버그 중요도 저장

let disableOpenModal = false; // 모달 중복 실행 방지
let updating = false; // 업데이트 진행중 여부 (중복 클릭 방지)

export default function ContentsSelectFunctionalPage({
  info,
  type,
  adminLogin,
  module,
  fetchCommentsList,
}: {
  info: InfoTypes;
  type: ListContentsSelectType;
  adminLogin: boolean | null;
  module: string;
  fetchCommentsList: (info?: CommentsAllInfoTypes) => void;
}) {
  let answer = info.answer || ""; // 답변 내용 저장
  // 이슈 단계도 (0 : 확인 전, 1 : 확인 및 처리 중, 2 : 수정 완료)
  const [bugStatus, setBugStatus] = useState<number>(info.bugStatus || 0);
  // 중복 클릭 방지
  const [waiting, setWaiting] = useState(false);

  const confirmRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const contentsRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const answerRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  useEffect(() => {
    // 관리자일 경우 비밀번호 자동 저장
    if (adminLogin) password = info.password;
  }, [adminLogin]);

  useEffect(() => {
    // 데이터 최초 저장
    _contents = info.contents;
    rating = info.rating;
    bugLevel = info.bugLevel;
    updating = false;
  }, []);

  // 수정 및 삭제 가능 여부 반환
  const checkAble = () => {
    // 관리자라면 무조건 가능
    if (!adminLogin) {
      if (!_contents) return exchangeKey.emptyContents;
      // 비밀번호가 빈칸일 경우
      if (!password) return exchangeKey.emptyPassword;
    } else {
      if (info.category !== "bug" && type === "question") {
        // 문의 및 리뷰의 답변 카테고리일 경우
        if (!answer) return exchangeKey.emptyAnswer;
      }
    }
    return "";
  };

  // 데이터 변경하기
  const changeData = (
    value: string | number,
    type: "contents" | "password" | "rating" | "bugLevel" | "answer"
  ) => {
    if (type === "password") password = String(value);
    else if (type === "contents") _contents = String(value);
    else if (type === "rating") rating = Number(value);
    else if (type === "bugLevel") bugLevel = Number(value);
    else if (type === "answer") answer = String(value);

    // 버튼 비활성화 여부 체크하기
    if (confirmRef.current) {
      confirmRef.current.classList.remove("able");
      if (!checkAble()) {
        // 빈 문자열 (에러메세지가 없을 경우)에는 등록 가능
        confirmRef.current.classList.add("able");
      }
    }
  };

  // 모달 오픈하기
  const openModal = ({
    text,
    isSuccess,
    afterCloseEvent,
  }: {
    text: string;
    isSuccess?: boolean;
    afterCloseEvent?: () => void;
  }) => {
    if (disableOpenModal) return;
    disableOpenModal = true;

    const _afterCloseEvent = () => {
      disableOpenModal = false;

      if (afterCloseEvent) {
        afterCloseEvent();
        setWaiting(false);
      } else {
        if (text === "댓글 내용을 입력해주세요.") {
          if (contentsRef.current) contentsRef.current.focus();
        } else if (
          text === "비밀번호를 입력해주세요." ||
          text === "비밀번호가 일치하지 않습니다."
        ) {
          if (passwordRef.current) passwordRef.current.focus();
        } else if (text === "답변을 입력해주세요.") {
          if (answerRef.current) answerRef.current.focus();
        }
      }
    };

    Modal.open({
      children: (
        <ModalResultForm
          children={
            <Message isSuccess={isSuccess}>
              <_SpanText className="message">
                <b>{isSuccess ? "✔" : "❗"}</b> {text}
              </_SpanText>
            </Message>
          }
        />
      ),
      showBGAnimation: true,
      showModalOpenAnimation: true,
      modalSize: { width: "300px", height: "60px" },
      modalStyles: {
        items: {
          border: `double 5px #${isSuccess ? "19a7ce" : "aa5656"}`,
        },
      },
      mobileModalSize: {
        width: "100%",
        height: "10%",
      },
      onCloseModal: _afterCloseEvent,
      offAutoClose: false,
    });
  };

  // 삭제 및 수정
  const confirm = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (waiting || updating) return;
    updating = true;

    const typeName = ContentsSelectTypeName[type][0];
    let failMsg = ""; // 실패 메세지

    // 버튼이 비활성화일 경우
    if (checkAble()) {
      openModal({
        text: checkAble(), // 에러메세지 출력
      });
    } else {
      if (adminLogin) {
        if (type === "block" || type === "question") {
          // 차단 및 답변일 경우, 현재 로그인이 유지되어 있는 상태인지 검증
          if (!checkAccessToken(true)) return false;
        }
      }

      const commentApi = await commentsApis({
        input: info as WriteInfoTypes,
        module,
        isAdmin: adminLogin || false,
      });

      // 삭제 및 차단일 경우 댓글 1차 삭제
      if (typeName === "삭제" || typeName === "차단") {
        // 기존에 있던 데이터에 업데이트
        const { msg } = await commentApi.removeComments({
          password,
          updateCategory: true,
        });

        // 해당 유저 차단
        if (typeName === "차단") {
          try {
            const { ip, contents, category, id } = info;
            await blockApis().block({
              ip,
              contents,
              category,
              module,
              commentId: id,
            });
          } catch (blockErr) {
            console.log(blockErr);
          }
        }

        // 실패 메세지 저장
        failMsg = msg;

        // 수정 및 답변일 경우
      } else if (typeName === "수정" || typeName === "답변") {
        const changeInput = {
          ...info,
          ["contents"]: changeServerText(_contents), // 댓글 내용 수정
          rating,
          bugLevel,
        } as WriteInfoTypes;
        // 새로운 답변이 등록될 경우
        if (typeName === "답변") {
          if (answer) {
            changeInput.answer = answer;
          }
          changeInput.bugStatus = bugStatus;
        }

        const { msg } = await commentApi.modifyComments({
          password,
          originInput: info as WriteInfoTypes,
          changeInput,
          updateCategory: true,
        });

        // 실패 메세지 저장
        failMsg = msg;
      }

      // 에러 메세지 출력
      if (failMsg) {
        openModal({
          text: failMsg,
          isSuccess: failMsg === "",
        });
      } else {
        // 삭제 & 수정 완료
        openModal({
          text: `${typeName} 완료되었습니다.`,
          isSuccess: true,
          afterCloseEvent: () => {
            Modal.close({ id: "comments-functional-modal" });
            // 댓글 리스트 최신화
            fetchCommentsList();
          },
        });
      }
    }
    updating = false;
  };

  // 이슈 처리 선택하기
  const changeBugStatus = (status: number) => {
    if (!checkAccessToken()) return;
    setBugStatus(status);
  };

  return (
    <ContentsSelectFunctionalUIPage
      type={type}
      info={info}
      changeData={changeData}
      passwordRef={passwordRef}
      contentsRef={contentsRef}
      confirmRef={confirmRef}
      confirm={confirm}
      adminLogin={adminLogin}
      changeBugStatus={changeBugStatus}
      bugStatus={bugStatus}
      answerRef={answerRef}
    />
  );
}

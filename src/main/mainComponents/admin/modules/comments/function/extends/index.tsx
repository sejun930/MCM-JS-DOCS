import { _Button } from "mcm-js-commons";
import { getDoc } from "src/commons/libraries/firebase";

import { FunctionPropsTypes } from "../../admin.comments.types";
import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

import apis from "src/commons/libraries/apis/commons.apis";
import { getRandomNumber } from "src/main/commonsComponents/functional";
import { randomContents } from "./data";

// 테스트용을 위한 임의의 댓글 게시물 생성하기
export default function ExtendsFunction(props: FunctionPropsTypes) {
  const { changeLoading, module, info, fetchComments, checkLoading } = props;

  // 댓글 확장하기
  const extendsComments = async () => {
    if (!checkLoading()) return;

    let num = Number(
      window.prompt(
        "몇개의 댓글을 생성하시겠습니까? \n(최대 30개까지 생성 가능)"
      ) || 0
    );
    if (!Number.isNaN(Number(num)) && num > 0) {
      try {
        changeLoading(true);

        const doc = getDoc("comments", module, "comment");
        await Promise.all(
          Array.from(new Array(num), () => 1).map(async (_) => {
            const input = {
              ip: "admin",
              password: "admin",
              agreeProvacy: true,
              answer: "",
              answerCreatedAt: null,
              deletedAt: null,
              modifyAt: null,
              bugStatus: 0,
              bugLevel: 0,
              rating: 0,
            } as WriteInfoTypes;
            // 댓글 내용 지정
            input.contents =
              randomContents[getRandomNumber(randomContents.length - 1, 0)];

            // 카테고리 랜덤 지정
            input.category = ["bug", "question", "review"][
              getRandomNumber(2, 0)
            ];

            if (input.category === "bug") {
              // 이슈일 경우 레벨 랜덤 설정
              input.bugLevel = getRandomNumber(5, 1);
            } else if (input.category === "review") {
              // 리뷰일 경우 평점 랜덤 설정
              input.rating = getRandomNumber(5, 1);
            }

            return await apis(doc).addComments(input, info.selectModule);
          })
        );
        alert(`${num}개의 댓글이 추가되었습니다.`);

        changeLoading(false);
        fetchComments(info);
      } catch (err) {
        alert("댓글 추가에 실패했습니다.");
        console.log(err);
      }
    } else {
      alert("0부터 30까지의 숫자만 기입해주세요.");
    }
  };

  return (
    <_Button onClickEvent={extendsComments} className="admin-function-btn">
      댓글 확장
    </_Button>
  );
}

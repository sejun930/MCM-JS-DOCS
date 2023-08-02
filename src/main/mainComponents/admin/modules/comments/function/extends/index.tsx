import { _Button } from "mcm-js-commons";

import { FunctionPropsTypes } from "../../admin.comments.types";
import {
  WriteInfoTypes,
  initInfo,
} from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

import commentsApis from "src/commons/libraries/apis/comments/comments.apis";
import {
  deepCopy,
  getRandomNumber,
  getUserIp,
} from "src/main/commonsComponents/functional";
import { randomContents } from "./data";
import countApis from "src/commons/libraries/apis/comments/count/count.apis";

// 테스트용을 위한 임의의 댓글 게시물 생성하기
export default function ExtendsFunction(props: FunctionPropsTypes) {
  const { changeLoading, module, info, fetchComments, checkLoading } = props;

  // 댓글 확장하기
  const extendsComments = async () => {
    if (!checkLoading()) return;

    const num = Number(
      window.prompt(
        "몇개의 댓글을 생성하시겠습니까? \n(최대 30개까지 생성 가능)"
      ) || 0
    );
    if (!Number.isNaN(Number(num)) && num > 0) {
      try {
        changeLoading(true);
        const ip = await getUserIp();

        // 전체 카테고리 초기값 객체
        const allCountList = await countApis({ module }).getAllCountList();

        const createComments = async (
          i: number,
          allCountList: { [key: string]: { [key: string]: string | number } }
        ): Promise<void | boolean> => {
          if (i === num) {
            return true;
          }

          // 새로운 댓글 생성하기
          const input: WriteInfoTypes = deepCopy(initInfo);

          input.ip = ip;
          input.password = "admin";
          input.agreeProvacy = true;

          // 댓글 내용 지정
          input.contents =
            randomContents[getRandomNumber(randomContents.length - 1, 0)];

          // 카테고리 랜덤 지정
          input.category = ["bug", "question", "review"][getRandomNumber(2, 0)];

          if (input.category === "bug") {
            // 이슈일 경우 레벨 랜덤 설정
            input.bugLevel = getRandomNumber(5, 1);
          } else if (input.category === "review") {
            // 리뷰일 경우 평점 랜덤 설정
            input.rating = getRandomNumber(5, 1);
          }

          // 댓글 등록하기
          (await commentsApis({ module, ip: input.ip })).addComments({ input });

          // 해당 카테고리에 맞는 카운트 객체 가져오기
          const currentList = allCountList[input.category];
          const { id, ...countList } = allCountList[input.category];
          const countListResult = { docId: currentList.id, countList };

          //   업데이트 된 리스트 가져오기
          const countAddResult = await countApis({ module }).add({
            input,
            // @ts-ignore
            countList: countListResult,
          });

          allCountList[countAddResult.countList.category] =
            countAddResult.countList;

          allCountList[countAddResult.countList.category].id =
            countAddResult.docId;

          return createComments(++i, allCountList);
        };
        return await createComments(0, allCountList)
          .then(async () => {
            // 카테고리 리스트 전체 업데이트
            await Promise.all(
              Object.values(allCountList).map(async (el) => {
                const { id, ...countList } = el;

                return await countApis({ module }).update(id, countList);
              })
            );

            alert(`${num}개의 댓글이 추가되었습니다.`);

            changeLoading(false);
            fetchComments({ info });
          })
          .catch((err) => {
            alert("동기화에 실패했습니다.");
            console.log(err);
          });
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

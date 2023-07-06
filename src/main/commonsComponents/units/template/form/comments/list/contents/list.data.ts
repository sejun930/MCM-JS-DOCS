import { InfoTypes } from "../../comments.types";

// 댓글에 대한 행동 가능한 타입 (수정 | 삭제 | 차단 | 답변)
export type ListContentsSelectType = "modify" | "delete" | "block" | "question";

interface TypeListContentsInfo {
  name: string;
  value: ListContentsSelectType;
}

// 유저와 관리자에게 렌더되는 선택지 가져오기
export const getListContentsInfo = (
  isAdmin: boolean,
  info: InfoTypes
): Array<TypeListContentsInfo> => {
  let result: Array<TypeListContentsInfo> = [
    { name: "수정", value: "modify" },
    { name: "삭제", value: "delete" },
  ];

  if (isAdmin) {
    result = [
      { name: "삭제", value: "delete" },
      { name: "답변", value: "question" },
      { name: "차단", value: "block" },
    ];

    if (info.category !== "bug" && info.category !== "question") {
      // 카테고리가 이슈 및 질문이 아니라면 답변 항목 삭제
      result.splice(1, 1);
    }
  } else {
    result = result.filter((el) => {
      if (el.name === "수정") {
        // 버그 이슈가 확인될 경우 수정 불가능
        if (info.category === "bug" && info.bugStatus !== 0) return false;
        // 이미 답변이 있을 경우에는 수정 불가능
        if (info.category === "question" && info.completeAnswer) return false;
        return true;
      }
      return true;
    });
  }

  return result;
};

export const ContentsSelectTypeName: { [key: string]: Array<string> } = {
  modify: ["수정", "위의 내용으로 댓글을 수정합니다."],
  delete: ["삭제", "위의 댓글을 삭제합니다."],
  block: ["차단", "해당 아이피를 차단합니다."],
  question: ["답변", "위의 내용으로 답변합니다."],
};

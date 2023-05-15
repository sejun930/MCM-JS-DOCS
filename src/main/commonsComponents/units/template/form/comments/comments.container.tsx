import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { moduleState } from "src/commons/store";
import _CommentsUIForm from "./comments.presenter";

import { db } from "src/commons/libraries/firebase";

interface CommentsTypes {
  contents: string;
  rating: number;
}

export default function _CommentsForm() {
  const [module] = useRecoilState(moduleState);
  const [commentsList, setCommentsList] = useState<
    Array<{ [key: number]: CommentsTypes }>
  >([]);

  useEffect(() => {
    if (module) {
      // 댓글 리스트 가져오기
      db.collection("comments")
        .doc(module)
        .collection("comment")
        .get()
        .then((result) => {
          if (result.size) {
            const datas: Array<CommentsTypes> = [];
            result.forEach((data) => {
              datas.push(data.data() as CommentsTypes);
            });
            console.log(datas);
          }
        })
        .catch((err) => {
          console.log(`댓글을 정상적으로 불러오지 못했습니다. : ${err}`);
        });
    }
  }, [module]);

  return <_CommentsUIForm module={module} />;
}

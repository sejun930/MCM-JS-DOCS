import { useEffect, useState } from "react";
import _CommentsUIForm from "./comments.presenter";

import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { firebaseApp } from "src/commons/libraries/firebase";

interface CommentsTypes {
  writer: string;
  rating: number;
}

export default function _CommentsForm() {
  const [commentsList, setCommentsList] = useState<
    Array<{ [key: number]: CommentsTypes }>
  >([]);

  useEffect(() => {
    // 댓글 리스트 가져오기
    getDocs(collection(getFirestore(firebaseApp), "comments"))
      .then((data) => {
        const datas = data.docs.map((el) => el.data());
        setCommentsList(datas);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(commentsList);

  return <_CommentsUIForm />;
}

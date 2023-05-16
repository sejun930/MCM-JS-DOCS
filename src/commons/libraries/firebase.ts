// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "mcm-js.firebaseapp.com",
  projectId: "mcm-js",
  storageBucket: "mcm-js.appspot.com",
  messagingSenderId: "526957034744",
  appId: process.env.NEXT_PUBLIC_FIREBASE_ID,
  measurementId: "G-B6KWZ1B1D8",
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(firebaseApp);
// export const analytics = getAnalytics(firebaseApp);

// 서버 타임 가져오기
export const getServerTime = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};

// doc 가져오기
export const getDoc = (
  parentCollection: string,
  parentDoc?: string,
  childrenCollection?: string
) => {
  let _doc: firebase.firestore.CollectionReference =
    db.collection(parentCollection);

  // 콜렉션 안에 있는 문서 출력
  // @ts-ignore
  if (parentDoc) _doc = _doc.doc(parentDoc);
  // 하위 문서 안에 있는 콜렉션 출력
  // @ts-ignore
  if (childrenCollection) _doc = _doc.collection(childrenCollection);

  return _doc;
};

// 결과 배열에 담기
export const getResult = (
  data: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  const result: Array<any> = [];

  data.forEach(
    (
      el: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    ) => {
      result.push(el.data());
    }
  );
  console.log(result);

  return result;
};

// 타입 리턴하기
export type FieldValue = firebase.firestore.FieldValue;
export type DocumentData = firebase.firestore.DocumentData;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type QuerySnapshot_DocumentData =
  firebase.firestore.QuerySnapshot<DocumentData>;

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

// 타입 리턴하기
export type FieldValue = firebase.firestore.FieldValue;
export type DocumentData = firebase.firestore.DocumentData;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type QuerySnapshot_DocumentData =
  firebase.firestore.QuerySnapshot<DocumentData>;
export type CollectionReference = firebase.firestore.CollectionReference;
export type CollectionReference_DocumentData =
  firebase.firestore.CollectionReference<DocumentData>;
export type DocumentReference_DocumentData =
  firebase.firestore.DocumentReference<DocumentData>;
export type Query_DocumentData = firebase.firestore.Query<DocumentData>;

// export const analytics = getAnalytics(firebaseApp);

// 서버 타임 가져오기
export const getServerTime = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};

// doc 가져오기
export const getDoc = (
  parentCollection: string,
  parentDoc: string,
  childrenCollection: string
) => {
  return db
    .collection(parentCollection)
    .doc(parentDoc)
    .collection(childrenCollection);

  // if (doc) {
  //   // 콜렉션 안에 있는 문서 출력
  //   // if (parentDoc) doc = doc.doc(parentDoc);
  //   // 하위 문서 안에 있는 콜렉션 출력
  //   // @ts-ignore
  //   // if (childrenCollection) doc = doc.collection(childrenCollection);
  // }
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

  return result;
};

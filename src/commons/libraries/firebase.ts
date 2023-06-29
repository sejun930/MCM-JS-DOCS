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

// 캐시 설정
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
  merge: true,
});

// 타입 리턴하기
export type FieldValue = firebase.firestore.FieldValue;
export type DocumentData = firebase.firestore.DocumentData;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type QuerySnapshotDocumentData =
  firebase.firestore.QuerySnapshot<DocumentData>;
export type CollectionReference = firebase.firestore.CollectionReference;
export type CollectionReferenceDocumentData =
  firebase.firestore.CollectionReference<DocumentData>;
export type DocumentReferenceDocumentData =
  firebase.firestore.DocumentReference<DocumentData>;
export type QueryDocumentData = firebase.firestore.Query<DocumentData>;
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type QueryDocumentSnapshotDocumentData =
  firebase.firestore.QueryDocumentSnapshot<DocumentData>;

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
      const data = { ...el.data() };
      data.id = el.id; // id 값 저장

      result.push(data);
    }
  );

  return result;
};

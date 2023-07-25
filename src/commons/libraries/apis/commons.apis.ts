import {
  QueryDocumentData,
  CollectionReferenceDocumentData,
} from "../firebase";

const apis = (doc: QueryDocumentData & CollectionReferenceDocumentData) => {
  return {
    // 데이터 조회
    read: async () => await doc.get(),
  };
};

export default apis;

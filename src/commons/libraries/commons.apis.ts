import {
  CollectionReference_DocumentData,
  DocumentReference_DocumentData,
  Query_DocumentData,
} from "./firebase";

const apis = (
  doc: Query_DocumentData
  //   type: "create" | "read" | "update" | "delete"
) => {
  // 병렬처리 (promise.all)를 위한 배열 처리
  const setPromiseAll = (data: Array<any>, type: "create" | "update") => {
    return data.map((el) => {
      if (type === "create") {
        return () => {
          new Promise((res) => {
            setTimeout(() => {
              alert(1);
              // res((doc as CollectionReference_DocumentData).add(el));
            }, 0);
          });
        };
      } else {
        return () => {};
      }
    });
  };

  return {
    create: (addData: Array<any>) => {
      if (addData.length) {
        const promiseList = setPromiseAll(addData, "create");

        Promise.all(setPromiseAll(addData, "create"))
          .then((result) => {
            console.log(result);
          })
          .catch((err) => console.log(err));

        console.log(setPromiseAll(addData, "create"));
      }
      // addData.forEach((el) => {
      //   (doc as CollectionReference_DocumentData).add(el);
      // });
    },
    read: async () => await doc.get(),
  };
};

export default apis;

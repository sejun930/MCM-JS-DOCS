import { getHashText } from "src/main/commonsComponents/functional";
import {
  CollectionReferenceDocumentData,
  getDoc,
  getResult,
} from "../../firebase";
import { adminLoginInfoData } from "src/main/mainComponents/admin/login/admin.login.data";
import apis from "../commons.apis";

// 관리자 관련 apis
const adminApis = () => {
  let doc = getDoc("admin", "login", "access");

  return {
    login: async (id: string, password: string) => {
      id = await getHashText(id); // id 해쉬화
      password = await getHashText(password); // password 해쉬화

      // 현재 요일 조회
      const days = new Date().getDay();

      // 개발 환경과 배포 환경 구분하기
      const _ENV = process.env.NODE_ENV;

      if (_ENV === "development") {
        // 개발 환경일 경우 : env 파일에서 조회
        const loginInfoList = adminLoginInfoData[days];

        // 아이디 비밀번호가 함께 일치하는지 검증
        return id === loginInfoList.id && password === loginInfoList.password;

        // 배포 환경일 경우 : 서버에서 검증
      } else if (_ENV === "production") {
        // 현재 요일에 해당하는 아이디 및 비밀번호 정보 가져오기
        doc = doc.where(
          "_d",
          "==",
          await getHashText(String(days))
        ) as CollectionReferenceDocumentData;

        const getAceessInfo: Array<{
          id: string;
          _id: string;
          password: string;
          _d: string;
        }> = getResult(await apis(doc).read());

        if (getAceessInfo.length && getAceessInfo[0]._d) {
          // 아이디 비밀번호가 함께 일치하는지 검증
          return (
            id === getAceessInfo[0]._id &&
            password === getAceessInfo[0].password
          );
        }
      }
      return false; // 로그인 실패
    },
  };
};

export default adminApis;

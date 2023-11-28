import { getHashText } from "src/main/commonsComponents/functional";
import {
  CollectionReferenceDocumentData,
  getDoc,
  getResult,
} from "../../firebase";
import { getUserIp } from "src/main/commonsComponents/functional";

import { AdminLoginTypes } from "src/commons/store/store.types";
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

    // 로그인 검증
    check: async (reload: boolean): Promise<AdminLoginTypes> => {
      let result: AdminLoginTypes = { login: false, isTest: false };
      // 부정 로그인시 기입 정보 모두 제거
      const removeLocalStorage = (
        log: string,
        reload?: boolean
      ): AdminLoginTypes => {
        localStorage.removeItem("admin-accessToken");
        localStorage.removeItem("login-date");
        localStorage.removeItem("admin-test-login");

        console.log(log);
        if (reload) {
          alert("재로그인이 필요합니다.");
          location.reload();
        }

        return result;
      };

      // 로그인 accessToken 가져오기
      let loginAccessToken: string | null =
        localStorage.getItem("admin-accessToken");
      // 로그인 시간 가져오기
      let loginDate: Date | string | null | number =
        localStorage.getItem("login-date");

      if (!loginAccessToken && !loginDate)
        return removeLocalStorage("비로그인 상태입니다.", reload);

      // 둘 중 하나라도 없는 경우 = 비로그인 상태
      if (!loginAccessToken || !loginDate)
        return removeLocalStorage(
          "비정상적인 로그인이 감지되었습니다. (정보 없음)",
          reload
        );

      loginAccessToken = JSON.parse(loginAccessToken);

      if (loginDate) {
        // 로그인한 시간대가 존재하는 경우
        // 시간이 변경되었는지를 검증한다.
        if ((await getHashText(loginDate)) !== loginAccessToken)
          // 일치하지 않는 경우 (= 로그인 시간이 사용자가 임의로 강제 변경한 경우)
          return removeLocalStorage(
            "로그인 시간이 일치하지 않아 비로그인 되었습니다.",
            reload
          );

        // 로그인 시간이 경과하는지 체크한다. (로그인으로부터 1시간까지만 사용 가능)
        loginDate = new Date(JSON.parse(loginDate));
        // 로그인 시간으로부터 1시간 경과된 시간
        let limit = new Date(loginDate.setHours(loginDate.getHours() + 1));
        // 현재 시간
        const now = Number(new Date());

        // 1시간이 경과했을 경우
        if (Number(limit) - now < 0)
          return removeLocalStorage("로그인 시간이 경과되었습니다.", reload);

        // 현재 로그 검증하기
        const logResult = await adminApis().checkLog(loginAccessToken);
        if (!logResult.login) {
          // 로그가 검색되지 않는 경우
          return removeLocalStorage(
            "비정상적인 로그인이 감지되었습니다. (로그 없음)",
            reload
          );
        } else {
          // 로그가 등록되어 있는 경우
          if (logResult.isTest) {
            // 테스트로 로그인 되어 있을 경우 로그인 시간은 10분으로 제한
            limit = new Date(loginDate.setHours(loginDate.getMinutes() + 10));

            // 테스트 로그인이 10분 이상 경과했을 경우
            if (Number(limit) - now < 0)
              return removeLocalStorage(
                "로그인 시간이 경과되었습니다.",
                reload
              );
          }
          result = { ...logResult };
        }
      }

      console.log(`로그인 완료 : ${loginDate}후 만료`);
      return result;
    },

    // 현재 로그인 로그 검증하기
    checkLog: async (loginAccessToken: string) => {
      let result = { login: false, isTest: false };
      if (!loginAccessToken) return result;

      // 실제로 유효한 토큰인지 검증
      let logDoc = getDoc("admin", "login", "log");
      // 아이피 검증
      const userIp = await getUserIp();

      if (logDoc) {
        // 현재 로그인 중인 액세스 토큰과 ip 검색
        logDoc = logDoc
          .where("accessToken", "==", loginAccessToken)
          .where("ip", "==", userIp) as CollectionReferenceDocumentData;

        const logResult = getResult(await apis(logDoc).read());
        if (logResult && logResult.length) {
          result = {
            login: true,
            isTest: logResult[0].isTest, // 테스트 모드인지 검사
          };
        }
      }
      return result;
    },
  };
};

export default adminApis;

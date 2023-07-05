// 현재 관리자의 로그인 정보를 검증
// 필수적으로 "admin-accessToken"와 "login-date"가 두개 모두 있어야 한다.
// "login-date"의 시간을 기준으로 1시간까지만 로그인이 가능하다.
// 1시간이 경과할 경우 재로그인으로 유도한다.
// "login-date"의 시간이 변경되었는지는 "admin-accessToken"와 함께 비교해서 검증한다.
import { getHashText } from "../functional";

export const checkAccessToken = async (): Promise<boolean> => {
  // 로그인 accessToken 가져오기
  let loginAccessToken: string | null =
    localStorage.getItem("admin-accessToken");
  // 로그인 시간 가져오기
  let loginDate: Date | string | null | number =
    localStorage.getItem("login-date");

  // 둘 중 하나라도 없는 경우 = 비로그인 상태
  if (!loginAccessToken || !loginDate) {
    console.log("로그인 정보가 삭제되었습니다.");
    return removeLocalStorage();
  }
  loginAccessToken = JSON.parse(loginAccessToken);

  if (loginDate) {
    // 로그인한 시간대가 존재하는 경우
    // 시간이 변경되었는지를 검증한다.
    if ((await getHashText(loginDate)) !== loginAccessToken) {
      // 일치하지 않는 경우 (= 로그인 시간이 사용자가 임의로 강제 변경한 경우)
      console.log("로그인 시간이 일치하지 않아 비로그인 되었습니다.");
      return removeLocalStorage();
    }

    // 로그인 시간이 경과하는지 체크한다. (로그인으로부터 1시간까지만 사용 가능)
    loginDate = new Date(JSON.parse(loginDate));
    // 로그인 시간으로부터 1시간 경과된 시간
    const limit = new Date(loginDate.setHours(loginDate.getHours() + 1));
    // 현재 시간
    const now = Number(new Date());

    // 1시간이 경과했을 경우
    if (Number(limit) - now < 0) {
      console.log("로그인 시간이 경과되었습니다.");
      return removeLocalStorage();
    }
  }

  console.log(`로그인 완료 : ${loginDate}후 만료`);
  return true;
};

// 로그인 정보 모두 제거
const removeLocalStorage = (): boolean => {
  localStorage.removeItem("admin-accessToken");
  localStorage.removeItem("login-date");

  return false;
};

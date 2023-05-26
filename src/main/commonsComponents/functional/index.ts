// 태그 제거하기
const removeTag = (str: string) => {
  return str
    .split("</span>")
    .map((el) =>
      el.replace(el.substring(el.indexOf("<span"), el.indexOf(">") + 1), "")
    )
    .join("");
};

// 시간에 대한 차이 구하기
const getDateForm = (
  date: {
    seconds: number;
    nanoseconds: number;
  },
  getDate?: boolean // 날짜 정보만 얻고 싶을 경우
): string => {
  const _date: Date = new Date(
    date.seconds * 1000 + date.nanoseconds / 1000000
  );

  let result = "";

  // const now = new Date(); // 현재 시간
  // 현재 시간과 해당 시간의 차이 구하기
  const distance = Number(new Date()) - Number(_date);
  if (distance > 0) {
    // 현재로부터 얼마나 차이가 나는지 저장
    const info = {
      hour: Math.floor(distance / (1000 * 60 ** 2)), // 시간
      minute: Math.floor(distance / (1000 * 60)), // 분
      seconds: Math.floor(distance / 1000), // 초
    };

    if (!info.hour) {
      // 1시간 전이라면 초, 분까지 표시

      if (!info.minute) {
        // 1분 전이라면
        result = "방금 전";
      } else {
        // 1분 후라면
        result = String(info.minute) + "분 전";
      }
    } else if (info.hour < 24) {
      // 1시간 후일 경우, // 하루가 지나기 전이라면 시간 표시
      result = String(info.hour) + "시간 전";
    }
  }

  if (!result || getDate) {
    const dateInfo = {
      // date에 대한 각각의 정보 저장
      year: _date.getFullYear(), // 연도
      month: _date.getMonth() + 1, // 월
      day: _date.getDate(), // 일
      // hour: _date.getHours(), // 시간
      // minute: _date.getMinutes(), // 분
      // second: _date.getSeconds(),
    };

    result = `${String(dateInfo.year)}년 ${String(dateInfo.month).padStart(
      2,
      "0"
    )}월 ${String(dateInfo.day).padStart(2, "0")}일`;
  }

  return result;
};

// 줄바꿈 (\n => <br />) 처리하기
const changeMultipleLine = (str: string) => {
  return str.replaceAll("\n", "<br />");
};

// 비밀번호 해쉬화
const getHashPassword = async (
  data:
    | Array<string | number> // 배열
    | { [key: string]: string | number } // 객체
    | string // 문자열
    | number, // 숫자
  salt?: string
) => {
  const { createHash } = await import("crypto");
  let str: string = String(data);

  // 객체일 경우 value 값만 뽑아 배열에 저장
  if (typeof data === "object" && !Array.isArray(data)) {
    data = Object.values(data);
  }
  // 배열 데이터는 하나의 문자열로 뭉치기
  if (typeof data === "object") {
    str = data.join(" + ");
  }
  // salt 적용하기
  let _salt = process.env.NEXT_PUBLIC_SALT || "mcm-sejun3278-Salt-data-0515";
  if (salt) _salt = salt;

  str += _salt;
  return createHash("sha256").update(str).digest("hex");
};

// uuid 출력하기
const getUuid = () => {
  const { v4 } = require("uuid");
  return v4();
};

export { removeTag, getDateForm, changeMultipleLine, getHashPassword, getUuid };

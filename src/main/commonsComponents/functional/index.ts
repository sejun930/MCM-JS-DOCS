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
const getDateForm = (date: Date): string => {
  let result = "";

  const now = new Date(); // 현재 시간
  const dateInfo = {
    // date에 대한 각각의 정보 저장
    year: date.getFullYear(), // 연도
    month: date.getMonth() + 1, // 월
    day: date.getDate(), // 일
    hour: date.getHours(), // 시간
    minute: date.getMinutes(), // 분
    second: date.getSeconds(),
  };

  // 현재 시간과 해당 시간의 차이 구하기
  const distance = Number(now) - Number(date);
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
    } else {
      // 1시간 후일 경우
      if (info.hour > 24) {
        // 하루가 지날 경우
        result = `${String(dateInfo.year)}년 ${String(dateInfo.month).padStart(
          2,
          "0"
        )}월 ${String(dateInfo.day).padStart(2, "0")}일`;
      } else {
        // 하루가 지나기 전이라면 시간 표시
        result = String(info.hour) + "시간 전";
      }
    }
  }

  return result;
};

// 줄바꿈 (\n => <br />) 처리하기
const changeMultipleLine = (str: string) => {
  return str.replaceAll("\n", "<br />");
};

export { removeTag, getDateForm, changeMultipleLine };

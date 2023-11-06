// 날짜 관련 함수
const now = new Date();

// 시간에 대한 차이 구하기
const getDateForm = ({
  firebaseTimer,
  date,
  getDate,
}: {
  firebaseTimer?: { seconds: number; nanoseconds: number };
  date?: Date;
  getDate?: boolean;
}): string => {
  let _date = new Date();
  // 파이어베이스로 가져온 시간인 경우
  if (firebaseTimer) {
    _date = new Date(
      firebaseTimer.seconds * 1000 + firebaseTimer.nanoseconds / 1000000
    );
  } else if (date) {
    _date = date;
  }

  let result = "";

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
      hours: _date.getHours(), // 시간
      minutes: _date.getMinutes(), // 분
    };

    result = `${String(dateInfo.year)}년 ${String(dateInfo.month).padStart(
      2,
      "0"
    )}월 ${String(dateInfo.day).padStart(2, "0")}일 ${String(
      dateInfo.hours
    ).padStart(2, "0")}:${String(dateInfo.minutes).padStart(2, "0")}`;
  }

  return result;
};

// 설정된 날짜가 현재로부터 며칠 차이는지 구하기
const getDistanceDate = (target: string | Date) => {
  target = new Date(target);
  // 현재 시간 - 설정 시간 후, 일수로 전환
  const distance = Math.floor(
    (now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  );

  return distance;
};

export { getDateForm, getDistanceDate };

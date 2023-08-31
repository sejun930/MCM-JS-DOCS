import { ModalType } from "mcm-js/dist/components/modules/modal/component/modal.types";
import { SliderType } from "mcm-js/dist/components/modules/slider/components/slider.types";
import { TooltipType } from "mcm-js/dist/components/modules/tooltip/component/tooltip.types";
import { getCommonsHighlight } from "src/commons/highlight";

// 태그 제거하기
const removeTag = (str: string): string =>
  str
    .split("<span")
    .map((el) =>
      el
        .substring(el.indexOf(">") + 1)
        .split("</span>")
        .join("")
    )
    .join("");

// 탭 (공백) 적용하기
const getTap = (str: string) => {
  // 2줄 처리하기
  return str
    .split("/&tap&/")
    .join(
      `
`
    )
    .split("/&tap2&/").join(`
    
`);
};

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

// 줄바꿈 (\n => <br />) 처리하기
const changeMultipleLine = (str: string) => {
  return str.split("\n").join("<br />");
};

// 텍스트 해쉬화
const getHashText = async (
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
  str += salt || process.env.NEXT_PUBLIC_SALT || "mcm-sejun3278-Salt-data-0515";

  return createHash("sha256").update(str).digest("hex");
};

// uuid 출력하기
const getUuid = () => {
  const { v4 } = require("uuid");
  return v4();
};

// ip 가져오기
const getUserIp = async () => {
  let ip = "";

  // ip 주소 1차 가져오기
  const axios = require("axios");
  try {
    const { data } = await axios.get("https://api64.ipify.org/?format=json");
    // ip 주소 저장
    ip = data.ip;
  } catch (err) {
    // 호출에 실패하면 다음 방법 시도
    console.log("1차 IP 조회에 실패했습니다. : " + err);

    // ip 주소 2차 가져오기
    try {
      const { data } = await axios.get("https://geolocation-db.com/json/");
      ip = data.IPv4;
    } catch (err2) {
      // 2차 실패
      console.log("2차 IP 조회에 실패했습니다. : " + err);

      // ip 주소 최종 가져오기
      try {
        const { data } = await axios.get("https://ipapi.co/json/");
        ip = data.ip;
      } catch (err3) {
        // 3차 최종 실패
        console.log("3차 IP 조회에 실패했습니다. : " + err3);
      }
    }
  }

  return ip;
};

// id 값을 이용해 해당 document 위치로 이동하기
const moveDocument = (id: string, bonus?: number | 0) => {
  const doc = document.getElementById(id);

  if (doc) {
    const { top } = doc.getBoundingClientRect();

    // 해당 document의 위치로 이동
    const destination =
      top +
      (window.pageYOffset || document.documentElement.scrollTop) -
      50 +
      (bonus || 0);

    window.scrollTo({
      top: destination,
    });
  }
};

// 이슈에 대한 매크로 답변 가져오기
const getBugAutoAnswer = (status: number): string => {
  if (status === 1)
    return "이슈 확인중입니다. <br />불편을 드려서 죄송합니다. 🙇 <br /><br />빠른 시일내에 수정하겠습니다. <br />작성해주셔서 감사합니다! 🧡";
  else if (status === 2)
    return "이슈 수정이 완료되었습니다. <br /><br />신고해주셔서 감사합니다! 🧡<br />";
  return "";
};

// 랜덤한 숫자 생성하기
const getRandomNumber = (max: number, min: number) => {
  max = Math.floor(max + 1 || 2);
  min = Math.ceil(min || 0);

  return Math.floor(Math.random() * (max - min) + min);
};

// 깊은 복사
const deepCopy = <T>(data: T) => {
  return JSON.parse(JSON.stringify(data));
};

// 비밀번호 동일 체크
const checkSamePassword = async (
  hashPassword: string,
  inputPassword: string
): Promise<boolean> => {
  // hashPassword : 기존에 해쉬 형태로 저장되어 있는 원본 비밀번호
  // inputPassword : 비교할 비밀번호 (해쉬 X)

  return hashPassword === (await getHashText(inputPassword));
};

// 서버 저장용 Text로 변경 (클라이언트로부터 받아온 텍스트를 DB에 저장할 때 사용)
const changeServerText = (text: string): string => {
  return text.split("\n").join("<br />");
};

// 클라이언트 렌더용 Text로 변경 (DB에서 가져온 데이터를 화면에 뿌려줄 때 사용)
const changeClientText = (text: string): string => {
  return text.split("<br />").join("\n");
};

// 이미지 미리 불러오기
const imagePreLoad = (list: Array<string>) => {
  const script = document.createElement("script");

  if (list && list.length) {
    list.forEach((url) => {
      const img = document.createElement("img");
      img.src = url;

      if (img) {
        script.append(img);
        document.body.append(script);
      }
    });
  }
};

// 개발 및 배포 환경의 라이브러리 호출하기
const getLibraries = () => {
  // 전체 모듈 가져오기
  const getAllLibraries = require(`mcm-js${
    (process.env.NODE_ENV === "development" && "-dev") || ""
  }`);
  delete getAllLibraries.__esModule;

  type ModuleTypes = {
    Modal: ModalType;
    Tooltip: TooltipType;
    Slider: SliderType;
  };

  return getAllLibraries as ModuleTypes;
};

// 문자열을 카멜 케이스 형태로 변환하기
export const getCamelCase = (str: string) => {
  return str
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.substring(1))
    .join(" ");
};

// 문자열 복사하기
const copyText = (text: string, isCode?: boolean) => {
  if (isCode) text = removeTag(text);
  navigator.clipboard.writeText(text);
};

// 컴포넌트 props 형태를 객체 형태로 변경
const getObjectTemplate = (code: string) => {
  return `${code.replace(">=<", ">: <")}${getCommonsHighlight.comma()}`;
};

// props 예시용 코드 완성하기
const getPropsCodeTemplate = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  return `${getCommonsHighlight.props(key, value)}`;
};

export {
  removeTag,
  getTap,
  getDateForm,
  changeMultipleLine,
  getHashText,
  getUuid,
  getUserIp,
  moveDocument,
  getBugAutoAnswer,
  getRandomNumber,
  deepCopy,
  checkSamePassword,
  changeServerText,
  changeClientText,
  imagePreLoad,
  getLibraries,
  copyText,
  getObjectTemplate,
  getPropsCodeTemplate,
};

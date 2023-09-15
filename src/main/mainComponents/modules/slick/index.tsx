import { Alert } from "mcm-js-dev";

export default function AlertExamplePage() {
  return (
    <button
      onClick={() =>
        Alert.closeAlert({
          className: "Test", // 화면 전체의 "Test" ClassName을 가지는 모든 알럿을 종료합니다.
        })
      }
    >
      Close with "Test" className Alert
    </button>
  );
}

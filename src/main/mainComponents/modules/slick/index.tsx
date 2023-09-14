import { Alert } from "mcm-js-dev";

export default function AlertExamplePage() {
  return (
    <button
      onClick={() =>
        Alert.openAlert({
          children: "이 알럿은 무한하게 실행됩니다.",
          closeDelayTime: "infinite",
          useCloseMode: true,
        })
      }
    >
      Open Infinite Alert
    </button>
  );
}

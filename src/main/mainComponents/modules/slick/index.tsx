import { Alert } from "mcm-js-dev";

export default function AlertExamplePage() {
  return (
    <button
      onClick={() =>
        Alert.openAlert({
          children: "Hello",
          useCloseMode: false ?? { useSwipeMode: false },
          onAfterAlertOpen: () => {},
          onAfterAlertClose: () => {},
        })
      }
    >
      Open On After Alert Open
    </button>
  );
}

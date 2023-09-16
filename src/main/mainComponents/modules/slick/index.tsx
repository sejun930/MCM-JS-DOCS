import { Alert } from "mcm-js-dev";

export default function AlertExamplePage() {
  return (
    <button
      onClick={() =>
        Alert.openAlert({
          children: "",
          alertConcept: {
            type: "custom",
            custom: {
              color: "",
              icon: {
                src: "",
                size: 10,
                color: "",
              },
            },
          },
          useCloseMode: false,
        })
      }
    >
      Open Alert
    </button>
  );
}

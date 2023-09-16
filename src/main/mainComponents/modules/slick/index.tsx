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
              text: {
                color: "",
                size: 16,
                weight: 300,
              },
            },
          },
        })
      }
    >
      Open Alert
    </button>
  );
}

import { getCommonsHighlight } from "src/commons/highlight";

export const tooltipCommonsExampleCode = {
  tooltipText: (text: string) =>
    `${getCommonsHighlight.props(
      "tooltipText",
      getCommonsHighlight.string(text)
    )}`,
};

import { getCommonsHighlight } from "src/commons/highlight";

export const tooltipCommonsExampleCode = {
  tooltipString: (text: string) =>
    `${getCommonsHighlight.props(
      "tooltipText",
      getCommonsHighlight.string(text)
    )}`,
  tooltipObject: (children: string) =>
    `${getCommonsHighlight.props(
      "tooltipText",
      getCommonsHighlight.curly(children)
    )}`,
  useAnimation: getCommonsHighlight.props(
    "useShowAnimation",
    getCommonsHighlight.curly(getCommonsHighlight.colors("true").bool)
  ),
};

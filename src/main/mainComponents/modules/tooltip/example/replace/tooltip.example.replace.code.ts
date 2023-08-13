import { getCommonsHighlight } from "src/commons/highlight";
import { tooltipCommonsExampleCode } from "../tooltip.example.commons.code";

// "disable" 예시의 전체 코드
export const disableReplaceCode = `${
  getCommonsHighlight.colors(
    "툴팁의 활성화 또는 비활성화의 기준이 되는 state 값입니다."
  ).comment
}
  ${getCommonsHighlight.state(
    "isDisable",
    getCommonsHighlight.colors("false").bool
  )}
  
  ${
    getCommonsHighlight.colors(
      "isDisable state 값을 true 또는 false로 변경합니다."
    ).comment
  }
  ${getCommonsHighlight.makeFunction({
    funcName: "toggleDisable",
    children: getCommonsHighlight.function({
      funcName: "setIsDisable",
      setFunc: {
        color: "blue",
        children: `${getCommonsHighlight.arrowFunction({
          isChildren: true,
          props: `<span class='skyblue'>prev</span>`,
          returnValue: ` ${
            getCommonsHighlight.colors("!").text
          }<span class='skyblue'>prev</span>`,
        })}`,
      },
    }),
  })} 
    
${getCommonsHighlight.return(
  `${getCommonsHighlight.tag.div(
    `
      ${getCommonsHighlight.tag.button({
        children: `
        ${getCommonsHighlight.colors("툴팁 활성화 / 비활성화").text}
     `,
        clickEvent: {
          eventName: "toggleDisable",
        },
      })}
      ${getCommonsHighlight.tag.component({
        componentName: "Tooltip",
        children: `
        ${getCommonsHighlight.tag.p(
          getCommonsHighlight.colors("활성화 상태에서만 툴팁이 실행됩니다.")
            .text
        )}
      `,
        props: ` 
        ${tooltipCommonsExampleCode.tooltipString("활성화 상태입니다.")}
        ${
          getCommonsHighlight.colors(
            "isDisable state값이 true라면 툴팁이 실행되지 않습니다."
          ).comment
        }
        ${getCommonsHighlight.props(
          "isDisable",
          getCommonsHighlight.curly(
            getCommonsHighlight.colors("isDisable").varName
          )
        )}
      `,
      })}
    `
  )}`
)}`;

// "onoff" 예시의 전체 코드
export const onoffReplaceCode = `${
  getCommonsHighlight.colors(
    `툴팁을 실행하거나 종료시키는 기준이 되는 state 값입니다.
  // true를 전달하면 실행시킬 수 있고, false를 전달하면 종료됩니다.`
  ).comment
}
  ${getCommonsHighlight.state(
    "isOpen",
    getCommonsHighlight.colors("false").bool
  )}
    
  ${
    getCommonsHighlight.colors(
      "isOpen state 값을 true 또는 false로 변경합니다."
    ).comment
  }
  ${getCommonsHighlight.makeFunction({
    funcName: "toggleIsOpen",
    children: getCommonsHighlight.function({
      funcName: "setIsOpen",
      setFunc: {
        color: "blue",
        children: `${getCommonsHighlight.arrowFunction({
          isChildren: true,
          props: `<span class='skyblue'>prev</span>`,
          returnValue: ` ${
            getCommonsHighlight.colors("!").text
          }<span class='skyblue'>prev</span>`,
        })}`,
      },
    }),
  })} 

  ${
    getCommonsHighlight.colors(
      "툴팁이 종료되었을 때 state 값을 false로 변경하는 함수입니다."
    ).comment
  }
  ${getCommonsHighlight.makeFunction({
    funcName: "closeAfterEvent",
    children: getCommonsHighlight.function({
      funcName: "setIsOpen",
      setFunc: {
        color: "blue",
        children: getCommonsHighlight.colors("false").bool,
      },
    }),
  })} 
      
${getCommonsHighlight.return(
  `${getCommonsHighlight.tag.div(
    `
      ${getCommonsHighlight.tag.button({
        children: `
        ${getCommonsHighlight.colors("툴팁 실행 / 종료").text}
     `,
        clickEvent: {
          eventName: "toggleIsOpen",
        },
      })}
      ${getCommonsHighlight.tag.component({
        componentName: "Tooltip",
        children: `
        ${getCommonsHighlight.tag.p(
          getCommonsHighlight.colors(
            "버튼을 클릭하면 툴팁을 수동으로 실행하거나 종료할 수 있습니다."
          ).text
        )}
      `,
        props: ` 
        ${tooltipCommonsExampleCode.tooltipString("툴팁이 실행되었습니다.")}
        ${getCommonsHighlight.colors("useShowAnimation").varName2}
        ${
          getCommonsHighlight.colors(
            "isOpen 값이 true일 때 툴팁이 수동으로 실행됩니다."
          ).comment
        }
        ${getCommonsHighlight.props(
          "open",
          getCommonsHighlight.curly(
            getCommonsHighlight.colors("isOpen").varName
          )
        )}
        ${
          getCommonsHighlight.colors(
            "툴팁이 종료되면 isOpen state 값을 false로 변경해주는 함수가 실행됩니다."
          ).comment
        }
        ${getCommonsHighlight.props(
          "onCloseAfterEvent",
          getCommonsHighlight.curly(
            getCommonsHighlight.function({ funcName: "closeAfterEvent" })
          )
        )}
      `,
      })}
    `
  )}`
)}`;
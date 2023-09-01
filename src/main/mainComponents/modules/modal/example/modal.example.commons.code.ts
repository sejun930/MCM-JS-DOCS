import { getCommonsHighlight } from "src/commons/highlight";

// modalStyles 렌더용
const getModalStyles = (
  space?: string,
  otherVers?: boolean,
  isObj?: boolean
) => {
  space = space || "";
  return `${getCommonsHighlight.getComma([
    `${space}<span class="skyblue">wrapper:</span> <span class=${
      isObj ? "yellow" : "deepPurple"
    }>{</span>
            ${getCommonsHighlight.getComma([
              `${space}<span class="skyblue">backgroundColor:</span> <span class='lightOrange'>"rgba(${
                otherVers ? 100 : 30
              }, 0, 50, 0.7)"</span>`,
            ])}
          ${space}<span class=${isObj ? "yellow" : "deepPurple"}>}</span>`,
    `         ${space}<span class="skyblue">items:</span> <span class=${
      isObj ? "yellow" : "deepPurple"
    }>{</span>
  ${getCommonsHighlight.getComma([
    `          ${space}<span class="skyblue">backgroundColor:</span> <span class='lightOrange'>"black"</span>`,
    `           ${space}<span class="skyblue">border:</span> <span class='lightOrange'>"double 6px white"</span>`,
    `           ${space}<span class="skyblue">borderRadius:</span> <span class='lightOrange'>"0px"</span>`,
    `           ${space}<span class="skyblue">width:</span> <span class='lightOrange'>"${
      otherVers ? "50%" : "250px"
    }"</span>`,
    `           ${space}<span class="skyblue">height:</span> <span class='lightOrange'>"${
      otherVers ? "40%" : "250px"
    }"</span>`,
  ])}
          ${space}<span class=${isObj ? "yellow" : "deepPurple"}>}</span>`,
    `         ${space}<span class="skyblue">closeButton:</span> <span class=${
      isObj ? "yellow" : "deepPurple"
    }>{</span>
  ${getCommonsHighlight.getComma([
    `          ${space}<span class="skyblue">backgroundColor:</span> <span class='lightOrange'>"black"</span>`,
    `           ${space}<span class="skyblue">borderRadius:</span> <span class='lightOrange'>"${
      otherVers ? "0" : "100%"
    }"</span>`,
    `           ${space}<span class="skyblue">border:</span> <span class='lightOrange'>"solid 1px white"</span>`,
    `           ${space}<span class="skyblue">marginTop:</span> <span class='lightOrange'>"-10px"</span>`,
  ])}
          ${space}<span class=${isObj ? "yellow" : "deepPurple"}>}</span>`,
    `         ${space}<span class="skyblue">contents:</span> <span class=${
      isObj ? "yellow" : "deepPurple"
    }>{</span>
  ${getCommonsHighlight.getComma([
    `          ${space}<span class="skyblue">backgroundColor:</span> <span class='lightOrange'>"white"</span>`,
    `           ${space}<span class="skyblue">${
      otherVers ? "height" : "width"
    }:</span> <span class='lightOrange'>"${otherVers ? "50%" : "90%"}"</span>`,
  ])}
          ${space}<span class=${isObj ? "yellow" : "deepPurple"}>}</span>`,
  ])}`;
};

export const modalCommonsExampleCode = {
  children: (text: string) => [
    ``,
    `<span class='skyblue'>children:</span> <span><</span><span class='darkBlue'>span</span><span>></span> <span class='lightGray'>${text}</span> <span><</span><span>/</span><span class='darkBlue'>span</span><span>></span>`,
  ],
  show: [
    `<span class='skyblue'>show</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='blue1'>isOpen</span><span class='blue'>}</span>`,
  ],
  onCloseModal: [
    `<span class='skyblue'>onCloseModal</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='lightYellow'>closeModal</span><span class='blue'>}</span>`,
    `<span class='lightYellow'>onCloseModal</span><span class='skyblue'>:</span> <span class='lightYellow'>closeModal</span>`,
  ],
  showBGAnimation: [
    `<span class='skyblue'>showBGAnimation</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='darkBlue'>true</span><span class='blue'>}</span>`,
    `<span class='skyblue'>showBGAnimation:</span> <span class='darkBlue'>true</span>`,
  ],
  showModalOpenAnimation: [
    `<span class='skyblue'>showModalOpenAnimation</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='darkBlue'>true</span><span class='blue'>}</span>`,
    `<span class='skyblue'>showModalOpenAnimation:</span> <span class='darkBlue'>true</span>`,
  ],
  modalSize: (width: string, height: string) => [
    `<span class='skyblue'>modalSize</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='yellow'>{</span> <span class='skyblue'>width:</span> <span class='lightOrange'>"${width}"</span>${getCommonsHighlight.comma()} <span class='skyblue'>height:</span> <span class='lightOrange'>"${height}"</span> <span class='yellow'>}</span><span class='blue'>}</span>`,
    `<span class='skyblue'>modalSize:</span> <span class='blue'>{</span> <span class='skyblue'>width:</span> <span class='lightOrange'>"${width}"</span>${getCommonsHighlight.comma()} <span class='skyblue'>height:</span> <span class='lightOrange'>"${height}"</span> <span class='blue'>}</span>`,
  ],
  mobileModalSize: (width: string, height: string) => [
    `<span class='skyblue'>mobileModalSize</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='yellow'>{</span> <span class='skyblue'>width:</span> <span class='lightOrange'>"${width}"</span>${getCommonsHighlight.comma()} <span class='skyblue'>height:</span> <span class='lightOrange'>"${height}"</span> <span class='yellow'>}</span><span class='blue'>}</span>`,
    `<span class='skyblue'>mobileModalSize:</span> <span class='blue'>{</span> <span class='skyblue'>width:</span> <span class='lightOrange'>"${width}"</span>${getCommonsHighlight.comma()} <span class='skyblue'>height:</span> <span class='lightOrange'>"${height}"</span> <span class='blue'>}</span>`,
  ],
  modalStyles: [
    `<span class="skyblue">modalStyles</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='yellow'>{</span>
          ${getModalStyles()}
        <span class='yellow'>}</span><span class='blue'>}</span>`,
    `<span class="skyblue">modalStyles</span><span class='lightGray'>:</span> <span class='blue'>{</span>
          ${getModalStyles("  ", false, true)}
          <span class='blue'>}</span>`,
  ],
  mobileModalStyles: [
    `<span class="skyblue">mobileModalStyles</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='yellow'>{</span>
          ${getModalStyles("", true)}
        <span class='blue'>}</span><span class='yellow'>}</span>`,
    `<span class="skyblue">mobileModalStyles</span><span class='lightGray'>:</span> <span class='blue'>{</span>
          ${getModalStyles("  ", true, true)}
          <span class='blue'>}</span>`,
  ],
  hideCloseButton: [
    `<span class='skyblue'>hideCloseButton</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='darkBlue'>true</span><span class='blue'>}</span>`,
    `<span class='skyblue'>hideCloseButton:</span> <span class='darkBlue'>true</span>`,
  ],
  closeMent: (text: string) => [
    `<span class='skyblue'>closeMent</span><span class='lightGray'>=</span><span class='lightOrange'>"${text}"</span>`,
    `<span class='skyblue'>closeMent:</span> <span class='lightOrange'>"${text}"</span>`,
  ],
  closeButtonInfo: [
    `<span class='skyblue'>closeButtonInfo</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='yellow'>{</span> <span class='skyblue'>buttonSize:</span> <span class='lightOrange'>"25px"</span> <span class='yellow'>}</span><span class='blue'>}</span>`,
    `<span class='skyblue'>closeButtonInfo:</span> <span class='blue'>{</span> <span class='skyblue'>buttonSize:</span> <span class='lightOrange'>"25px"</span> <span class='blue'>}</span>`,
  ],
  offAutoClose: [
    `<span class='skyblue'>offAutoClose</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='darkBlue'>true</span><span class='blue'>}</span>`,
    `<span class='skyblue'>offAutoClose:</span> <span class='darkBlue'>true</span>`,
  ],
  onFixWindow: [
    `<span class='skyblue'>onFixWindow</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='darkBlue'>true</span><span class='blue'>}</span>`,
    `<span class='skyblue'>onFixWindow:</span> <span class='darkBlue'>true</span>`,
  ],
  autoCloseTimer: (timer: number) => [
    `<span class='skyblue'>autoCloseTimer</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='darkBlue'>${timer}</span><span class='blue'>}</span>`,
    `<span class='skyblue'>autoCloseTimer:</span> <span class='darkBlue'>${timer}</span>`,
  ],
};

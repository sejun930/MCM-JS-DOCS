import { getCommonsHighlight } from "src/commons/highlight";

export const modalCommonsExampleCode = {
  children: (text: string) => [
    ``,
    `<span class='skyblue'>children:</span> <span><</span><span class='darkBlue'>span</span><span>></span> <span class='lightGray'>${text}</span> <span><</span><span>/</span><span class='darkBlue'>span</span><span>></span>`,
  ],
  show: [
    `<span class='skyblue'>show</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='blue3'>isOpen</span><span class='blue'>}</span>`,
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
  mobileModalSize: [
    `<span class='skyblue'>mobileModalSize</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='yellow'>{</span> <span class='skyblue'>width:</span> <span class='lightOrange'>"50%"</span>${getCommonsHighlight.comma()} <span class='skyblue'>height:</span> <span class='lightOrange'>"50%"</span> <span class='yellow'>}</span><span class='blue'>}</span>`,
    `<span class='skyblue'>mobileModalSize:</span> <span class='blue'>{</span> <span class='skyblue'>width:</span> <span class='lightOrange'>"50%"</span>${getCommonsHighlight.comma()} <span class='skyblue'>height:</span> <span class='lightOrange'>"50%"</span> <span class='yellow'>}</span><span class='blue'>}</span>`,
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
};

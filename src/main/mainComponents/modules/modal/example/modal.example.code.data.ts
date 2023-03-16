import { ExampleCommonsTypes } from "src/commons/data/example/example.commons.data";

export interface ExampleCodeListTypese {
  [key: string]: string;
}

// 해당 모듈을 실행하기 위한 공통적인 준비물
export const modalCommonsData: ExampleCommonsTypes = {
  code: `
  <span class='lightGreen'>// 모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다.</span>
  <span class='darkBlue'>const</span> <span class='purple'>[</span><span class='blue'>isOpen</span><span class='lightGray'>,</span> <span class='lightYellow'>setIsOpen</span><span class='purple'>]</span> <span class='lightGray'>=</span> <span class='lightYellow'>useState</span><span class='purple'>(</span><span class='blue'>false</span><span class='purple'>)</span><span class='lightGray'>;</span>
  
  <span class='lightGreen'>// 모달을 실행하는 함수입니다.</span>
  <span class='darkBlue'>const</span> <span class='lightYellow'>openModal</span> <span class='lightGray'>=</span> <span class='purple'>()</span> <span class='blue'>=></span> <span class='purple'>{</span>
    <span class='lightYellow'>setIsOpen</span><span class='blue'>(true)</span><span class='lightGray'>;</span>
  <span class='purple'>}</span><span class='lightGray'>;</span>
  
  <span class='lightGreen'>// 모달을 종료하는 함수입니다.</span>
  <span class='darkBlue'>const</span> <span class='lightYellow'>closeModal</span> <span class='lightGray'>=</span> <span class='purple'>()</span> <span class='blue'>=></span> <span class='purple'>{</span>
    <span class='lightYellow'>setIsOpen</span><span class='blue'>(false)</span><span class='lightGray'>;</span>
  <span class='purple'>}</span><span class='lightGray'>;</span>
  `,
  import: { react: ["useState"] },
};

// 리턴될 때에 공통적으로 들어가는 코드 데이터
export const modalReturnCommonsData = (code: string): string => {
  return `<span class='gray'><</span><span class='darkBlue'>div</span><span class='gray'>></span>
      <span class='gray'><</span><span class='darkBlue'>button</span> <span class='skyblue'>onClick</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='lightYellow'>openModal</span><span class='blue'>}</span><span class='gray'>></span> <span class='lightGray'>모달 실행하기</span> <span class='gray'><</span><span class='gray'>/</span><span class='darkBlue'>button</span><span class='gray'>></span>
      ${code}
    <span class='gray'><</span><span class='gray'>/</span><span class='darkBlue'>div</span><span class='gray'>></span>`;
};

// Modal 각각의 예시 코드를 저장하는 객체
export const modalCodeList: ExampleCodeListTypese = {
  basic:
    "<span class='gray'><</span><span class='green'>_Modal</span> <span class='skyblue'>show</span><span class='lightGray'>=</span><span class='blue'>{isOpen}</span> <span class='skyblue'>onCloseModal</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='lightYellow'>closeModal</span><span class='blue'>}</span> <span class='gray'>/</span><span class='gray'>></span>",
  animation: `<span class='gray'><</span><span class='green'>_Modal</span>
        <span class='skyblue'>show</span><span class='lightGray'>=</span><span class='blue'>{isOpen}</span>
        <span class='skyblue'>onCloseModal</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='lightYellow'>closeModal</span><span class='blue'>}</span>
        <span class='skyblue'>showBGAnimation</span>
        <span class='skyblue'>showModalOpenAnimation</span>
      <span class='gray'>/</span><span class='gray'>></span>`,
  size300: `<span class='gray'><</span><span class='green'>_Modal</span>
        <span class='skyblue'>show</span><span class='lightGray'>=</span><span class='blue'>{isOpen}</span>
        <span class='skyblue'>onCloseModal</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='lightYellow'>closeModal</span><span class='blue'>}</span>
        <span class='skyblue'>styles</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='yellow'>{</span> <span class='skyblue'>width:</span> <span class='lightOrange'>"300px"</span><span class='lightGray'>,</span> <span class='skyblue'>height:</span> <span class='lightOrange'>"300px"</span> <span class='yellow'>}</span><span class='blue'>}</span>
      <span class='gray'>/</span><span class='gray'>></span>`,
  sizePercent: `<span class='gray'><</span><span class='green'>_Modal</span>
        <span class='skyblue'>show</span><span class='lightGray'>=</span><span class='blue'>{isOpen}</span>
        <span class='skyblue'>onCloseModal</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='lightYellow'>closeModal</span><span class='blue'>}</span>
        <span class='skyblue'>styles</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='yellow'>{</span> <span class='skyblue'>width:</span> <span class='lightOrange'>"30%"</span><span class='lightGray'>,</span> <span class='skyblue'>height:</span> <span class='lightOrange'>"40%"</span> <span class='yellow'>}</span><span class='blue'>}</span>
      <span class='gray'>/</span><span class='gray'>></span>`,
};

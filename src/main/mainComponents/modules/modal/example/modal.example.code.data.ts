export interface CodeInfoTypes {
  code: string;
  import?: {
    [key: string]: string[] | string;
  };
}

interface CodeListTypese {
  [key: string]: CodeInfoTypes;
}

// Modal 각각의 예시 코드를 저장하는 객체
export const modalCodeList: CodeListTypese = {
  form: {
    import: {
      react: ["useState"],
    },
    code: `  <span class='lightGreen'>// 모달을 실행하거나 종료 시킬 수 있는 state 값을 설정합니다.</span>
  <span class='darkBlue'>const</span> <span class='purple'>[</span><span class='blue'>isOpen</span><span class='lightGray'>,</span> <span class='lightYellow'>setIsOpen</span><span class='purple'>]</span> <span class='lightGray'>=</span> <span class='lightYellow'>useState</span><span class='purple'>(</span><span class='blue'>false</span><span class='purple'>)</span><span class='lightGray'>;</span>
  
  <span class='lightGreen'>// 모달을 실행하는 함수입니다.</span>
  <span class='darkBlue'>const</span> <span class='lightYellow'>openModal</span> <span class='lightGray'>=</span> <span class='purple'>()</span> <span class='blue'>=></span> <span class='purple'>{</span>
    <span class='lightYellow'>setIsOpen</span><span class='blue'>(true)</span><span class='lightGray'>;</span>
  <span class='purple'>}</span><span class='lightGray'>;</span>

  <span class='lightGreen'>// 모달을 종료하는 함수입니다.</span>
  <span class='darkBlue'>const</span> <span class='lightYellow'>closeModal</span> <span class='lightGray'>=</span> <span class='purple'>()</span> <span class='blue'>=></span> <span class='purple'>{</span>
    <span class='lightYellow'>setIsOpen</span><span class='blue'>(false)</span><span class='lightGray'>;</span>
  <span class='purple'>}</span><span class='lightGray'>;</span>

  <span class='purple'>return (</span>
    <span class='gray'><</span><span class='darkBlue'>div</span><span class='gray'>></span>
      <span class='gray'><</span><span class='darkBlue'>button</span> <span class='skyblue'>onClick</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='lightYellow'>openModal</span><span class='blue'>}</span><span class='gray'>></span> <span class='lightGray'>모달 실행하기</span> <span class='gray'><</span><span class='gray'>/</span><span class='darkBlue'>button</span><span class='gray'>></span>
      <span class='gray'><</span><span class='green'>_Modal</span> <span class='skyblue'>show</span><span class='lightGray'>=</span><span class='blue'>{isOpen}</span> <span class='skyblue'>onCloseModal</span><span class='lightGray'>=</span><span class='blue'>{</span><span class='lightYellow'>closeModal</span><span class='blue'>}</span> <span class='gray'>/</span><span class='gray'>></span>
    <span class='gray'><</span><span class='gray'>/</span><span class='darkBlue'>div</span><span class='gray'>></span>
  <span class='purple'>)</span><span class='lightGray'>;</span>
<span class='yellow'>}</span>`,
  },
};

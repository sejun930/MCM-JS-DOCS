export default function HowUseScriptComponnet() {
  // 1. 해당 모듈의 이름으로 호출하는 코드 출력
  const getImportModuleCode = (module: string): string => {
    let str = "";
    str += `<span class='purple'>import</span>`;
    str += `<span class='yellow'> { </span>`;
    str += `<span class='skyblue'>_${module}</span>`;
    str += `<span class='yellow'> } </span>`;
    str += `<span class='purple'>from</span>`;
    str += `<span class='lightOrange'> "mcm-js"</span>`;
    str += `<span class='sub'>;</span>`;

    return str;
  };

  // 2. 모듈 사용하는 폼 데이터 만들기
  const getHowUseExampleForm = () => {
    let str = "";
    str +=
      "<span class='keyword'>export default</span> function ExamplePage() {";

    return str;
  };

  // 3. 종합한 결과 출력하기
  const getHowUseResultCode = (module: string) => {
    return getImportModuleCode(module);
  };

  return {
    getHowUseResultCode,
  };
}

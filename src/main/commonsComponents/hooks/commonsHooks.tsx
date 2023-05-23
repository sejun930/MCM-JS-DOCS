import { ReactNode } from "react";
import { NextRouter, useRouter } from "next/router";
import { ExampleIProps } from "../units/template/form/example/template.example.types";

export default function CommonsHooksComponents() {
  const router = useRouter();

  // 컴포넌트 렌더 함수
  const componentRender = (Component: ReactNode): ReactNode => {
    return Component;
  };

  // 컴포넌트 클래스 네임 완성
  const getAllComponentsClassName = (
    defaultClass: string,
    className?: string
  ): string => {
    // defaultClass : 디폴트로 무조건 적용되는 클래스 이름
    // className : 새로 추가될 클래스 이름
    const _className = `${defaultClass}${className ? ` ${className}` : ""}`;
    return _className;
  };

  // router 객체 리턴하기
  const getRouter: () => NextRouter = () => {
    return router;
  };

  // 주소 query 끝 제이든 케이스 리턴하기
  const getModuleNamewithJadenCase = (): string => {
    let moduleName = router.asPath
      .split("/")
      .filter((el) => el)
      .at(-1);

    if (moduleName) {
      moduleName = moduleName[0].toUpperCase() + moduleName.substring(1);

      return moduleName;
    }
    return "";
  };

  // 예시용 렌더시 몇개의 예시 컴포넌트를 가지고 있는지를 리턴
  const getAllExampleComponentLength = (list: Array<ExampleIProps>): number => {
    return list.reduce((acc, cur) => acc + cur.contents.length, 0);
  };

  // CamelCase 적용된 문자열을 기존의 하이픈 문법으로 변경하기
  const getOriginTemplate = (str: string): string => {
    return Array.from(str).reduce((acc, cur, i) => {
      const code = cur.charCodeAt(0);
      if (i > 0 && code >= 65 && code <= 90) {
        // 0번째 인덱스 제외하고 대문자일 경우
        cur = `-${cur.toLowerCase()}`;
      }
      return acc + cur;
    }, "");
  };

  // 비밀번호 해쉬화
  const getHashPassword = async (
    data:
      | Array<string | number> // 배열
      | { [key: string]: string | number } // 객체
      | string // 문자열
      | number, // 숫자
    salt?: string
  ) => {
    const { createHash } = await import("crypto");
    let str: string = String(data);

    // 객체일 경우 value 값만 뽑아 배열에 저장
    if (typeof data === "object" && !Array.isArray(data)) {
      data = Object.values(data);
    }
    // 배열 데이터는 하나의 문자열로 뭉치기
    if (typeof data === "object") {
      str = data.join(" + ");
    }
    // salt 적용하기
    let _salt = process.env.NEXT_PUBLIC_SALT || "mcm-sejun3278-Salt-data-0515";
    if (salt) _salt = salt;

    str += _salt;
    return createHash("sha256").update(str).digest("hex");
  };

  // uuid 출력하기
  const getUuid = () => {
    const { v4 } = require("uuid");
    return v4();
  };

  return {
    componentRender,
    getAllComponentsClassName,
    getRouter,
    getModuleNamewithJadenCase,
    getAllExampleComponentLength,
    getOriginTemplate,
    getHashPassword,
    getUuid,
  };
}

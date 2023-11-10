import {
  PropsListWrapper,
  PropsRequiredInfoWrapper,
  PropsTable,
  Tr,
  CopyCode,
} from "./list.styles";
import { PropsModuleListResultType } from "../props.types";
import { _SpanText } from "mcm-js-commons";
import { copyCode } from "src/main/commonsComponents/functional/code";

import _Copy from "src/main/commonsComponents/units/copy";

import { getLibraries } from "src/main/commonsComponents/functional/modules";
const { Tooltip } = getLibraries();

export default function ModulePropsListFormPage({
  list,
  hideTitle,
  vers,
  isFunctional,
}: {
  list: Array<PropsModuleListResultType>;
  hideTitle?: boolean; // 타이틀 가리기 여부
  vers: number;
  isFunctional?: boolean;
}) {
  // props 코드 복사하기
  const copyCodeFn = (code: Array<string> | string) => () => {
    let result = code;
    if (Array.isArray(code)) result = code[vers];

    copyCode(String(result));
  };

  // 필수 리스트가 하나라도 있는지 검증
  const haveRequired = list.some((el) =>
    typeof el.isRequired === "object" ? el.isRequired[vers] : el.isRequired
  );

  return (
    (list && list.length && (
      <PropsListWrapper className="mcm-props-list-wrapper">
        {haveRequired && (
          <PropsRequiredInfoWrapper className="mcm-props-mobile-required-info">
            <div className="box-color" />
            <_SpanText>필수 Props</_SpanText>
          </PropsRequiredInfoWrapper>
        )}
        <PropsTable border={1} className="props-list-wrapper">
          <caption>Props List</caption>
          {!hideTitle && (
            <thead className="props-list-header-wrapper">
              <Tr>
                <td className="props-name">이름</td>
                <td className="props-notice">설명</td>
                <td className="props-type">기본값 (Type)</td>
                {/* <td className="props-required">필수 여부</td> */}
              </Tr>
            </thead>
          )}

          <tbody>
            {list.map((el, idx) => {
              // 해당 리스트가 필수 항목인지 체크
              const isRequired =
                typeof el.isRequired === "object"
                  ? el.isRequired[vers]
                  : el.isRequired;

              return (
                <Tr
                  key={`module-props-list-${module}-${el.name}-${idx}`}
                  className={`${(isRequired && "isRequired-list") || ""}`}
                  isLast={list.length === idx + 1}
                  id={`module-props-list-${
                    (isFunctional && "functional-") || ""
                  }${el.name}`}
                >
                  <td className="props-name">
                    <_SpanText>{el.name}</_SpanText>
                    {el.code && (
                      <Tooltip
                        tooltipText={
                          <_Copy
                            text={
                              Array.isArray(el.code) ? el.code[vers] : el.code
                            }
                            type="Code"
                          />
                        }
                        className="module-props-copy-button-tooltip"
                        tooltipStyles={{
                          backgroundColor: "#333333",
                          padding: "0px",
                        }}
                      >
                        <CopyCode
                          onClickEvent={copyCodeFn(el.code)}
                          className="module-props-copy-button"
                        >
                          📝
                        </CopyCode>
                      </Tooltip>
                    )}
                  </td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof el.notice === "object"
                          ? el.notice[vers]
                          : el.notice,
                    }}
                    className="props-notice"
                  />
                  <td className="props-type">{`${el.default} (${el.type})`}</td>
                  {/* <td className="props-required">
                  {(el.isRequired && "O") || "X"}
                </td> */}
                </Tr>
              );
            })}
          </tbody>
        </PropsTable>
      </PropsListWrapper>
    )) || <div className="props-empty-list-wrapper"></div>
  );
}

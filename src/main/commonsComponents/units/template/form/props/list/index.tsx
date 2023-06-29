import {
  PropsListWrapper,
  PropsMobileInfoWrapper,
  PropsTable,
  Tr,
} from "./list.styles";
import { PropsModuleListType } from "src/commons/data/props/props.commons.data";
import { _SpanText } from "mcm-js-commons";

export default function ModulePropsListFormPage({
  list,
  hideTitle,
}: {
  list: Array<PropsModuleListType>;
  hideTitle?: boolean; // 타이틀 가리기 여부
}) {
  return (
    (list && list.length && (
      <PropsListWrapper>
        <PropsMobileInfoWrapper>
          <div className="box-color" />
          <_SpanText>필수 Props</_SpanText>
        </PropsMobileInfoWrapper>
        <PropsTable border={1} className="props-list-wrapper">
          <caption>Props List</caption>
          {!hideTitle && (
            <thead className="props-list-header-wrapper">
              <Tr>
                <td className="props-name">이름</td>
                <td className="props-notice">설명</td>
                <td className="props-type">기본값 (Type)</td>
                <td className="props-required">필수 여부</td>
              </Tr>
            </thead>
          )}

          <tbody>
            {list.map((el, idx) => (
              <Tr
                key={`module-props-list-${module}-${el.name}-${idx}`}
                isRequired={el.isRequired || false}
                isLast={list.length === idx + 1}
              >
                <td className="props-name">{el.name}</td>
                <td
                  dangerouslySetInnerHTML={{ __html: el.notice }}
                  className="props-notice"
                />
                <td className="props-type">{`${el.default} (${el.type})`}</td>
                <td className="props-required">
                  {(el.isRequired && "O") || "X"}
                </td>
              </Tr>
            ))}
          </tbody>
        </PropsTable>
      </PropsListWrapper>
    )) || <div className="props-empty-list-wrapper"></div>
  );
}

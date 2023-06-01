import styled from "styled-components";

import { PropsModuleListType } from "src/commons/data/props/props.commons.data";

export default function ModulePropsListFormPage({
  list,
  hideTitle,
}: {
  list: Array<PropsModuleListType>;
  hideTitle?: boolean; // 타이틀 가리기 여부
}) {
  return (
    (list && list.length && (
      <PropsTable border={1} className="props-list-wrapper">
        <caption>Props List</caption>
        {!hideTitle && (
          <thead>
            <Tr>
              <td>이름</td>
              <td>설명</td>
              <td>기본값 (Type)</td>
              <td>필수 여부</td>
            </Tr>
          </thead>
        )}
        <tbody>
          {list.map((el, idx) => (
            <Tr
              key={`module-props-list-${module}-${el.name}-${idx}`}
              isRequired={el.isRequired || false}
            >
              <td>{el.name}</td>
              <td dangerouslySetInnerHTML={{ __html: el.notice }} />
              <td>{`${el.default} (${el.type})`}</td>
              <td>{(el.isRequired && "O") || "X"}</td>
            </Tr>
          ))}
        </tbody>
      </PropsTable>
    )) || <div className="props-empty-list-wrapper"></div>
  );
}

interface StyleTypes {
  isRequired?: boolean;
}

export const PropsTable = styled.table`
  margin-top: 20px;
  width: 100%;
  border: dotted 2px #bbbbbb;

  caption {
    display: none;
  }

  thead {
    td {
      white-space: pre;
    }
  }

  tbody {
    td {
      font-weight: 400;
      font-size: 14px;
    }
  }
`;

export const Tr = styled.tr`
  ${(props: StyleTypes) =>
    props.isRequired && {
      backgroundColor: "#FFF2CC",
    }}

  td {
    font-size: 16px;
    font-weight: 700;
    border: solid 1px #bbbbbb;
    padding: 15px 10px;
    letter-spacing: -0.5px;
    line-height: 24px;

    ${(props: StyleTypes) =>
      props.isRequired && {
        fontWeight: `700 !important`,
      }}
  }

  td:nth-of-type(1) {
    width: 20%;
  }
  td:nth-of-type(2) {
    width: 55%;
  }
  td:nth-of-type(3) {
    width: 15%;
    text-align: center;
  }
  td:nth-of-type(4) {
    width: 10%;
    text-align: center;
  }
`;

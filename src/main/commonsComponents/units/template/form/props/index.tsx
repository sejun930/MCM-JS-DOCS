import { useRecoilState } from "recoil";
import { versState } from "src/commons/store";
import { Wrapper } from "../form.commons.styles";

import _SubTitleTemplate from "../../title/subTitle";
import ModulePropsListFormPage from "./list";

import { PropsModuleListResultType, PropsModuleListType } from "./props.types";
import { getPropsForm } from "src/commons/data/props/props.commons.code";

// Props Data Form 페이지
export default function _PropsForm({
  list,
  isObject,
}: {
  list: Array<PropsModuleListType>;
  isObject?: boolean;
}) {
  const [vers] = useRecoilState(versState);

  // 공통으로 사용되는 Props
  const commonsPropsList: (
    vers?: number
  ) => Array<PropsModuleListResultType> = () => [
    getPropsForm(
      {
        name: "id",
        default: '""',
        type: "String",
        notice:
          "모듈에 id 선택자 값을 지정합니다. id는 wrapper 태그에 적용됩니다.",
        code: { type: "string" },
      },
      isObject || false
    ),
    getPropsForm(
      {
        name: "className",
        default: '""',
        type: "String",
        notice:
          "모듈에 class 선택자 값을 지정합니다. className은 wrapper 태그에 적용됩니다.",
        code: { type: "string" },
      },
      isObject || false
    ),
  ];

  // 공통 props가 적용된 props 리스트 가져오기
  const getWithCommnsPropsList = (
    list: Array<PropsModuleListResultType>,
    vers?: number
  ) => {
    if (!list) return [];

    // 마지막 필수 props index
    const lastRequiredIdx = list.findIndex((el) => !el.isRequired);

    return [
      ...list.slice(0, lastRequiredIdx), // 필수 props 인덱스까지 자르기
      ...commonsPropsList(vers || 0), // 공통 props 추가하기
      ...list.slice(lastRequiredIdx), // 나머지 props 붙이기
    ];
  };

  return (
    <Wrapper id="props-form">
      <_SubTitleTemplate
        title="Props List"
        className="props-subTitle"
        remakrs="Props들을 이용해 원하는 모듈을 조립해보세요."
      />
      <ModulePropsListFormPage
        list={
          getWithCommnsPropsList(
            list?.map((el: PropsModuleListType) =>
              getPropsForm(el, isObject || false)
            ),
            vers || 0
          ) || []
        }
        vers={vers || 0}
      />
    </Wrapper>
  );
}

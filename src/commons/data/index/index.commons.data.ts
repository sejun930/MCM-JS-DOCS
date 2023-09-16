// 목차 리스트 기본형
export const initIndexList = (module: string) => [
  { title: `📖 ${module}`, id: "main-title-form" },
  { title: "🔍 How To Use", id: "how-use-form" },
  { title: "📝 Example", id: "example-form" },
  { title: "📤 Props List", id: "props-form" },
  { title: "📂 Module Tree", id: "tree-form" },
  { title: "🌟 Comments", id: "comments-form" },
];

// functional 페이지가 추가되는 모듈들
const hasFunctional: { [key: string]: number } = {
  Modal: 1,
  Alert: 0,
};

// 기본형을 포함해 종합한 index 리스트 가져오기
export const getModuleIndexList = ({
  module,
  vers,
}: {
  module: string;
  vers: number;
}) => {
  // module : 모듈명
  // vers : 모듈 버전
  const list = initIndexList(module);

  // functional 페이지 추가
  if (hasFunctional[module] !== undefined && hasFunctional[module] === vers) {
    list.splice(3, 0, {
      title: "🏷 Functional",
      id: "functional-form",
    });
  }

  return list;
};

// 모듈별 목차 리스트
export const moduleIndexList = (module: string, vers: number) => {
  const list: { [key: string]: () => Array<{ title: string; id: string }> } = {
    Modal: () => {
      const list = initIndexList(module);
      if (vers === 1) {
        list.splice(3, 0, {
          title: "🏷 Functional",
          id: "functional-form",
        });
      }

      return list;
    },
  };

  return list[module];
};
